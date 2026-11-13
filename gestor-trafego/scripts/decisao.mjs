#!/usr/bin/env node
/**
 * decisao.mjs — contas de DECISAO do agente gestor de trafego.
 *
 * Complementa ./stats.mjs, na mesma pasta (IC, testes, serie, ranking
 * por proporcao). Aqui vive o que decide verba: o custo de uma regua de corte,
 * a probabilidade de um anuncio estar acima do teto, o CPA encolhido de um lote
 * de anuncios medido por GASTO, o CPA marginal de uma escala e o valor do ingresso.
 *
 * SUBCOMANDOS
 *
 *   corte     quanto uma regua "pausa com R$X sem venda" mata de anuncio bom
 *               node decisao.mjs corte --teto 200 --gasto 230
 *
 *   prob      P(CPA real > teto) dado gasto e vendas (Gamma-Poisson)
 *               node decisao.mjs prob --gasto 640 --vendas 3 --teto 200
 *               [--prior-cpa 175 --prior-forca 3]   (priori da conta, em vendas-equivalentes)
 *
 *   encolher  CPA encolhido de um lote (empirical Bayes com priori da propria conta)
 *               node decisao.mjs encolher --teto 200 --linhas "AD1:820/6,AD2:310/0,AD3:1450/9"
 *               (formato NOME:gasto/vendas; nome sem virgula nem dois-pontos)
 *
 *   marginal  CPA marginal de uma escala (janelas de mesmo tamanho, sem dia de live)
 *               node decisao.mjs marginal --antes 3000/18 --depois 4200/22
 *
 *   valor     valor esperado de um ingresso e o CPA de breakeven
 *               node decisao.mjs valor --front 45 --show 0,5 --pitch 0,03 --ticket 8000 --margem 0,7
 *               [--asc 0,013]   (taxa ingresso->produto direta, substitui show x pitch)
 *               [--teto 200]    (devolve a ascensao que o teto pressupoe)
 *
 * Convencao: 95%. Aceita virgula ou ponto decimal. Todo numero sai com a conta.
 */

// ---------------------------------------------------------------- utilitarios

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { out._.push(a); continue; }
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[key] = true;
    else { out[key] = next; i++; }
  }
  return out;
}

function num(v) {
  if (v === undefined || v === true) return NaN;
  // "1.250,50" e "1.250" = milhar BR; "0.131" e "0,131" = decimal
  let s = String(v).replace(/\s/g, "");
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^[1-9]\d{0,2}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return Number(s);
}

function par(v) {
  const s = String(v ?? "");
  const [g, k] = s.split("/");
  return { gasto: num(g), vendas: num(k) };
}

const brl = (x) => !isFinite(x) ? "indefinido" :
  "R$ " + x.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (x, d = 1) => (x * 100).toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }) + "%";
const fmt = (x, d = 2) => x.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

function falha(msg) { console.error("BLOCK: " + msg); process.exit(2); }

// ------------------------------------------------- funcao gama e incompleta

function lnGamma(z) {
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

// P(a, x) regularizada inferior = CDF da Gamma(shape a, rate 1) em x
function gammaP(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let sum = 1 / a, del = sum, ap = a;
    for (let n = 0; n < 500; n++) { ap++; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-14) break; }
    return sum * Math.exp(-x + a * Math.log(x) - lnGamma(a));
  }
  let b = x + 1 - a, c = 1 / 1e-300, d = 1 / b, h = d;
  for (let i = 1; i < 500; i++) {
    const an = -i * (i - a); b += 2;
    d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-14) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lnGamma(a)) * h;
}

