#!/usr/bin/env node
/**
 * stats.mjs — camada estatistica dos relatorios de trafego e funil.
 *
 * Complementa uma calculadora comum de significancia (teste z de duas proporcoes
 * e tamanho de amostra). Aqui vive o que ela NAO faz: intervalo em
 * cima de contagem, CPA com incerteza, comparacao de dias, peeking, serie
 * diaria e maldicao do vencedor num ranking de anuncios.
 *
 * SUBCOMANDOS
 *
 *   prop     duas proporcoes: z bicaudal + IC de Wilson + P(B>A) bayesiano + MDE
 *              node stats.mjs prop --a 14/1200 --b 1/200
 *
 *   cpa      CPA com intervalo (gasto fixo, vendas = contagem Poisson)
 *              node stats.mjs cpa --gasto 11500 --vendas 50 --meta 200
 *
 *   contagem compara duas contagens com exposicoes diferentes (binomial exato)
 *              node stats.mjs contagem --k1 6 --e1 994 --k2 3 --e2 900
 *              (e = exposicao: gasto, visitas, dias — a mesma unidade nos dois)
 *
 *   mde      efeito minimo detectavel com a amostra que ja existe
 *              node stats.mjs mde --base 0,012 --n 1200
 *
 *   peek     alfa real depois de k espiadas na mesma serie (Monte Carlo)
 *              node stats.mjs peek --olhadas 7
 *
 *   serie    serie diaria de contagem: limites de controle + superdispersao
 *              node stats.mjs serie --valores 5,5,6,8,7,9,6 --rotulos 18,19,20,21,22,23,24
 *
 *   ranking  ranking de pecas: maldicao do vencedor, Bonferroni e encolhimento
 *              node stats.mjs ranking --linhas "AD1:3/120,AD2:1/95,AD3:7/430"
 *
 * Convencao: alfa 0,05 bicaudal, poder 80%. Aceita virgula ou ponto decimal.
 * Todo numero sai com a conta que o gerou. Nenhum veredito sem n.
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

function parseRatio(v) {
  const s = String(v);
  if (!s.includes("/")) return null;
  const [k, n] = s.split("/");
  return { k: num(k), n: num(n) };
}

const br = (x, d = 2) =>
  Number.isFinite(x)
    ? x.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d })
    : "—";
const pct = (x, d = 2) => br(x * 100, d) + "%";

// ------------------------------------------------------------ base matematica

function normCdf(z) {
  // Abramowitz & Stegun 26.2.17
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-z * z / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - p : p;
}

function normInv(p) {
  // Acklam
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-7.78489400243029e-3, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [7.78469570904146e-3, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pl = 0.02425;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
         (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

function lgamma(x) {
  const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
             12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = 0.99999999999980993;
  const t = x + 7.5;
  for (let i = 0; i < 8; i++) a += g[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

const lbeta = (a, b) => lgamma(a) + lgamma(b) - lgamma(a + b);
const lchoose = (n, k) => lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1);

// P(X <= k) para Poisson(lambda)
function poisCdf(k, lambda) {
  if (k < 0) return 0;
  let term = Math.exp(-lambda), s = term;
  for (let i = 1; i <= k; i++) { term *= lambda / i; s += term; }
  return Math.min(1, s);
}

function bisect(f, a, b, it = 200) {
  let fa = f(a);
  for (let i = 0; i < it; i++) {
    const m = (a + b) / 2, fm = f(m);
    if (fa * fm <= 0) b = m; else { a = m; fa = fm; }
  }
  return (a + b) / 2;
}

// IC exato de Poisson (Garwood) por bisseccao
function poisCI(k, alfa = 0.05) {
  const teto = k + 40 * Math.sqrt(k + 1) + 40;
  const lo = k === 0 ? 0 : bisect((L) => (1 - poisCdf(k - 1, L)) - alfa / 2, 1e-9, teto);
  const hi = bisect((U) => poisCdf(k, U) - alfa / 2, 1e-9, teto);
  return [lo, hi];
}

// IC de Wilson para proporcao — honesto em n pequeno, ao contrario do normal
function wilson(k, n, alfa = 0.05) {
  if (n === 0) return [0, 1];
  const z = normInv(1 - alfa / 2), p = k / n;
  const den = 1 + z * z / n;
  const c = (p + z * z / (2 * n)) / den;
  const h = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / den;
  return [Math.max(0, c - h), Math.min(1, c + h)];
}

// P(pB > pA) com priors Beta(1,1) — formula exata
function probBmaiorA(kA, nA, kB, nB) {
  const a1 = kA + 1, b1 = nA - kA + 1, a2 = kB + 1, b2 = nB - kB + 1;
  let total = 0;
  for (let i = 0; i < a2; i++) {
    total += Math.exp(lbeta(a1 + i, b1 + b2) - Math.log(b2 + i) - lbeta(1 + i, b2) - lbeta(a1, b1));
  }
  // a soma de Evan Miller JA e P(pB > pA) — nao subtrair de 1
  return Math.min(1, Math.max(0, total));
}

// teste binomial exato bicaudal (metodo da densidade menor ou igual)
function binomTestExato(k, n, p) {
  if (n === 0) return 1;
  const lpmf = (i) => lchoose(n, i) + i * Math.log(p) + (n - i) * Math.log(1 - p);
  const alvo = lpmf(k) + 1e-9;
  let s = 0;
  for (let i = 0; i <= n; i++) if (lpmf(i) <= alvo) s += Math.exp(lpmf(i));
  return Math.min(1, s);
}

function zTeste2Prop(kA, nA, kB, nB) {
  const pA = kA / nA, pB = kB / nB;
  const pool = (kA + kB) / (nA + nB);
  const se = Math.sqrt(pool * (1 - pool) * (1 / nA + 1 / nB));
  const z = se === 0 ? 0 : (pB - pA) / se;
  return { pA, pB, z, p: 2 * (1 - normCdf(Math.abs(z))) };
}

function amostraPorBraco(base, liftRel, alfa = 0.05, poder = 0.8) {
  const p1 = base, p2 = base * (1 + liftRel);
  if (p2 >= 1 || p2 <= 0) return Infinity;
  const za = normInv(1 - alfa / 2), zb = normInv(poder);
  const pbar = (p1 + p2) / 2;
  const n = Math.pow(za * Math.sqrt(2 * pbar * (1 - pbar)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)), 2) /
            Math.pow(p2 - p1, 2);
  return Math.ceil(n);
}

function acharMDE(base, n, alfa = 0.05, poder = 0.8) {
  if (!(base > 0) || !(n > 0)) return NaN;
  let lo = 0.001, hi = 20;
  if (amostraPorBraco(base, hi, alfa, poder) > n) return NaN;
  for (let i = 0; i < 200; i++) {
    const m = (lo + hi) / 2;
    if (amostraPorBraco(base, m, alfa, poder) > n) lo = m; else hi = m;
  }
  return hi;
}

// gerador determinista — resultado reprodutivel entre execucoes
function rng(seed = 20260825) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}
function normalPadrao(r) {
  let u = 0, v = 0;
  while (u === 0) u = r();
  while (v === 0) v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const linha = (s = "") => console.log(s);
const titulo = (s) => { linha(); linha(s); linha("=".repeat(s.length)); linha(); };

// ------------------------------------------------------------------ prop

function cmdProp(a) {
  const alfa = Number.isFinite(num(a.alfa)) ? num(a.alfa) : 0.05;
  const A = parseRatio(a.a) ?? { k: num(a["a-conv"]), n: num(a["a-n"]) };
  const B = parseRatio(a.b) ?? { k: num(a["b-conv"]), n: num(a["b-n"]) };
  const rotA = a["rot-a"] && a["rot-a"] !== true ? a["rot-a"] : "A";
  const rotB = a["rot-b"] && a["rot-b"] !== true ? a["rot-b"] : "B";
  if (![A.k, A.n, B.k, B.n].every(Number.isFinite)) {
    linha("ERRO: informe --a k/n --b k/n"); process.exit(1);
  }

  const { pA, pB, z, p } = zTeste2Prop(A.k, A.n, B.k, B.n);
  const [lA, hA] = wilson(A.k, A.n, alfa);
  const [lB, hB] = wilson(B.k, B.n, alfa);
  const pbA = probBmaiorA(A.k, A.n, B.k, B.n);
  const liftObs = pA === 0 ? NaN : (pB - pA) / pA;

  titulo("PROPORCOES — " + rotA + " contra " + rotB);
  linha("| Braco | k | n | taxa | IC 95% (Wilson) |");
  linha("|---|---|---|---|---|");
  linha("| " + rotA + " | " + A.k + " | " + A.n + " | " + pct(pA) + " | " + pct(lA) + " – " + pct(hA) + " |");
  linha("| " + rotB + " | " + B.k + " | " + B.n + " | " + pct(pB) + " | " + pct(lB) + " – " + pct(hB) + " |");
  linha();
  linha("z = " + br(z) + " · p = " + br(p, 4) + " · alfa = " + br(alfa, 3) + " bicaudal");
  linha("lift observado = " + (Number.isFinite(liftObs) ? pct(liftObs, 1) : "—"));
  linha("P(" + rotB + " > " + rotA + ") bayesiano, priors Beta(1,1) = " + pct(pbA, 1));
  linha();
  const sobrepoe = !(hA < lB || hB < lA);
  linha(p < alfa
    ? "VEREDITO: diferenca significante a " + pct(1 - alfa, 0) + ". p = " + br(p, 4) + "."
    : "VEREDITO: NAO significante. p = " + br(p, 4) + " — a diferenca cabe no acaso.");
  if (sobrepoe) linha("Os dois intervalos de Wilson se sobrepoem — os dados sao compativeis com empate.");

  const nMin = Math.min(A.n, B.n);
  const base = pA > 0 ? pA : pB;
  const mde = acharMDE(base, nMin, alfa, 0.8);
  linha();
  linha("Com n = " + nMin + " por braco e base de " + pct(base) + ", o menor lift detectavel");
  linha("a 80% de poder e de " + (Number.isFinite(mde) ? "+" + br(mde * 100, 0) + "%" : "—") + ". Abaixo disso o teste e cego.");
  if (Number.isFinite(liftObs) && Number.isFinite(mde) && Math.abs(liftObs) < mde && p >= alfa) {
    linha("O lift observado (" + pct(liftObs, 1) + ") esta DENTRO da zona cega. Nao ha o que concluir.");
  }
}

// ------------------------------------------------------------------- cpa

function cmdCpa(a) {
  const gasto = num(a.gasto);
  const k = num(a.vendas);
  const meta = num(a.meta);
  const alfa = Number.isFinite(num(a.alfa)) ? num(a.alfa) : 0.05;
  if (!Number.isFinite(gasto) || !Number.isFinite(k)) {
    linha("ERRO: informe --gasto <R$> --vendas <n>"); process.exit(1);
  }
  const [lo, hi] = poisCI(k, alfa);
  const cpa = k === 0 ? Infinity : gasto / k;
  const cpaHi = lo === 0 ? Infinity : gasto / lo;
  const cpaLo = gasto / hi;

  titulo("CPA COM INCERTEZA");
  linha("Gasto tratado como constante. A venda e contagem — modelo de Poisson.");
  linha();
  linha("| Campo | Valor |");
  linha("|---|---|");
  linha("| Gasto | R$ " + br(gasto) + " |");
  linha("| Vendas | " + k + " |");
  linha("| Vendas — IC 95% (Poisson exato) | " + br(lo, 1) + " – " + br(hi, 1) + " |");
  linha("| CPA pontual | R$ " + (k === 0 ? "—" : br(cpa)) + " |");
  linha("| **CPA — IC 95%** | **R$ " + br(cpaLo) + " – " + (Number.isFinite(cpaHi) ? "R$ " + br(cpaHi) : "infinito") + "** |");
  const amplitude = k === 0 ? NaN : (cpaHi - cpaLo) / cpa;
  if (Number.isFinite(amplitude)) linha("| Amplitude do IC | +-" + br((amplitude / 2) * 100, 0) + "% em cima do CPA |");
  linha();
  if (Number.isFinite(meta)) {
    const kNecessario = gasto / meta;
    const pMeta = poisCdf(k, kNecessario);
    linha("Meta de CPA: R$ " + br(meta) + " — exigiria " + br(kNecessario, 1) + " vendas com este gasto.");
    linha("Foram " + k + ". Distancia da meta: " + br(cpa / meta, 2) + "x.");
    linha(cpaHi < meta
      ? "A meta esta ACIMA de todo o IC: bate com folga estatistica."
      : cpaLo > meta
        ? "A meta esta ABAIXO de todo o IC: o estouro NAO e ruido, e real a " + pct(1 - alfa, 0) + "."
        : "O IC ATRAVESSA a meta: com este n nao da para afirmar que estourou.");
    linha("P(observar " + k + " venda(s) ou MENOS se o CPA verdadeiro fosse a meta) = " + pct(pMeta, 4));
  }
  linha();
  linha("Leitura: com " + k + " venda(s), qualquer CPA carrega +-" +
        (k > 0 ? br((1.96 / Math.sqrt(k)) * 100, 0) : "—") + "% so de ruido de contagem.");
  linha("Regra: abaixo de 25 vendas o IC passa de +-40% — nao decide verba nesse n.");
}

// -------------------------------------------------------------- contagem

function cmdContagem(a) {
  const k1 = num(a.k1), k2 = num(a.k2);
  const e1 = Number.isFinite(num(a.e1)) ? num(a.e1) : 1;
  const e2 = Number.isFinite(num(a.e2)) ? num(a.e2) : 1;
  const r1 = a.rot1 && a.rot1 !== true ? a.rot1 : "1";
  const r2 = a.rot2 && a.rot2 !== true ? a.rot2 : "2";
  if (![k1, k2].every(Number.isFinite)) {
    linha("ERRO: informe --k1 --k2 (e opcionalmente --e1 --e2)"); process.exit(1);
  }

  const n = k1 + k2, p0 = e1 / (e1 + e2);
  const p = binomTestExato(k1, n, p0);
  const tx1 = e1 === 0 ? NaN : k1 / e1, tx2 = e2 === 0 ? NaN : k2 / e2;
  const [l1, h1] = poisCI(k1), [l2, h2] = poisCI(k2);

  titulo("CONTAGENS — " + r1 + " contra " + r2);
  linha("Teste binomial condicional exato: dado o total de " + n + " evento(s), quantos");
  linha("caberiam em " + r1 + " se a taxa fosse a mesma nos dois? Esperado p0 = " + pct(p0, 1) + ".");
  linha();
  linha("| Braco | eventos | exposicao | taxa | eventos IC 95% |");
  linha("|---|---|---|---|---|");
  linha("| " + r1 + " | " + k1 + " | " + br(e1) + " | " + br(tx1, 5) + " | " + br(l1, 1) + " – " + br(h1, 1) + " |");
  linha("| " + r2 + " | " + k2 + " | " + br(e2) + " | " + br(tx2, 5) + " | " + br(l2, 1) + " – " + br(h2, 1) + " |");
  linha();
  linha("razao de taxas " + r1 + " ÷ " + r2 + " = " + (tx2 ? br(tx1 / tx2, 2) + "x" : "—") + " · p exato = " + br(p, 4));
  linha(p < 0.05
    ? "VEREDITO: as taxas diferem (p = " + br(p, 4) + ")."
    : "VEREDITO: NAO da para separar as duas. p = " + br(p, 4) + " — a diferenca cabe no acaso.");
  if (n < 20) linha("AVISO: total de " + n + " evento(s). Abaixo de 20 este teste so pega diferenca grosseira.");
}

// ------------------------------------------------------------------- mde

function cmdMde(a) {
  const base = num(a.base);
  const n = num(a.n);
  const porDia = num(a["por-dia"]);
  const alfa = Number.isFinite(num(a.alfa)) ? num(a.alfa) : 0.05;
  const poder = Number.isFinite(num(a.poder)) ? num(a.poder) : 0.8;
  if (!Number.isFinite(base)) {
    linha("ERRO: informe --base <taxa> [--n <por braco>] [--por-dia <n>]"); process.exit(1);
  }

  titulo("EFEITO MINIMO DETECTAVEL");
  linha("Base = " + pct(base) + " · alfa = " + br(alfa, 3) + " bicaudal · poder = " + pct(poder, 0));
  linha();
  if (Number.isFinite(n)) {
    const mde = acharMDE(base, n, alfa, poder);
    linha("Com n = " + n + " por braco, o menor lift RELATIVO detectavel e " +
          (Number.isFinite(mde) ? "+" + br(mde * 100, 0) + "%" : "acima de +2000% — cego") + ".");
    if (Number.isFinite(mde)) linha("Ou seja: so uma variante que leve a taxa a " + pct(base * (1 + mde)) + " apareceria.");
    linha();
  }
  linha("| Lift buscado | n por braco | " + (Number.isFinite(porDia) ? "dias a " + br(porDia, 0) + "/dia" : "dias") + " |");
  linha("|---|---|---|");
  for (const lift of [0.1, 0.2, 0.3, 0.5, 1.0, 2.0]) {
    const nn = amostraPorBraco(base, lift, alfa, poder);
    const dias = Number.isFinite(porDia) && porDia > 0 ? Math.ceil((nn * 2) / porDia) : NaN;
    linha("| +" + br(lift * 100, 0) + "% | " + (Number.isFinite(nn) ? nn.toLocaleString("pt-BR") : "—") +
          " | " + (Number.isFinite(dias) ? dias : "—") + " |");
  }
  linha();
  linha("Regra: se o teste nao conclui dentro da janela da campanha, ele nao e teste.");
}

// ------------------------------------------------------------------ peek

function cmdPeek(a) {
  const olhadas = Math.max(1, Math.round(num(a.olhadas) || 5));
  const alfa = Number.isFinite(num(a.alfa)) ? num(a.alfa) : 0.05;
  const sims = Math.max(2000, Math.round(num(a.sims) || 40000));
  const r = rng(20260825);
  const z = normInv(1 - alfa / 2);

  let falsos = 0;
  for (let s = 0; s < sims; s++) {
    let acum = 0;
    for (let t = 1; t <= olhadas; t++) {
      acum += normalPadrao(r);          // passeio browniano sob H0
      if (Math.abs(acum / Math.sqrt(t)) > z) { falsos++; break; }
    }
  }
  const real = falsos / sims;

  titulo("PEEKING — alfa real depois de espiar a serie");
  linha("Olhadas: " + olhadas + " · alfa nominal: " + pct(alfa, 1) + " · " +
        sims.toLocaleString("pt-BR") + " simulacoes sob H0");
  linha();
  linha("| Alfa nominal | Alfa REAL com " + olhadas + " olhada(s) | Inflacao |");
  linha("|---|---|---|");
  linha("| " + pct(alfa, 1) + " | **" + pct(real, 1) + "** | " + br(real / alfa, 1) + "x |");
  linha();
  linha("Leitura: chamar vencedor sempre que o p cruza " + br(alfa, 2) + ", olhando " + olhadas + " vez(es),");
  linha("produz falso positivo em " + pct(real, 1) + " dos casos — nao em " + pct(alfa, 1) + ".");
  linha();
  const zCorr = normInv(1 - (alfa / olhadas) / 2);
  linha("Correcao de bolso (Bonferroni sobre as olhadas): exigir |z| > " + br(zCorr) + " em vez de " + br(z) + ",");
  linha("ou p < " + br(alfa / olhadas, 4) + ". Conservador, mas honesto.");
  linha("Alternativa preferida: fixar o n ANTES, olhar uma vez, e so entao decidir.");
}

// ----------------------------------------------------------------- serie

function cmdSerie(a) {
  const vals = String(a.valores || "").split(",").map(num).filter(Number.isFinite);
  const rots = String(a.rotulos || "").split(",").filter((s) => s.length);
  if (vals.length < 3) { linha("ERRO: informe --valores v1,v2,v3,... (minimo 3)"); process.exit(1); }

  const n = vals.length;
  const media = vals.reduce((s, v) => s + v, 0) / n;
  const soma2 = vals.reduce((s, v) => s + Math.pow(v - media, 2), 0);
  const varAmostral = soma2 / (n - 1);
  const dispersao = media > 0 ? varAmostral / media : NaN;
  const li = Math.max(0, media - 3 * Math.sqrt(media));
  const ls = media + 3 * Math.sqrt(media);

  const chi = media > 0 ? soma2 / media : NaN;
  const gl = n - 1;
  const zChi = Number.isFinite(chi) ? Math.sqrt(2 * chi) - Math.sqrt(2 * gl - 1) : NaN;
  const pDisp = Number.isFinite(zChi) ? 1 - normCdf(zChi) : NaN;

  titulo("SERIE DIARIA — sinal ou ruido");
  linha("n = " + n + " dias · media = " + br(media) + " · limites de controle Poisson 3-sigma: " +
        br(li, 1) + " a " + br(ls, 1));
  linha();
  linha("| Dia | Valor | z | Fora do controle? |");
  linha("|---|---|---|---|");
  vals.forEach((v, i) => {
    const z = media > 0 ? (v - media) / Math.sqrt(media) : 0;
    linha("| " + (rots[i] ?? (i + 1)) + " | " + br(v, 0) + " | " + br(z) + " | " + (v < li || v > ls ? "SIM" : "nao") + " |");
  });
  linha();
  linha("indice de dispersao (var/media) = " + br(dispersao) + " · p = " + br(pDisp, 4));
  linha(dispersao > 1.5 && pDisp < 0.05
    ? "SUPERDISPERSO: a variacao entre dias e MAIOR que a de Poisson puro. Ha causa externa (verba, dia da semana, live). Nao tratar cada dia como amostra da mesma coisa."
    : "Compativel com Poisson: a variacao dia a dia e o ruido esperado de contagem. Um dia baixo NAO e queda — e a mesma moeda.");
  linha();
  const ultimo = vals[n - 1];
  const zUlt = media > 0 ? (ultimo - media) / Math.sqrt(media) : 0;
  linha("Ultimo ponto (" + (rots[n - 1] ?? n) + "): " + br(ultimo, 0) + " · z = " + br(zUlt) + " · " +
        (Math.abs(zUlt) > 2 ? "FORA do esperado — investigar." : "dentro do esperado — nao reagir."));
}

// --------------------------------------------------------------- ranking

function cmdRanking(a) {
  const bruto = String(a.linhas || "");
  const itens = bruto.split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
    const [rot, r] = s.split(":");
    const rr = r ? parseRatio(r) : null;
    return rr ? { rot: rot.trim(), k: rr.k, n: rr.n } : null;
  }).filter(Boolean);
  if (itens.length < 2) { linha('ERRO: informe --linhas "AD1:3/120,AD2:1/95,..."'); process.exit(1); }

  const K = itens.reduce((s, i) => s + i.k, 0);
  const N = itens.reduce((s, i) => s + i.n, 0);
  const pool = K / N;
  const m = itens.length;

  const ordenadosN = itens.map((i) => i.n).sort((x, y) => x - y);
  const forca = Math.max(1, ordenadosN[Math.floor(m / 2)]);

  const enriquecidos = itens.map((i) => {
    const p = i.k / i.n;
    const [lo, hi] = wilson(i.k, i.n);
    const shrunk = (i.k + pool * forca) / (i.n + forca);
    const { p: pval } = zTeste2Prop(K - i.k, N - i.n, i.k, i.n);
    return { ...i, p, lo, hi, shrunk, pval, pBonf: Math.min(1, pval * m) };
  }).sort((x, y) => y.p - x.p);

  titulo("RANKING — maldicao do vencedor");
  linha(m + " pecas · pool = " + K + "/" + N + " = " + pct(pool) + " · forca do encolhimento = " + forca);
  linha();
  linha("| Peca | k/n | taxa bruta | IC 95% | taxa encolhida | p vs resto | p Bonferroni |");
  linha("|---|---|---|---|---|---|---|");
  for (const e of enriquecidos) {
    linha("| " + e.rot + " | " + e.k + "/" + e.n + " | " + pct(e.p) + " | " + pct(e.lo) + " – " + pct(e.hi) +
          " | " + pct(e.shrunk) + " | " + br(e.pval, 4) + " | " + br(e.pBonf, 4) + " |");
  }
  linha();
  const campea = enriquecidos[0];
  const sobreviventes = enriquecidos.filter((e) => e.pBonf < 0.05);
  linha("Melhor bruta: " + campea.rot + " (" + pct(campea.p) + "). Encolhida: " + pct(campea.shrunk) + ".");
  linha("A taxa bruta do topo e otimista por construcao — escolher o maior de " + m + " sorteios");
  linha("captura ruido junto com sinal. A coluna encolhida e a previsao honesta para amanha.");
  linha();
  linha(sobreviventes.length === 0
    ? "NENHUMA peca sobrevive a correcao de Bonferroni (" + m + " comparacoes). Com este n, o ranking inteiro e compativel com todas as pecas terem a MESMA taxa. Nao matar nem escalar por ele."
    : "Sobrevive(m) a Bonferroni: " + sobreviventes.map((e) => e.rot).join(", ") + ". Essas separam do pool.");
  const magros = enriquecidos.filter((e) => e.k < 5);
  if (magros.length) linha("Com menos de 5 conversoes: " + magros.map((e) => e.rot).join(", ") + " — leitura de ruido, nao de peca.");
}

// ------------------------------------------------------------------ main

function main() {
  const argv = process.argv.slice(2);
  const sub = (argv[0] || "").toLowerCase();
  const a = parseArgs(argv.slice(1));
  const mapa = { prop: cmdProp, cpa: cmdCpa, contagem: cmdContagem, mde: cmdMde, peek: cmdPeek, serie: cmdSerie, ranking: cmdRanking };
  if (!mapa[sub]) {
    linha("stats.mjs — subcomandos: prop · cpa · contagem · mde · peek · serie · ranking");
    linha("O cabecalho do arquivo tem um exemplo de cada.");
    process.exit(sub ? 1 : 0);
  }
  mapa[sub](a);
}

main();