// quantil da Gamma(shape a, rate b) por bissecao
function gammaQ(p, a, b) {
  let lo = 0, hi = Math.max(1, (a + 10 * Math.sqrt(a) + 10)) / b;
  while (gammaP(a, hi * b) < p) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (gammaP(a, mid * b) < p) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// posterior da taxa lambda (vendas por real): Gamma(a0 + k, b0 + gasto)
function posterior(gasto, vendas, a0, b0, teto) {
  const a = a0 + vendas, b = b0 + gasto;
  const media = a / b;
  const lamLo = gammaQ(0.025, a, b), lamHi = gammaQ(0.975, a, b);
  const pAcima = isFinite(teto) ? gammaP(a, b / teto) : NaN; // P(lambda < 1/teto) = P(CPA > teto)
  return { cpa: 1 / media, cpaLo: 1 / lamHi, cpaHi: 1 / lamLo, pAcima };
}

// ---------------------------------------------------------------- subcomandos

function corte(o) {
  const teto = num(o.teto), gasto = num(o.gasto);
  if (!(teto > 0) || !(gasto > 0)) falha("corte pede --teto e --gasto");
  const cenarios = [0.5, 0.75, 1].map((f) => teto * f);
  if (num(o["cpa-real"]) > 0) cenarios.push(num(o["cpa-real"]));
  console.log(`Regua: pausa com ${brl(gasto)} sem venda | teto de CPA ${brl(teto)}\n`);
  console.log("| CPA real do anuncio | Vendas esperadas no gasto | P(zero venda por azar) = anuncio bom morto |");
  console.log("|---|---|---|");
  for (const c of cenarios) {
    const mu = gasto / c;
    console.log(`| ${brl(c)} | ${fmt(mu)} | ${pct(Math.exp(-mu))} |`);
  }
  const prova95 = -Math.log(0.05) * teto;
  console.log(`\nGasto sem venda que PROVA CPA > teto com 95%: ${brl(prova95)} (= 3,0 x teto).`);
  console.log(`A ${brl(gasto)}, zero venda so exclui (95%) CPA real abaixo de ${brl(gasto / -Math.log(0.05))}.`);
  console.log(`Leitura: a regua limita PERDA, nao diagnostica. O custo dela e a coluna da direita.`);
}

function prob(o) {
  const gasto = num(o.gasto), vendas = num(o.vendas), teto = num(o.teto);
  if (!(gasto > 0) || !(vendas >= 0) || !(teto > 0)) falha("prob pede --gasto, --vendas e --teto");
  let a0 = 0.5, b0 = 0, fonte = "Jeffreys (sem priori da conta)";
  if (num(o["prior-cpa"]) > 0) {
    const m = num(o["prior-forca"]) > 0 ? num(o["prior-forca"]) : 3;
    a0 = m; b0 = m * num(o["prior-cpa"]);
    fonte = `priori da conta: CPA ${brl(num(o["prior-cpa"]))} com forca de ${fmt(m, 1)} vendas`;
  }
  const r = posterior(gasto, vendas, a0, b0, teto);
  console.log(`Entrada: gasto ${brl(gasto)} | vendas ${vendas} | teto ${brl(teto)} | ${fonte}\n`);
  console.log("| CPA observado | CPA estimado | IC 95% | P(CPA real > teto) |");
  console.log("|---|---|---|---|");
  console.log(`| ${vendas > 0 ? brl(gasto / vendas) : "sem venda"} | ${brl(r.cpa)} | ${brl(r.cpaLo)} a ${brl(r.cpaHi)} | ${pct(r.pAcima)} |`);
  console.log(`\nRegra de pausa por custo: pausar quando P > C_pausar_bom / (C_pausar_bom + C_manter_ruim).`);
  console.log(`Criativo escasso (custa caro repor) pede limiar de 80-90%; criativo farto, 60-70%.`);
}

function encolher(o) {
  const teto = num(o.teto);
  if (!o.linhas || o.linhas === true) falha("encolher pede --linhas \"NOME:gasto/vendas,...\"");
  const ads = String(o.linhas).split(/,(?=[^,]*:)/).map((s) => {
    const i = s.lastIndexOf(":");
    const p = par(s.slice(i + 1));
    return { nome: s.slice(0, i).trim(), ...p };
  });
  if (ads.some((a) => !(a.gasto >= 0) || !(a.vendas >= 0))) falha("linha com gasto ou vendas invalido");
  const semGasto = ads.filter((a) => a.gasto === 0);
  if (semGasto.length) {
    console.log(`AVISO: ${semGasto.length} linha(s) com gasto zero fora do calculo (venda atribuida sem gasto na janela): ${semGasto.map((a) => a.nome).join(", ")}\n`);
    ads.splice(0, ads.length, ...ads.filter((a) => a.gasto > 0));
  }
  if (ads.length < 3) falha("encolher precisa de 3+ anuncios para estimar a priori da conta");
  const G = ads.reduce((s, a) => s + a.gasto, 0), K = ads.reduce((s, a) => s + a.vendas, 0);
  if (K === 0) falha("lote sem nenhuma venda: nao ha priori a estimar");
  const mu = K / G;
  // metodo dos momentos: variancia entre anuncios alem do ruido Poisson
  const n = ads.length;
  const brutoVar = ads.reduce((s, a) => s + (a.vendas / a.gasto - mu) ** 2, 0) / (n - 1);
  const ruido = ads.reduce((s, a) => s + mu / a.gasto, 0) / n;
  const tau2 = Math.max(brutoVar - ruido, (mu * 0.05) ** 2);
  let a0 = mu * mu / tau2, b0 = mu / tau2;
  const cap = 50; // nunca deixar a priori pesar mais que 50 vendas
  if (a0 > cap) { b0 *= cap / a0; a0 = cap; }
  console.log(`Priori da conta: CPA do lote ${brl(1 / mu)} (${K} vendas em ${brl(G)}), forca ${fmt(a0, 1)} vendas-equivalentes.`);
  console.log(`Forca alta = anuncios parecidos entre si (diferenca e quase so ruido). Forca baixa = diferenca real.\n`);
  const linhas = ads.map((a) => ({ ...a, ...posterior(a.gasto, a.vendas, a0, b0, teto) }))
    .sort((x, y) => x.cpa - y.cpa);
  console.log(`| Anuncio | Gasto | Vendas | CPA bruto | CPA encolhido | IC 95% | P(CPA > ${isFinite(teto) ? brl(teto) : "teto"}) |`);
  console.log("|---|---|---|---|---|---|---|");
  for (const a of linhas) {
    console.log(`| ${a.nome} | ${brl(a.gasto)} | ${a.vendas} | ${a.vendas > 0 ? brl(a.gasto / a.vendas) : "sem venda"} | ${brl(a.cpa)} | ${brl(a.cpaLo)} a ${brl(a.cpaHi)} | ${isFinite(teto) ? pct(a.pAcima) : "-"} |`);
  }
  console.log(`\nEscalar e projetar pelo CPA ENCOLHIDO, nunca pelo bruto: o topo do bruto e sinal + sorte.`);
}

function marginal(o) {
  const A = par(o.antes), D = par(o.depois);
  if (![A.gasto, A.vendas, D.gasto, D.vendas].every((x) => x >= 0)) falha("marginal pede --antes gasto/vendas --depois gasto/vendas");
  const dg = D.gasto - A.gasto, dk = D.vendas - A.vendas;
  const se = Math.sqrt(A.vendas + D.vendas);
  const dkLo = dk - 1.96 * se, dkHi = dk + 1.96 * se;
  console.log(`| Janela | Gasto | Vendas | CPA medio |`);
  console.log(`|---|---|---|---|`);
  console.log(`| Antes | ${brl(A.gasto)} | ${A.vendas} | ${brl(A.gasto / A.vendas)} |`);
  console.log(`| Depois | ${brl(D.gasto)} | ${D.vendas} | ${brl(D.gasto / D.vendas)} |`);
  console.log(`\nDelta: ${brl(dg)} a mais comprou ${dk} vendas a mais (IC 95% do delta: ${fmt(dkLo, 1)} a ${fmt(dkHi, 1)}).`);
  if (dg <= 0) { console.log("Gasto nao subiu: CPA marginal nao se aplica."); return; }
  if (dk <= 0) { console.log(`CPA MARGINAL: infinito na estimativa pontual (verba extra nao comprou venda).`); return; }
  const lo = dkHi > 0 ? dg / dkHi : NaN;
  const hi = dkLo > 0 ? brl(dg / dkLo) : "infinito (o delta de vendas cabe no zero)";
  console.log(`CPA MARGINAL: ${brl(dg / dk)} | IC 95%: ${brl(lo)} a ${hi}`);
  console.log(`Janelas de mesmo tamanho, mesmos dias da semana, sem dia de live. Senao a conta mente.`);
}

function valor(o) {
  const front = num(o.front) || 0, ticket = num(o.ticket);
  const margem = num(o.margem) > 0 ? num(o.margem) : 1;
  let asc, origem;
  if (num(o.asc) > 0) { asc = num(o.asc); origem = `ascensao direta ${pct(asc, 2)}`; }
  else if (num(o.show) > 0 && num(o.pitch) > 0) { asc = num(o.show) * num(o.pitch); origem = `comparecimento ${pct(num(o.show))} x conversao do pitch ${pct(num(o.pitch), 2)} = ${pct(asc, 2)}`; }
  else falha("valor pede --ticket e (--asc ou --show + --pitch)");
  if (!(ticket > 0)) falha("valor pede --ticket");
  const back = asc * ticket * margem;
  const v = front + back;
  console.log(`| Parcela | Conta | Valor por ingresso |`);
  console.log(`|---|---|---|`);
  console.log(`| Front liquido | informado | ${brl(front)} |`);
  console.log(`| Backend | ${origem} x ticket ${brl(ticket)} x margem ${pct(margem, 0)} | ${brl(back)} |`);
  console.log(`| **Total = CPA de breakeven** | | **${brl(v)}** |`);
  console.log(`| CPA maximo com 20% de seguranca | | ${brl(v * 0.8)} |`);
  if (num(o.teto) > 0) {
    const t = num(o.teto);
    const need = (t - front) / (ticket * margem);
    console.log(`\nO teto de ${brl(t)} so empata se a ascensao ingresso -> produto for ${pct(need, 2)} (hoje: ${pct(asc, 2)}).`);
  }
  console.log(`Margem = o que sobra do ticket depois de taxa, imposto, comissao e entrega. Declare a fonte de cada operando.`);
}

// ---------------------------------------------------------------- main

const [cmd, ...rest] = process.argv.slice(2);
const o = parseArgs(rest);
const mapa = { corte, prob, encolher, marginal, valor };
if (!mapa[cmd]) {
  console.log("uso: node decisao.mjs <corte|prob|encolher|marginal|valor> [flags]  (ver cabecalho do arquivo)");
  process.exit(cmd ? 2 : 0);
}
mapa[cmd](o);
