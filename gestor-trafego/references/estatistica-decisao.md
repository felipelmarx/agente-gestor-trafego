# Estatística e decisão em tráfego pago e funis

Referência operacional do gestor sênior analítico. Contexto-padrão dos exemplos: conta Meta Ads de infoproduto brasileiro, lançamento pago ou ingresso de evento (R$29-97), checkout Hotmart, 20-120 vendas/dia, R$5-10 mil/dia de verba, CPA-alvo R$150-200, conversão de página 1-3%.

Convenções: k = número de conversões (vendas), S = gasto em R$, n = sessões ou visitantes, p = taxa de conversão, z(95%) = 1,96, z(80% de poder) = 0,84. Números entre colchetes são intervalos de 95%. Fontes numeradas no fim; [n] no texto remete à lista.

Regra de ouro do documento: todo número que vira decisão sai com o erro dele. CPA sem k ao lado não é informação, é boato.

---

## 1. Fundamentos de contagem: o CPA é uma razão sobre um Poisson

### 1.1 Erro relativo do CPA

(a) Conceito. Vendas num período, com gasto fixo, se comportam aproximadamente como Poisson: a variância da contagem é igual à média. O CPA = S/k herda o erro de k. O que define a precisão do CPA é o número de vendas, não o gasto nem o número de dias.

(b) Fórmula. Erro relativo de 95% do CPA ≈ 1,96/√k.

| k (vendas) | erro relativo 95% | CPA observado R$180 vira |
|---|---|---|
| 5 | ±88% (use exato, abaixo) | sem leitura |
| 10 | ±62% | ~R$98 a R$375 (exato) |
| 25 | ±39% | ~R$130 a R$290 |
| 50 | ±28% | ~R$140 a R$245 |
| 100 | ±20% | ~R$150 a R$225 |
| 400 | ±10% | ~R$164 a R$200 |

Para precisão relativa e desejada: k ≈ (1,96/e)². ±20% exige ~96 vendas; ±10% exige ~384.

(c) Usar sempre que um CPA for comparado com teto, com outro anúncio ou com outro dia. Não usar a aproximação com k < 20: aí vale o intervalo exato (1.2). Com superdispersão (seção 4.3) o erro real é maior: multiplicar por √D.

(d) Exemplo. Conjunto gastou R$1.800 e fez 10 vendas: CPA R$180. Intervalo exato [R$98; R$375]. Conclusão correta: "não sei se está abaixo do teto de R$200". Conclusão errada: "está R$20 abaixo do teto".

(e) Fontes: [19] (Garwood/GraphPad), [25] (premissa Poisson e superdispersão).

### 1.2 Intervalo exato de Poisson (Garwood) para poucas vendas

(a) Conceito. Com poucas contagens a aproximação normal quebra. O intervalo de Garwood usa quantis do qui-quadrado e tem cobertura garantida (é conservador).

(b) Fórmula. Para k vendas: λ_inf = χ²(2k; 0,025)/2 e λ_sup = χ²(2k+2; 0,975)/2. Intervalo do CPA = [S/λ_sup; S/λ_inf]. Tabela pronta de λ (95%):

| k | λ_inf | λ_sup |
|---|---|---|
| 0 | 0 | 3,69 |
| 1 | 0,03 | 5,57 |
| 3 | 0,62 | 8,77 |
| 5 | 1,62 | 11,67 |
| 10 | 4,80 | 18,39 |
| 20 | 12,22 | 30,89 |
| 50 | 37,11 | 65,92 |

Excel: λ_inf = CHISQ.INV(0,025; 2k)/2; λ_sup = CHISQ.INV(0,975; 2k+2)/2.

(c) Usar para k < 20 e para qualquer anúncio individual. Não usar se as vendas vêm em rajadas correlacionadas (um grupo de WhatsApp disparou e 8 vendas vieram em 10 minutos): a premissa Poisson não vale.

(d) Exemplo. Anúncio com R$900 e 5 vendas (CPA R$180): CPA em [900/11,67; 900/1,62] = [R$77; R$556]. O anúncio pode ser o melhor ou o pior da conta.

(e) Fontes: [19].

### 1.3 Zero vendas: a regra do três e o custo de pausar cedo

(a) Conceito. Gasto sem venda não prova CPA alto. Com CPA verdadeiro c e gasto S, a probabilidade de zero vendas é e^(−S/c).

(b) Fórmula. P(0 vendas) = e^(−S/c). Limite superior unilateral de 95% para a taxa após zero vendas ≈ 3/S, ou seja, CPA verdadeiro ≥ S/3 com 95% de confiança. Só a partir de S = 3 × CPA_máx sem venda há evidência de 95% de que o anúncio está acima do teto.

| gasto sem venda (CPA real = R$200) | P(zero vendas por puro acaso) |
|---|---|
| R$230 | 32% |
| R$400 | 14% |
| R$600 | 5% |

(c) Usar para calibrar regra de corte. Pausar com 1,15× CPA sem venda é decisão econômica legítima (limitar perda), mas o gestor deve saber que mata ~1 em 3 anúncios bons por azar. Não usar como prova de anúncio ruim.

(d) Exemplo. Regra "pausa com R$230 sem venda" e CPA real R$200: de cada 10 anúncios bons, ~3 morrem por azar. Se o volume de criativos é escasso, subir a régua para R$400 (perde-se no máximo R$170 extra por anúncio ruim, salvam-se metade dos bons abatidos).

(e) Fontes: [19], dedução direta da distribuição de Poisson.

### 1.4 Proporções: intervalo de Wilson (nunca Wald)

(a) Conceito. Taxas de conversão (página, checkout, order bump) são binomiais. O intervalo de Wald (p ± 1,96√(p(1−p)/n)) tem cobertura errática em n pequeno e p perto de 0. Brown, Cai e DasGupta recomendam Wilson ou Jeffreys para n pequeno e Agresti-Coull para n grande.

(b) Fórmula de Wilson: centro = (p + z²/2n)/(1 + z²/n); meia-largura = z·√(p(1−p)/n + z²/4n²)/(1 + z²/n). Zero conversões em n: limite superior ≈ 3/n.

(c) Usar para qualquer taxa de funil com menos de ~1.000 observações ou p < 5%. Não usar para comparar duas taxas (para isso, teste de duas proporções, seção 2.4).

(d) Exemplos. Página: 6 vendas em 300 sessões = 2,0%; Wilson [0,92%; 4,29%] (Wald dá [0,42%; 3,58%], errado). Checkout: 45 compras em 120 checkouts iniciados = 37,5%; Wilson [29,4%; 46,4%].

(e) Fontes: [17], [18].

---

## 2. Testes A/B e experimentação online

### 2.1 Desenho antes de subir: OEC, unidade e duração

(a) Conceito (Kohavi). Todo experimento tem uma métrica de decisão única (OEC) declarada antes, uma unidade de randomização, um MDE e uma duração em semanas cheias. Sem esses quatro itens escritos antes, o teste vira pescaria.

(b) Regra prática. OEC = venda aprovada na Hotmart por sessão (não clique, não checkout iniciado). Duração = múltiplo de 7 dias (ciclo semanal), mínimo 7, típico 14. Unidade = visitante (cookie/ID), nunca pageview.

(c) Usar para teste de página (split por URL/redirect). Para criativo dentro do Meta, ver 2.10: a plataforma não randomiza.

(d) Exemplo. "Headline B aumenta vendas/sessão em ≥20% relativo; 50/50; 14 dias; ~400 vendas por braço; decisão só no dia 14."

(e) Fontes: [1], [42].

### 2.2 Tamanho de amostra e MDE

(a) Conceito. Poder (80%) é a chance de detectar o efeito se ele existe. MDE é o menor efeito detectável com a amostra disponível. Teste sem cálculo de MDE costuma ser incapaz de concluir qualquer coisa plausível.

(b) Fórmulas (α = 5% bilateral, poder 80%, regra de Lehr):
- n por braço ≈ 16·p(1−p)/δ², com δ = diferença absoluta.
- Atalho para p pequeno: conversões por braço ≈ 16/MDE_rel².
- Invertido: MDE_rel ≈ 4/√(conversões por braço).

| MDE relativo | vendas por braço | sessões por braço a 2% |
|---|---|---|
| 10% | ~1.600 | ~78.400 |
| 20% | ~400 | ~19.600 |
| 30% | ~180 | ~8.700 |
| 50% | ~64 | ~3.100 |

(c) Usar antes de todo teste. Se o MDE resultante for maior que qualquer efeito plausível (mudança de cor de botão não dá +30%), não rode o teste: ou muda algo grande, ou aceita que é aposta, não teste.

(d) Exemplo. Página com 3.000 sessões/dia, 2% de conversão, 50/50: 30 vendas/braço/dia. Para MDE 20% (400/braço) são ~14 dias. Para MDE 10%, 54 dias: inviável dentro de um lançamento. Conclusão: em lançamento só se testa mudança grande (oferta, preço, VSL vs página longa).

(e) Fontes: [5], [42], [1].

### 2.3 Comparar CPA de dois anúncios ou dois períodos

(a) Conceito. Comparar duas taxas de Poisson. Com gastos iguais, condicionado ao total, k₁ segue binomial(k₁+k₂; 0,5).

(b) Fórmula. Gastos iguais: z = (k₁ − k₂)/√(k₁ + k₂). Gastos diferentes: razão de taxas r = (k₁/S₁)/(k₂/S₂); EP(ln r) = √(1/k₁ + 1/k₂); IC 95% = r·e^(±1,96·EP). Para detectar diferença de 20% no CPA com 80% de poder: ~400-470 vendas em cada anúncio. Diferença de 50%: ~70-100 vendas cada.

(c) Usar para "o anúncio A é melhor que o B?" e "hoje foi pior que ontem?". Não usar quando os anúncios receberam públicos diferentes pelo algoritmo (2.10): o teste estatístico fica correto, a causalidade não.

(d) Exemplo. A: 30 vendas com R$4.500; B: 18 vendas com R$4.500 (CPA R$150 contra R$250). z = 12/√48 = 1,73; p = 0,08. Não conclui. Diferença de 67% no CPA e ainda é compatível com ruído.

(e) Fontes: [19], [5].

### 2.4 Teste de duas proporções (página A contra B)

(a) Conceito. Compara p_A e p_B com erro-padrão combinado.

(b) Fórmula. EP = √(p_A(1−p_A)/n_A + p_B(1−p_B)/n_B); z = (p_B − p_A)/EP. |z| > 1,96 → p < 0,05 bilateral.

(c) Usar com amostra definida a priori e leitura única no fim (ou com correção sequencial, 2.6). Não usar com olhadas diárias sem correção.

(d) Exemplo. A: 40/2.000 (2,0%); B: 52/2.000 (2,6%). EP = 0,474 p.p.; z = 1,27; p = 0,20. O MDE com ~45 vendas por braço é ~60% relativo: o teste nunca teve chance de detectar +30%.

(e) Fontes: [5], [42].

### 2.5 Peeking: o custo de olhar todo dia

(a) Conceito. O p-valor assume amostra fixa. Olhar repetidamente e parar no primeiro p < 0,05 infla o falso positivo. Evan Miller: decidir o tamanho antes e não agir antes de atingi-lo.

(b) Taxa real de falso positivo com α nominal de 5% e olhadas igualmente espaçadas (Armitage et al., confirmada por simulação própria com 10 olhadas: 19,4%):

| olhadas | falso positivo real |
|---|---|
| 1 | 5% |
| 2 | 8% |
| 5 | 14% |
| 10 | 19% |
| 20 | 25% |
| 100 | 37% |

(c) Olhar é permitido; agir não é, salvo com método sequencial (2.6) ou com regra de guarda para dano grave (página quebrada, checkout fora). Não usar p-valor clássico em painel atualizado em tempo real.

(d) Exemplo. Teste de 14 dias lido diariamente e encerrado no primeiro dia "verde": ~1 em 4 vencedores declarados é ruído puro.

(e) Fontes: [5], [6], [4].

### 2.6 Testes sequenciais: group sequential, alpha spending e mSPRT

(a) Conceito. Métodos que permitem olhar várias vezes mantendo α total. Group sequential: número de olhadas planejado, fronteiras rígidas no início. Alpha spending (Lan-DeMets): gasta α conforme a fração de informação t, sem fixar quantas olhadas. mSPRT / always-valid p-values (Johari, Pekelis, Walsh; base do Optimizely e do Statsig): olhar a qualquer momento, ao custo de menos poder por amostra.

(b) Fórmulas e números.
- O'Brien-Fleming, 5 olhadas iguais, α = 5% bilateral: |z| > 4,56; 3,23; 2,63; 2,28; 2,04.
- O'Brien-Fleming, 3 olhadas: 3,47; 2,45; 2,00.
- Pocock, 5 olhadas: |z| > 2,41 em todas.
- Lan-DeMets tipo OBF: α acumulado(t) = 2·(1 − Φ(1,96/√t)).
- mSPRT (mistura normal): Λₙ = √(σ²/(σ² + nτ²))·exp(n²τ²·d̄²/(2σ²(σ² + nτ²))); rejeita H₀ quando Λₙ ≥ 1/α (20 para α = 5%). d̄ = diferença média; σ² = variância; τ² = variância da mistura (calibrar pelo tamanho de efeito típico).

(c) Usar O'Brien-Fleming quando há pressão para encerrar cedo e se aceita parar só com efeito enorme. Usar mSPRT em ferramenta que já o implementa. Não inventar fronteiras ad hoc no meio do teste.

(d) Exemplo. Teste de página com leituras nos dias 3, 6, 9, 12 e 14 (aprox. iguais): no dia 3 só para se |z| > 4,56. Um "B está 40% melhor, z = 2,3" no dia 6 não para o teste (fronteira 3,23).

(e) Fontes: [4], [7], [8].

### 2.7 SRM: o teste de sanidade que vem antes do resultado

(a) Conceito. Sample Ratio Mismatch: a divisão observada difere da planejada. Indica defeito de randomização, redirect, bot ou perda de rastreio, e invalida o resultado. Fabijan et al. reportam ~6% dos experimentos da Microsoft com SRM.

(b) Fórmula. Qui-quadrado de aderência, 1 grau de liberdade para 2 braços: χ² = Σ (obs − esp)²/esp. Limiar conservador: p < 0,001 ⇔ χ² > 10,83.

(c) Usar em todo split por URL (ferramenta de split de páginas, redirect, rotas A/B). Não aplicar ao "A/B" de orçamento do Meta: ali a divisão não é por usuário.

(d) Exemplos. 50/50 esperado, 10.400 contra 9.600 sessões: χ² = 32 → SRM, não ler o resultado; investigar redirect lento, pixel de uma rota sem carregar, bloqueio de um link. 520 contra 480: χ² = 1,6 → ok.

(e) Fontes: [1], [2], [3].

### 2.8 CUPED: reduzir variância com dado pré-teste

(a) Conceito. Usa uma covariável medida antes do teste (X) correlacionada com a métrica (Y) para remover variância. Na Bing, ~50% de redução, isto é, metade da amostra para o mesmo poder.

(b) Fórmula. θ = cov(Y, X)/var(X); Y_cuped = Y − θ·(X − média(X)). Variância cai por um fator (1 − ρ²).

(c) Usar em testes com unidade estável e histórico: geo-teste (venda por região nas 4 semanas anteriores), teste entre contas, teste de remarketing sobre base conhecida. Pouco útil em visitante frio de infoproduto (não há histórico do usuário). Nunca usar covariável medida durante o teste que possa ser afetada pelo tratamento.

(d) Exemplo. Geo-teste com 27 UFs; venda por UF no mês anterior tem ρ = 0,8 com a venda no teste: variância cai 64%, amostra necessária cai para 36%. Um teste que exigiria 6 semanas cabe em ~2.

(e) Fontes: [9], [10].

### 2.9 A/B bayesiano: Beta-Binomial e perda esperada

(a) Conceito. Em vez de p-valor, calcula a distribuição posterior de cada taxa e a perda esperada de escolher cada variante. Decide quando a perda esperada cai abaixo de um "limiar de importância" definido antes (Stucchio, VWO SmartStats).

(b) Fórmulas.
- Priori Beta(α₀, β₀); posterior = Beta(α₀ + s, β₀ + n − s).
- Priori informativa a partir do histórico: taxa média 2% com peso de 500 sessões → Beta(10; 490).
- P(B > A) ≈ Φ((p_B − p_A)/EP) para n grande; senão Monte Carlo.
- Perda esperada de escolher B = E[max(p_A − p_B; 0)] ≈ EP·[φ(z) − z·(1 − Φ(z))], com z = (p_B − p_A)/EP.
- Regra de parada: perda esperada < ε (ex.: ε = 1% relativo da taxa-base).

(c) Usar quando a pergunta é de negócio ("quanto perco se escolher errado?") e o custo de errar é pequeno e reversível. Não usar como remédio para peeking: a perda esperada também se degrada com parada oportunista se a priori estiver mal calibrada, e "P(B > A) = 95%" não equivale a p < 0,05.

(d) Exemplo (mesmo dado de 2.4). A 40/2.000, B 52/2.000: P(B > A) ≈ 90%; perda esperada de escolher B ≈ 0,023 p.p. (≈1,1% relativo de 2%). Se ε = 2% relativo, pode-se ficar com B: não está provado melhor, mas a perda esperada de errar é desprezível. Leitura frequentista (p = 0,20) e bayesiana não se contradizem: uma diz "não provado", a outra "barato apostar".

(e) Fontes: [11], [12].

### 2.10 Por que o "teste" de criativo dentro do Meta não é A/B

(a) Conceito. Dentro de um conjunto, o Meta distribui gasto por previsão de desempenho (comportamento de bandit) e entrega cada anúncio a públicos diferentes. Braun e Schwartz chamam isso de entrega divergente: a diferença medida mistura efeito do criativo e efeito de quem o algoritmo escolheu. Anúncio que recebeu pouco gasto não foi testado; foi censurado.

(b) Regra prática. Comparação entre anúncios do mesmo conjunto = ranking de desempenho na entrega, não efeito causal. Para leitura causal: ferramenta de A/B do Meta (divide público) ou conjuntos com orçamento fixo e igual, cientes de que ainda há entrega divergente.

(c) Usar o ranking de entrega para decidir onde pôr dinheiro (pergunta operacional). Não usar para concluir "o ângulo X funciona melhor no público" (pergunta causal) nem para generalizar para outra plataforma ou outro público.

(d) Exemplo. Anúncio A gastou R$3.000 e tem CPA R$160; B gastou R$150 e tem 0 vendas. B não "perdeu"; nunca jogou. P(0 vendas | CPA real R$200, R$150) = 47%.

(e) Fontes: [34], [13].

### 2.11 Multi-armed bandit e Thompson sampling para criativos

(a) Conceito. Thompson sampling sorteia uma taxa da posterior de cada braço e aloca ao maior sorteio; na prática, a fração de verba de cada braço tende a P(ser o melhor). Minimiza o custo de exploração, mas estima mal o tamanho do efeito dos perdedores.

(b) Fórmula para vendas por real (Gamma-Poisson). Priori Gamma(α₀, β₀) sobre λ = vendas/R$ (α₀ = vendas fictícias, β₀ = gasto fictício). Posterior de cada anúncio: Gamma(α₀ + k, β₀ + S). Sortear λ de cada um N vezes; P(melhor) = fração das vezes em que cada um teve o maior λ. Alocar verba ∝ P(melhor), com piso de exploração (10-20% para novos).

(c) Usar para distribuir verba entre campanhas/conjuntos de mesmo objetivo e para decidir quais criativos novos recebem orçamento próprio. Não usar quando a meta é aprender o efeito (relatório para o expert, decisão de ângulo): para isso, teste com alocação fixa. Não usar com conversões atrasadas (backend que fecha dias depois) sem ajustar a defasagem.

(d) Exemplo (priori α₀ = 2, β₀ = R$360, isto é, CPA de R$180 com peso de 2 vendas; simulação com 200 mil sorteios):

| anúncio | vendas | gasto | CPA posterior | P(melhor) | P(CPA > R$200) |
|---|---|---|---|---|---|
| A | 20 | R$3.600 | R$180 | 32% | 34% |
| B | 8 | R$1.200 | R$156 | 57% | 26% |
| C | 3 | R$900 | R$252 | 10% | 75% |

Leitura: B merece mais verba, mas não "ganhou"; C é candidato a pausa; A é o porto seguro.

(e) Fontes: [13], [11].

### 2.12 Risco de falso positivo e taxa de sucesso dos testes

(a) Conceito. Mesmo com p < 0,05, a chance de o "vencedor" ser falso depende da taxa a priori de ideias boas. Kohavi, Deng e Vermeer chamam isso de false positive risk (FPR). A fórmula é discutida (crítica da Analytics-Toolkit), mas a direção é sólida: quando poucas ideias funcionam, boa parte dos vencedores é ruído.

(b) Fórmula. FPR = α'·π₀/(α'·π₀ + (1 − β)·π₁), com α' = 0,025 (direção do ganho), π₁ = taxa de ideias que de fato funcionam, poder (1 − β) = 0,8.

(c) Usar para calibrar o quanto confiar num histórico de "testes vencedores". Não usar como p-valor de um teste isolado.

(d) Exemplo. Se 10% das variações testadas são de fato melhores: FPR = 0,0225/(0,0225 + 0,08) = 22%. Com poder de 30% (teste subdimensionado): FPR = 0,0225/(0,0225 + 0,03) = 43%.

(e) Fontes: [14], [15].

### 2.13 Lei de Twyman e teste A/A

(a) Conceito. "Qualquer número que parece interessante ou diferente costuma estar errado." Antes de comemorar, procurar defeito de instrumentação, duplicação, bot, fuso horário. Teste A/A (duas cópias idênticas) valida a máquina de teste: deve dar p < 0,05 em ~5% das vezes e sem SRM.

(b) Regra. Lift > 30% em métrica de conversão sem mudança estrutural na oferta → auditar rastreio antes de escalar. Rodar um A/A sempre que trocar ferramenta de split ou script de rastreio.

(c) Usar em todo resultado espetacular. Não usar como desculpa para rejeitar resultado que passou em SRM, A/A e auditoria.

(d) Exemplo. Rota B com conversão 3,4% contra 2,0% (+70%): conferir se a rota B dispara Purchase duas vezes (pixel + CAPI sem event_id) e se a Hotmart confirma a mesma proporção.

(e) Fontes: [39], [1].

---

## 3. Pequenas contagens, ranking e comparações múltiplas

### 3.1 Regressão à média

(a) Conceito. Valores extremos observados com ruído tendem a se aproximar da média na próxima medição, sem nenhuma intervenção. O melhor anúncio da semana tende a piorar; o pior dia tende a melhorar. Escalar o campeão e "ver a performance cair" é em boa parte isso.

(b) Fórmula. Previsão = média + R·(observado − média), com R = var_verdadeira/(var_verdadeira + var_ruído). Para CPA em escala log: var_ruído ≈ 1/k.

(c) Usar sempre ao interpretar topo e fundo de ranking e "efeito" de intervenções aplicadas depois de um dia ruim (a otimização "funcionou" porque o dia seguinte seria melhor de qualquer jeito). Não usar quando k é grande (R → 1).

(d) Exemplo. Anúncio com 12 vendas e CPA R$110; média da conta R$180; variância verdadeira entre anúncios (log) 0,04; ruído 1/12 = 0,083 → R = 0,33. CPA previsto ≈ e^(ln 180 + 0,33·(ln 110 − ln 180)) ≈ R$153. Planeje a escala com R$153, não R$110.

(e) Fontes: [20], [21].

### 3.2 Empirical Bayes e shrinkage (James-Stein) para ranking de anúncios

(a) Conceito. Estimar cada anúncio sozinho é pior, no agregado, do que puxar cada estimativa para a média do grupo na proporção do seu ruído (paradoxo de Stein; Efron-Morris com rebatidas de beisebol: Clemente, 0,400 após 45 rebatidas, previsto 0,290, terminou 0,346). Anúncios com poucas vendas encolhem muito; com muitas, quase nada.

(b) Fórmulas.
- Gamma-Poisson (CPA): CPA_shrink = (β₀ + S)/(α₀ + k). α₀ e β₀ estimados pelo histórico de anúncios da conta (método dos momentos: variância observada das taxas menos a variância de Poisson esperada).
- Beta-Binomial (taxa de página, CTR, hook): p_shrink = (α₀ + s)/(α₀ + β₀ + n).
- James-Stein (médias normais): fator de encolhimento B = (m − 3)·σ²/Σ(xᵢ − x̄)²; estimativa = x̄ + (1 − B)(xᵢ − x̄).

(c) Usar em todo ranking de criativos, páginas, públicos e posicionamentos com volumes desiguais. Não usar quando os itens não são comparáveis (anúncio de remarketing e de público frio na mesma priori: separar em grupos). A priori precisa ser estimada com dados da própria conta e da mesma fase do lançamento.

(d) Exemplo (α₀ = 5 vendas, β₀ = R$900, ou seja, CPA da conta R$180 com peso de 5 vendas):

| anúncio | vendas | gasto | CPA bruto | CPA encolhido |
|---|---|---|---|---|
| X | 3 | R$300 | R$100 | R$150 |
| Y | 25 | R$3.750 | R$150 | R$155 |
| Z | 2 | R$700 | R$350 | R$229 |

O ranking bruto põe X em primeiro; o encolhido empata X e Y, e Y tem 8× mais evidência.

(e) Fontes: [20], [21].

### 3.3 Maldição do vencedor e erro do tipo M

(a) Conceito. O vencedor de uma seleção entre muitos ruidosos tem efeito superestimado. Em teste subdimensionado, um resultado significativo precisa exagerar o efeito para cruzar o limiar (Kohavi; Vermeer et al. com 8 replicações em grande escala). Gelman e Carlin chamam isso de erro do tipo M.

(b) Regra. Razão de exagero esperada de um efeito significativo: ~1,4× com poder de 50%; ~2× ou mais com poder de 20%. Com N anúncios de mesma qualidade verdadeira, o melhor observado fica ~1,5 a 2 erros-padrão acima da verdade (N = 5 a 20).

(c) Usar para descontar o lift do vencedor antes de projetar escala ou receita. Não usar para descartar um resultado replicado.

(d) Exemplo. 15 criativos com ~15 vendas cada (erro ~±50%); o melhor mostra CPA R$110 contra média R$180. Antes de projetar, aplicar shrinkage (3.2) e exigir replicação: uma semana nova com orçamento próprio.

(e) Fontes: [14], [16], [44 - Gelman e Carlin, referência de conhecimento prévio].

### 3.4 Comparações múltiplas: FWER, Bonferroni e FDR (Benjamini-Hochberg)

(a) Conceito. Testar muitas coisas ao mesmo tempo garante falsos positivos. Bonferroni controla a chance de qualquer falso positivo (FWER), mas é severo. Benjamini-Hochberg controla a proporção esperada de falsos entre os achados (FDR), com muito mais poder.

(b) Fórmulas.
- P(≥ 1 falso positivo em m testes independentes) = 1 − 0,95^m. m = 20 → 64%.
- Bonferroni: rejeitar se p < α/m.
- BH: ordenar p₍₁₎ ≤ ... ≤ p₍ₘ₎; achar o maior i com p₍ᵢ₎ ≤ (i/m)·q; rejeitar 1..i.

(c) Usar BH (q = 10%) para triagem de criativos, públicos e quebras. Bonferroni quando um único falso positivo é caro (trocar a oferta inteira). Não usar nenhum dos dois para "salvar" quebras que não estavam no plano: aí o problema é o garden of forking paths (6.3).

(d) Exemplo. 20 criativos comparados contra a média; p-valores ordenados 0,001; 0,004; 0,012; 0,03; 0,04; ... Limiares BH (q = 10%): 0,005; 0,010; 0,015; 0,020; 0,025. Três achados. Bonferroni (0,0025): um.

(e) Fontes: [22].

---

## 4. Séries temporais de performance

### 4.1 Ruído diário: quanto o CPA pode oscilar sem nada ter mudado

(a) Conceito. A variação dia a dia do CPA é dominada pelo número de vendas do dia. A diferença entre dois dias tem erro maior que cada dia isolado.

(b) Fórmula. Faixa de 95% da razão CPA_hoje/CPA_ontem sob "nada mudou" ≈ e^(±1,96·√(2/k)), com k = vendas por dia. Com superdispersão, multiplicar o expoente por √D.

| vendas/dia | oscilação diária normal do CPA (95%) |
|---|---|
| 20 | −36% a +86% |
| 60 | −30% a +43% |
| 120 | −22% a +29% |

(c) Usar antes de reagir a "o CPA subiu hoje". Não usar para mudança que persiste vários dias: aí é tendência (4.4).

(d) Exemplo. Conta com 60 vendas/dia: CPA de R$180 para R$230 (+28%) em um dia está dentro do ruído. Mexer em orçamento por isso reinicia aprendizado sem motivo.

(e) Fontes: [19], [25].

### 4.2 Controle estatístico de processo: cartas de controle e regras de Western Electric

(a) Conceito. Uma carta de controle separa variação comum (ruído do processo) de variação especial (algo mudou). Limites em ±3σ; as regras de Western Electric acrescentam padrões de sequência que detectam deslocamentos menores, ao custo de mais alarmes falsos.

(b) Fórmulas.
- Carta p (taxa de conversão diária com nᵢ sessões): LC = p̄ ± 3·√(p̄(1 − p̄)/nᵢ).
- Carta c (vendas/dia, Poisson puro): c̄ ± 3·√c̄.
- Carta XmR (individuais; preferida para CPA e para dados superdispersos): LC = média ± 2,66·MR̄, MR̄ = média das amplitudes móveis |xₜ − xₜ₋₁|.
- Regras de Western Electric: (1) 1 ponto além de 3σ; (2) 2 de 3 consecutivos além de 2σ do mesmo lado; (3) 4 de 5 além de 1σ do mesmo lado; (4) 8 consecutivos do mesmo lado da linha central. Nelson acrescenta tendência de 6 pontos e 15 pontos dentro de 1σ.

(c) Usar XmR para CPA diário, razão pixel/Hotmart, conversão de checkout. Usar no máximo regras 1 e 4 em painel diário (as quatro juntas geram alarme falso em ~1 de cada 10-20 dias). Não usar com série não estacionária (dias de abertura e fechamento de carrinho): construir carta por fase do lançamento.

(d) Exemplo. CPA dos últimos 20 dias: média R$180, MR̄ = R$22 → limites [R$121; R$239]. Um dia a R$235 é ruído; três dias seguidos entre R$215 e R$235 (2 de 3 além de 2σ ≈ R$219) é sinal. Carta c para 60 vendas/dia: [37; 83]; se a variância real é 4× a média, a carta c dispara toda semana, por isso XmR.

(e) Fontes: [23], [24].

### 4.3 Superdispersão: Poisson subestima o ruído real

(a) Conceito. Vendas diárias reais variam mais que Poisson (dia da semana, leilão, criativos entrando, disparos de WhatsApp). Ignorar isso estreita intervalos e gera falsos alarmes. Binomial negativa adiciona um parâmetro de dispersão.

(b) Fórmulas. Índice de dispersão D = variância/média (Poisson: D = 1). Binomial negativa NB2: Var = μ + μ²/θ; θ = μ²/(Var − μ). Corrigir qualquer erro-padrão Poisson multiplicando por √D.

(c) Usar calculando D nas últimas 3-4 semanas da mesma fase. Não usar D de período com mudança estrutural (troca de oferta) no meio.

(d) Exemplo. Vendas/dia com média 60 e variância 300: D = 5; θ = 3.600/240 = 15. O erro de 95% do CPA diário sobe de ±25% para ±57%. Uma queda de 60 para 40 vendas num dia (z Poisson = −2,6) vira z ≈ −1,15: normal.

(e) Fontes: [25].

### 4.4 Sazonalidade de dia da semana e de fase do lançamento

(a) Conceito. Conversão e CPM variam por dia da semana e, em lançamento, por fase (captação, aquecimento, abertura, último dia). Comparar fases diferentes atribui à campanha o que é calendário.

(b) Regra. Índice de dia = média do dia da semana/média geral (8+ semanas). Comparar sempre semana contra semana no mesmo dia, ou fase contra a mesma fase da edição anterior (D−3 contra D−3). Testes duram semanas cheias.

(c) Usar em todo relatório de tendência. Não usar índice de semana calculado com menos de 4 ocorrências de cada dia.

(d) Exemplo. Domingo com índice 0,8: CPA de domingo 20% acima da média é o padrão, não piora.

(e) Fontes: [42], [1].

### 4.5 Detecção de mudança: CUSUM e changepoint (PELT)

(a) Conceito. Cartas de 3σ demoram a detectar deslocamentos pequenos e persistentes. CUSUM acumula desvios e detecta mudanças pequenas sustentadas. PELT (Killick et al.) segmenta a série inteira em regimes com custo linear, para análise retrospectiva ("quando a conta mudou de patamar?").

(b) Fórmulas.
- CUSUM superior sobre y = ln(CPA diário): Sₜ = max(0; Sₜ₋₁ + yₜ − μ₀ − κ); alarme se Sₜ > h. Típico: κ = 0,5·δ (metade do deslocamento que se quer pegar), h = 4 a 5 σ.
- Tempo médio para detectar ≈ h/(δ − κ).
- PELT: minimizar Σ custo(segmentos) + β·(nº de pontos de mudança); penalidade β ≈ 2·ln(n) (BIC) para evitar segmentação excessiva. Implementações: ruptures (Python), changepoint e rupturesRcpp (R).

(c) Usar CUSUM para vigilância diária de CPA e razão pixel/caixa. Usar PELT no pós-morte de lançamento. Não usar PELT online (é offline) nem penalidade baixa (acha "mudança" toda semana).

(d) Exemplo. σ diário do ln(CPA) = 0,2; κ = 0,1; h = 0,8. Deslocamento sustentado de +20% (δ = 0,18) é detectado em ~10 dias; de +40% (δ = 0,34), em ~3-4 dias. A carta de 3σ quase nunca pega os +20%.

(e) Fontes: [26], [23].

### 4.6 Fase de aprendizado do Meta como fenômeno estatístico

(a) Conceito. O Meta indica ~50 eventos de otimização por conjunto em 7 dias para sair do aprendizado; mudanças significativas (orçamento > ~20% de uma vez, segmentação, evento, anúncios) reiniciam. Estatisticamente, 50 eventos dão CPA com ±28%: o próprio algoritmo também está estimando com ruído.

(b) Regra. Conjunto sustentável precisa de ~7 eventos/dia → com CPA R$180, ~R$1.260/dia por conjunto otimizado para compra. Abaixo disso, consolidar conjuntos ou otimizar para evento mais alto no funil (com o risco de Goodhart, 6.6).

(c) Usar para dimensionar estrutura (quantos conjuntos a verba suporta). Não tratar como lei física: a regra é heurística da plataforma, fonte secundária.

(d) Exemplo. R$6.000/dia a CPA R$180 sustentam ~4-5 conjuntos em compra. Abrir 12 conjuntos de R$500 deixa todos em aprendizado permanente.

(e) Fontes: [41].

---

## 5. Atribuição e incrementalidade

### 5.1 Atribuição observacional erra, e erra para cima

(a) Conceito. Gordon, Zettelmeyer, Bhargava e Chapsky compararam 15 experimentos randomizados no Facebook com métodos observacionais (matching, regressão, propensity): os observacionais em geral superestimaram o efeito e, em metade dos estudos, erraram por um fator de 3. O estudo de 2023 com 663 experimentos confirmou que métodos observacionais de ponta não recuperam o efeito causal.

(b) Regra. Venda atribuída pelo pixel ≠ venda causada pelo anúncio. ROAS atribuído é teto otimista do ROAS incremental, principalmente em remarketing e com janela de visualização.

(c) Usar para descontar atribuição de remarketing, view-through e marca. Não usar para descartar a atribuição como sinal de otimização: o algoritmo precisa dela; o erro está em tratá-la como lucro causado.

(d) Exemplo. Remarketing com ROAS atribuído 6: boa parte desses compradores já estava no carrinho. Sem holdout, assumir incrementalidade de 30-60% é mais honesto do que 100%.

(e) Fontes: [31], [32].

### 5.2 Conversion Lift (holdout por usuário)

(a) Conceito. O Meta separa aleatoriamente usuários em teste (podem ver anúncios) e controle (não veem) e mede conversões dos dois via pixel, CAPI ou upload offline. Lift = conversões a mais no teste, escaladas pelo tamanho dos grupos. Crítica: quem vende a mídia desenha, guarda o controle e calcula a resposta; acesso é limitado.

(b) Fórmulas. Incremental = C_teste − C_controle·(N_teste/N_controle). CPA incremental = gasto/incremental. Variância do incremental ≈ C_teste + C_controle·(N_teste/N_controle)². Controle pequeno explode a variância. Fonte secundária estima ~475 compras por braço para lift de 20% e ~1.730 para 10%.

(c) Usar para calibrar o fator de incrementalidade da conta 1-2 vezes por ano ou em mudança grande de estratégia. Não usar com controle de 10% e volume de infoproduto: o intervalo fica inútil. Preferir 30-50% de controle em campanhas específicas (ex.: remarketing).

(d) Exemplo. Gasto R$60.000; teste (90%) 1.800 compras; controle (10%) 150 → equivalente 1.350. Incremental 450 ± 1,96·√(1.800 + 81·150) = 450 ± 231 → [219; 681]; CPA incremental [R$88; R$274]. Pixel atribuiu 400 (CPA R$150). Com controle de 10% o teste não distingue "Meta superestima" de "Meta subestima".

(e) Fontes: [33], [31].

### 5.3 Geo-lift e controle sintético (GeoLift)

(a) Conceito. Liga ou desliga mídia em regiões e compara com um "controle sintético" (combinação ponderada de regiões não tratadas que imita a pré-tendência das tratadas). GeoLift (Meta, código aberto) implementa controle sintético aumentado com ridge.

(b) Regras da documentação do GeoLift: pré-período ≥ 4-5× a duração do teste e ≥ 25 períodos (idealmente 52 semanas); ≥ 20 unidades geográficas; teste ≥ 15 dias com dado diário (4-6 semanas com semanal); cobrir ao menos um ciclo de compra; dado diário fortemente preferido.

(c) Usar para medir incrementalidade total do Meta (ou de um canal) sem depender do pixel; funciona com venda da Hotmart por região (fonte de verdade). Não usar com volume baixo por região: com 60 vendas/dia nacionais, uma região de 3% das vendas tem ~2 vendas/dia e o MDE fica acima de 30-50%. No Brasil, unidades naturais: 27 UFs ou DDDs agregados.

(d) Exemplo. Desligar Meta em 6 UFs que somam 15% das vendas por 21 dias: ~190 vendas esperadas no grupo tratado; o MDE realista com controle sintético fica em ~25-35%. Responde "o Meta é incremental?", não "o Meta é 12% incremental?".

(e) Fontes: [27].

### 5.4 Pixel x CAPI x caixa: a razão de rastreio como métrica monitorada

(a) Conceito. A plataforma de vendas (Hotmart) registra a venda aprovada; o Meta estima a influência dos anúncios a partir dos eventos que recebe. Divergências vêm de evento duplicado (pixel + CAPI sem deduplicação), evento faltando, janela de atribuição, conversões modeladas (pós-iOS 14) e reembolsos/boletos.

(b) Regras.
- Deduplicação: mesmo event_id e event_name no pixel e no servidor; o Meta deduplica pelo par. event_id errado provoca deduplicação indevida.
- Razão de rastreio R = compras no Gerenciador (janela 1 dia após clique)/vendas aprovadas na Hotmart com UTM de Meta, mesmo período e mesmo escopo.
- R > 1,1 → suspeitar duplicidade. R < 0,6 → evento faltando ou atribuição perdida.
- Monitorar R em carta XmR (4.2); mudança brusca em R é incidente de rastreio, não de performance.
- Janela padrão 7 dias clique + 1 dia visualização infla com view-through; comparar com 1 dia clique aproxima do caixa.

(c) Usar diariamente. Não usar o número do Gerenciador como receita; não "corrigir" CPA multiplicando por R de outro período.

(d) Exemplo. Gerenciador 95 compras, Hotmart 70 vendas com utm_source Meta: R = 1,36 → checar event_id do Purchase; se o CAPI gera ID novo, cada venda conta duas vezes e o algoritmo otimiza sobre dado inflado.

(e) Fontes: [35], [36], [37].

### 5.5 Conversões modeladas e janelas

(a) Conceito. Desde o iOS 14 parte das conversões não é observada e o Meta a estima por modelagem (Aggregated Event Measurement e modelos estatísticos). O número do Gerenciador é uma mistura de observado e modelado, com erro próprio não publicado.

(b) Regra. Quanto menor o conjunto, maior a fração relativa de ruído da modelagem; nunca decidir anúncio individual por diferença de 1-2 conversões no Gerenciador. A fonte de verdade é caixa + UTM/src/sck.

(c) Usar o Gerenciador para direção e otimização interna. Não usar para fechar CPA financeiro.

(d) Exemplo. Anúncio com "3 compras" no Gerenciador e 1 venda com o sck dele na Hotmart: tratar como 1-3, intervalo largo, sem decisão.

(e) Fontes: [35], [36].

---

## 6. Unit economics e decisão

### 6.1 CPA máximo a partir do valor por comprador

(a) Conceito. Em lançamento pago, o ingresso raramente paga o anúncio; o CPA máximo vem do valor total por comprador: ticket líquido + order bumps + conversão de backend.

(b) Fórmula. V = ticket_líquido + Σ(take-rate_bump × bump_líquido) + taxa_backend × ticket_backend_líquido. CPA_equilíbrio = V. CPA_máx = V/ROAS_alvo.

(c) Usar para fixar o teto de CPA antes do lançamento e revisar quando a taxa de backend da edição anterior for conhecida. Não usar taxa de backend de uma única edição sem intervalo: 15 vendas de backend em 300 compradores são 5% [3,0%; 8,1%].

(d) Exemplo. Ingresso R$47 (líquido ~R$40); bump com take de 30% × R$37 = R$11; backend 5% × R$3.000 líquido ~R$2.700 = R$135. V ≈ R$186. Para ROAS 1,3: CPA_máx ≈ R$143. Se o backend real for 3%, V cai para R$132: o teto de R$200 dá prejuízo.

(e) Fontes: [1], dedução contábil.

### 6.2 ROAS marginal contra ROAS médio

(a) Conceito. O ROAS médio mede o histórico; o marginal mede o próximo real. Decisão de escala depende do marginal. O ROAS médio pode parecer estável enquanto o último incremento de verba devolve menos que o equilíbrio. Meridian define mROI como o retorno de um aumento pequeno (δ ≈ 1%) sobre o gasto histórico.

(b) Fórmulas. CPA_marginal = ΔS/Δk. mROI = Δreceita/ΔS. Escalar enquanto CPA_marginal < CPA_máx (não enquanto CPA_médio < CPA_máx).

(c) Usar comparando blocos de vários dias (a diferença de vendas entre dois dias tem erro enorme: 4.1). Não usar Δk de um único dia; não usar quando outra coisa mudou junto (criativo novo, fase do lançamento).

(d) Exemplo. Semana 1: R$5.000/dia, 30 vendas/dia (CPA R$167). Semana 2: R$6.000/dia, 34 vendas/dia (CPA médio R$176, "quase igual"). CPA marginal = R$1.000/4 = R$250, acima do teto. Erro do Δk em 7 dias: 4×7 = 28 vendas incrementais contra ruído de ±√(210 + 238)·1,96 ≈ ±41: o marginal ainda não está medido. Manter a escala por mais uma semana ou voltar um passo antes de concluir.

(e) Fontes: [29], [45].

### 6.3 Curvas de resposta e saturação (Hill)

(a) Conceito. Vendas crescem com gasto a taxa decrescente. Robyn e Meridian modelam isso com a função de Hill (e adstock para efeito defasado). O ponto ótimo de verba é onde o CPA marginal toca o CPA máximo.

(b) Fórmulas.
- Hill: vendas(S) = V_máx·S^a/(K^a + S^a). K = gasto de meia saturação; a = forma (a = 1 é Michaelis-Menten; a > 1 dá curva em S).
- Marginal (a = 1): d vendas/dS = V_máx·K/(K + S)²; CPA_marginal = (K + S)²/(V_máx·K).
- Verba ótima (a = 1): S* = √(V_máx·K·CPA_máx) − K.

(c) Usar para planejar teto de verba por campanha com 4+ semanas de dados em níveis de gasto variados. Não usar ajuste com gasto quase constante (a curva é inidentificável) nem extrapolar muito além do maior gasto observado.

(d) Exemplo. V_máx = 80 vendas/dia, K = R$6.000. Com S = R$5.000: 36 vendas (CPA médio R$137), mas CPA marginal = 11.000²/(80·6.000) = R$252. Com CPA_máx R$200: S* = √(80·6.000·200) − 6.000 ≈ R$3.800/dia. CPA médio bom esconde que o último real já está caro.

(e) Fontes: [28], [30], [44].

### 6.4 Custo do erro tipo I contra tipo II e limiar de decisão

(a) Conceito. Em verba, os dois erros têm preços diferentes. Tipo I (escalar ou manter um anúncio que é ruim) custa o excesso de CPA no gasto que segue. Tipo II (pausar um anúncio bom) custa o lucro futuro que ele geraria e o criativo que não volta. O limiar de decisão sai da razão de custos, não de "95%".

(b) Fórmula. Pausar se P(CPA > CPA_máx | dados) > C_pausar_bom/(C_pausar_bom + C_manter_ruim). Posterior Gamma-Poisson da seção 2.11 dá P(CPA > CPA_máx) = P(λ < 1/CPA_máx).

(c) Usar para regras de corte e escala com criativo escasso (alto custo de pausar bom → limiar alto, 80-90%) ou abundante (limiar baixo, 60-70%). Não usar sem piso mínimo de gasto (≥ 1,5-3× CPA_máx).

(d) Exemplo. Anúncio com R$600 e 2 vendas (CPA R$300); priori Gamma(2; R$360). Posterior Gamma(4; R$960): CPA médio R$240; P(CPA > R$200) = 71%. Se manter um ruim custa R$1 e pausar um bom custa R$2 (criativo escasso), limiar = 2/3 = 67% → pausar por pouco. Se criativo é abundante (custos 1:1, limiar 50%), pausar sem dúvida.

(e) Fontes: [11], [13].

### 6.5 Valor da informação e quando parar de testar

(a) Conceito. Coletar mais dado só compensa se a decisão pode mudar e se o ganho esperado de decidir melhor supera o custo de esperar (verba no braço pior, prazo do lançamento). Perda esperada (2.9) multiplicada pelo volume afetado dá o valor da informação.

(b) Fórmula. Valor de continuar ≈ (perda esperada agora − perda esperada após mais dados) × volume futuro afetado. Custo de continuar ≈ fração no braço pior × diferença esperada × duração. Parar quando custo > valor, ou quando a perda esperada < ε.

(c) Usar em testes com prazo (lançamento acaba no domingo). Não usar para justificar parar teste que está "perdendo" para o favorito do gestor.

(d) Exemplo. Página: perda esperada de escolher B hoje = 0,023 p.p. A página ainda receberá 20.000 sessões no lançamento: custo esperado de errar ≈ 4,6 vendas (~R$850 a CPA R$185). Mais 7 dias de teste deixam 50% do tráfego no braço possivelmente pior durante 7 dias. Se a diferença esperada é pequena, decidir agora é racional; se a página será reutilizada em 5 edições, o volume afetado ×5 justifica testar mais.

(e) Fontes: [11], [12].

### 6.6 Regras de escala

(a) Conceito. Escalar é aumentar gasto sob incerteza de CPA marginal e com risco de reiniciar aprendizado.

(b) Regra prática. Escalar quando o limite superior de 80% do CPA encolhido (3.2) está abaixo de CPA_máx e há ≥ 30-50 vendas no período de referência; passos de +20-40% a cada 2-3 dias; medir o marginal em blocos (6.2); recuar um passo quando o CPA marginal de 2 blocos seguidos passa do teto.

(c) Usar em campanhas fora do aprendizado. Não escalar campeão de 10 vendas (maldição do vencedor, 3.3).

(d) Exemplo. Campanha com 60 vendas em 3 dias a CPA R$150: limite superior de 80% ≈ 150·e^(1,28/√60) ≈ R$177 < R$200 → escalar +20%.

(e) Fontes: [41], [45].

---

## 7. Armadilhas cognitivas do analista

### 7.1 Paradoxo de Simpson

(a) Conceito. Um efeito em cada subgrupo pode se inverter no agregado quando os grupos têm composições diferentes (Berkeley 1973: mulheres pareciam discriminadas no total, mas eram admitidas igual ou mais em cada departamento). A escolha entre agregado e quebra exige raciocínio causal.

(b) Regra. Antes de comparar duas campanhas, quebrar por fase do lançamento, posicionamento e público frio/quente; se a composição de gasto difere, comparar dentro dos estratos e ponderar pela mesma composição.

(c) Usar quando as campanhas não gastaram nas mesmas proporções por estrato. Não usar quebras que não tenham sentido causal (ex.: hora do dia sem hipótese).

(d) Exemplo. Campanha A: CPA melhor que B no frio (R$190 contra R$210) e no quente (R$90 contra R$100), mas A tem CPA total pior porque gastou 90% no frio e B 50%.

(e) Fontes: [40].

### 7.2 Viés de sobrevivência

(a) Conceito. Analisar só o que sobreviveu (anúncios não pausados, compradores que não pediram reembolso, edições que deram certo) distorce a conclusão.

(b) Regra. Toda análise de "o que funciona" inclui os pausados e os que nunca receberam gasto, com o motivo da exclusão.

(c) Usar em análise de padrões de criativos vencedores. Não usar a lista de campeões para inferir "ganchos que funcionam" sem a lista de perdedores com o mesmo gancho.

(d) Exemplo. "Os 5 melhores anúncios usam depoimento": se 40 dos 45 perdedores também usam, o depoimento não explica nada.

(e) Fontes: [1].

### 7.3 Viés de seleção e entrega divergente

(a) Conceito. Quando o tratamento não é atribuído ao acaso, os grupos diferem antes do tratamento. No Meta, o algoritmo escolhe quem vê cada anúncio: o viés é estrutural.

(b) Regra. Comparação sem randomização responde "onde o algoritmo achou compradores", não "qual mensagem convence mais".

(c) Usar para limitar a generalização de rankings de criativo. Não usar como desculpa para nunca comparar.

(d) Exemplo. Anúncio de depoimento com CPA menor pode ter sido entregue a quem já seguia o expert.

(e) Fontes: [34], [31].

### 7.4 HARKing e garden of forking paths

(a) Conceito. HARKing é formular a hipótese depois de ver o resultado. Garden of forking paths (Gelman e Loken): mesmo sem pescar p-valores, quando a análise depende dos dados (qual quebra olhar, qual período, qual métrica), há muitas comparações implícitas e a significância perde o sentido.

(b) Regra. Plano de análise escrito antes (OEC, quebras, período). Achado fora do plano = hipótese para o próximo teste, nunca conclusão. P(≥ 1 "achado" em 20 quebras ao acaso) = 64%.

(c) Usar em todo relatório pós-lançamento. Não usar quebra "mulheres 35-44 no Reels converteram 2×" como base de escala sem replicação.

(d) Exemplo. Após o teste de página dar empate, o analista descobre que B ganhou "no mobile à noite". É bifurcação: registrar e testar de novo.

(e) Fontes: [38].

### 7.5 Lei de Goodhart

(a) Conceito. Quando uma medida vira meta, deixa de ser boa medida. Otimizar CPA de ingresso pode trazer comprador barato e frio que não compra o backend.

(b) Regra. Métrica de decisão = valor por real até o backend (receita do produto principal por venda de ingresso ou R$/venda de backend), com CPA de ingresso como restrição, não como objetivo. Acompanhar métricas de guarda: comparecimento, take do bump, conversão de backend por campanha.

(c) Usar ao escolher evento de otimização (lead, checkout, compra) e ao premiar campanhas. Não usar métrica de topo (CPC, CTR, CPM) como critério de corte isolado.

(d) Exemplo. Campanha A com CPA de ingresso R$120 e 2% de backend; B com R$180 e 6%. Com backend líquido R$2.700: valor por real A = (40 + 54)/120 = 0,78; B = (40 + 162)/180 = 1,12. A é "melhor" no painel e pior no caixa. (Atenção: 6% contra 2% com 150 compradores cada ainda precisa de intervalo: [3,2%; 11,0%] contra [0,7%; 5,7%].)

(e) Fontes: [1], [14].

### 7.6 Twyman, confirmação e o número que agrada

(a) Conceito. O número que confirma o que o gestor queria é auditado menos. Twyman manda auditar mais.

(b) Regra. Resultado favorável recebe o mesmo checklist de um desfavorável: SRM, razão pixel/caixa, duplicidade, período, escopo do numerador e denominador iguais.

(c) Usar sempre. Não usar ceticismo seletivo.

(d) Exemplo. Conversão de checkout pulou de 35% para 55% no dia em que o CAPI foi ativado: hipótese padrão é duplicidade, não melhora.

(e) Fontes: [39], [1].

---

## 8. Manual de bolso: regras de decisão

1. Nenhum CPA sai sem k ao lado; erro relativo de 95% ≈ 1,96/√k.
2. Abaixo de 20 vendas, usar intervalo exato de Poisson (tabela 1.2); acima, a aproximação basta.
3. Zero vendas só prova CPA acima do teto a partir de 3 × CPA_máx gastos; pausar antes é limitar perda, não diagnóstico.
4. Taxa de conversão com n < 1.000 ou p < 5% sai com Wilson; nunca Wald.
5. Diferença de CPA entre dois anúncios só é real se z = (k₁ − k₂)/√(k₁ + k₂) passar de 2 (gastos iguais).
6. Para detectar 20% de diferença são necessárias ~400 vendas por braço; para 50%, ~70-100. Quem não tem isso não testa CPA de criativo, ranqueia.
7. Antes de todo teste de página, calcular MDE = 4/√(vendas por braço); se o MDE for maior que o efeito plausível, não rodar.
8. Teste dura semanas cheias (7 ou 14 dias) e a decisão é tomada na data marcada.
9. Olhar o painel todo dia é livre; agir sobre p < 0,05 diário infla o falso positivo para ~19% em 10 olhadas.
10. Se precisa parar cedo, usar O'Brien-Fleming (5 olhadas: z > 4,56; 3,23; 2,63; 2,28; 2,04) ou ferramenta com mSPRT.
11. Todo split por URL passa por SRM (χ² > 10,83 → resultado inválido) antes de qualquer leitura.
12. Lift acima de 30% sem mudança de oferta é tratado como erro de rastreio até prova em contrário (Twyman).
13. Comparação de anúncios dentro do mesmo conjunto é ranking de entrega, não efeito causal.
14. Anúncio que gastou menos de 1 × CPA_máx não perdeu; não foi testado.
15. Todo ranking de criativos usa CPA encolhido (Gamma-Poisson com priori da conta); o bruto engana nos extremos.
16. Projetar escala com o CPA encolhido do campeão, nunca com o observado; esperar regressão à média.
17. Campeão com menos de 30 vendas precisa replicar em semana nova antes de receber verba grande.
18. Triagem de 10+ criativos usa Benjamini-Hochberg com q = 10%; decisão irreversível usa Bonferroni.
19. Achado em quebra que não estava no plano é hipótese para o próximo teste, nunca conclusão.
20. Oscilação diária de CPA dentro de e^(±1,96·√(2/k)) é ruído; com 60 vendas/dia, −30% a +43%.
21. Calcular o índice de dispersão D das vendas diárias; multiplicar todo erro Poisson por √D.
22. CPA diário e razão pixel/caixa vivem em carta XmR (média ± 2,66·MR̄); agir em ponto fora do limite ou em 8 pontos seguidos do mesmo lado.
23. Deslocamentos pequenos e persistentes são vigiados com CUSUM sobre ln(CPA); carta de 3σ não os pega.
24. Comparar sempre o mesmo dia da semana e a mesma fase do lançamento; nunca abertura de carrinho contra captação.
25. Não mexer em orçamento por variação de um dia: reinicia aprendizado e reage a ruído.
26. Conjunto otimizado para compra precisa de ~7 eventos/dia; dimensionar o número de conjuntos pela verba ÷ (7 × CPA).
27. Escalar quando o limite superior de 80% do CPA encolhido estiver abaixo do teto com 30-50+ vendas; passos de +20-40%.
28. Decisão de escala usa CPA marginal (ΔS/Δk em blocos de vários dias), não CPA médio.
29. Recuar um passo de verba quando o CPA marginal de dois blocos seguidos passar do teto.
30. Pausar quando P(CPA > CPA_máx) superar C_pausar_bom/(C_pausar_bom + C_manter_ruim); criativo escasso pede limiar de 80-90%.
31. CPA máximo é derivado do valor por comprador (ingresso + bump + backend) com intervalo na taxa de backend; revisar a cada edição.
32. Métrica-mestre é valor até o backend por real; CPA de ingresso é restrição, não objetivo (Goodhart).
33. Venda atribuída pelo pixel é teto otimista de venda causada; remarketing e view-through recebem desconto até haver holdout.
34. Holdout de incrementalidade com controle de 10% em volume de infoproduto não conclui; usar 30-50% em campanha específica.
35. Geo-lift exige ≥ 20 unidades, pré-período ≥ 4-5× o teste e ≥ 15 dias; responde "é incremental?", não "quanto exatamente".
36. Razão Gerenciador/Hotmart acima de 1,1 = suspeita de duplicidade (event_id); abaixo de 0,6 = evento perdido.
37. O financeiro fecha pela Hotmart com UTM/sck; o Gerenciador orienta, não fatura.
38. Comparar campanhas com composições diferentes de público e fase exige estratificar (Simpson).
39. Análise do que funciona inclui os pausados e os que nunca gastaram (sobrevivência).
40. Resultado que agrada recebe a mesma auditoria do que desagrada.

---

## 9. Fontes

[1] Kohavi, Tang, Xu. Trustworthy Online Controlled Experiments (Cambridge, 2020), cap. SRM e guardrails. https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/sample-ratio-mismatch-and-other-trustrelated-guardrail-metrics/8DBB0F59AC7729D7BC6B94690DB9CCD5
[2] Sample ratio mismatch (Wikipedia). https://en.wikipedia.org/wiki/Sample_ratio_mismatch
[3] Eppo, documentação de SRM. https://docs.geteppo.com/statistics/sample-ratio-mismatch/
[4] Johari, Pekelis, Walsh. Always Valid Inference: Bringing Sequential Analysis to A/B Testing. https://arxiv.org/abs/1512.04922
[5] Evan Miller. How Not To Run an A/B Test. https://www.evanmiller.org/how-not-to-run-an-ab-test.html
[6] Alura. Não pare seu teste A/B quando ele atingir significância estatística. https://www.alura.com.br/artigos/nao-pare-seu-teste-ab-quando-ele-atingir-significancia-estatistica
[7] Statsig, Sequential testing (mSPRT). https://docs.statsig.com/experiments/advanced-setup/sequential-testing
[8] ldbounds, Lan-DeMets group sequential boundaries. https://aflyfortrout.r-universe.dev/ldbounds/doc/manual.html
[9] Deng, Xu, Kohavi, Walker. CUPED (WSDM 2013). https://exp-platform.com/cuped/
[10] Deng et al. From Augmentation to Decomposition: A New Look at CUPED in 2023. https://arxiv.org/abs/2312.02935v1
[11] Chris Stucchio. Bayesian A/B decision rule (perda esperada). https://www.chrisstucchio.com/blog/2014/bayesian_ab_decision_rule.html
[12] Stucchio. VWO SmartStats technical whitepaper. https://www.chrisstucchio.com/pubs/VWO_SmartStats_technical_whitepaper.pdf
[13] Russo, Van Roy et al. A Tutorial on Thompson Sampling. https://arxiv.org/abs/1707.02038
[14] Kohavi, Deng, Vermeer. A/B Testing Intuition Busters (KDD 2022). https://exp-platform.com/abtestingintuitionbusters/
[15] Analytics-Toolkit. False Positive Risk in A/B Testing (crítica). https://blog.analytics-toolkit.com/2023/false-positive-risk-in-a-b-testing/
[16] Vermeer, Kohavi et al. Trustworthy A/B Patterns and the Winner's Curse (KDD 2026). https://www.lukasvermeer.nl/publications/paper/2026/09/02/trustworthy-ab-patterns-and-the-winners-curse.html
[17] Brown, Cai, DasGupta. Interval Estimation for a Binomial Proportion (Statistical Science, 2001). https://projecteuclid.org/euclid.ss/1009213286
[18] Agresti, Coull. Comentário/intervalos aproximados. https://users.stat.ufl.edu/~aa/articles/agresti_coull_2001.pdf
[19] GraphPad. Como calcular o intervalo de confiança de uma contagem (Garwood). https://www.graphpad.com/support/faq/how-quickcalcs-computes-the-confidence-interval-of-a-count
[20] Brown. In-season prediction of batting averages (empirical Bayes, Efron-Morris). https://arxiv.org/pdf/0803.3697
[21] David Robinson. Understanding empirical Bayes estimation (using baseball statistics). https://www.r-bloggers.com/2015/09/understanding-empirical-bayes-estimation-using-baseball-statistics/
[22] Benjamini, Hochberg (1995). Controlling the False Discovery Rate. https://www.dcscience.net/Benjamini-Hochberg-1995-FDR.pdf e https://en.wikipedia.org/wiki/False_discovery_rate
[23] Western Electric rules (Wikipedia). https://en.wikipedia.org/wiki/Western_Electric_rules
[24] Quality Gurus. Nelson Rules and Western Electric Rules. https://www.qualitygurus.com/nelson-rules-and-western-electric-rules-for-control-charts/
[25] LibreTexts. Overdispersion (Poisson x binomial negativa). https://stats.libretexts.org/Courses/Knox_College/Linear_Models_and_Rurita_Kralovstvi/17%3A_Count_Dependent_Variables/17.03%3A_Overdispersion
[26] rupturesRcpp (PELT, Killick et al. 2012). https://www.rdocumentation.org/packages/rupturesRcpp/versions/1.0.2
[27] Meta GeoLift, Best Practices. https://facebookincubator.github.io/GeoLift/docs/Best%20Practices/BestPractices
[28] Google Meridian, Media saturation and lagging (Hill + adstock). https://developers.google.com/meridian/docs/advanced-modeling/media-saturation-lagging
[29] Google Meridian, ROI, mROI e curvas de resposta. https://developers.google.com/meridian/docs/basics/roi-mroi-response-curves
[30] Packaging Up Media Mix Modeling: An Introduction to Robyn. https://arxiv.org/pdf/2403.14674
[31] Gordon, Zettelmeyer, Bhargava, Chapsky. A Comparison of Approaches to Advertising Measurement (Marketing Science, 2019). https://www.kellogg.northwestern.edu/faculty/gordon_b/files/fb_comparison.pdf
[32] Gordon, Moakler, Zettelmeyer. Close Enough? (2023). https://www.kellogg.northwestern.edu/faculty/research/detail/2023/close-enough-a-large-scale-exploration-of-non-experimental
[33] Haus. Understanding Meta incrementality testing. https://www.haus.io/article/meta-incrementality-testing
[34] Braun, Schwartz. Where A-B Testing Goes Wrong (Journal of Marketing, 2024). https://scholar.smu.edu/business_marketing_research/40
[35] Meta for Developers. Conversions API, deduplicação por event_id. https://developers.facebook.com/docs/marketing-api/conversions-api/app-events
[36] Trafius. Por que o Gerenciador de Anúncios marca vendas erradas. https://trafius.com.br/blog/por-que-gerenciador-anuncios-marca-vendas-erradas
[37] Vini Ensina. Como rastrear vendas da Hotmart no Meta Ads em 2026. https://viniensina.com.br/?p=3071
[38] Gelman, Loken. The garden of forking paths. http://www.stat.columbia.edu/~gelman/research/unpublished/p_hacking.pdf
[39] Twyman's law (Wikipedia). https://en.wikipedia.org/wiki/Twyman%27s_law
[40] MetricGate. Simpson's Paradox examples (Berkeley). https://metricgate.com/blogs/simpsons-paradox-examples
[41] Adtribute. Learning phase (fonte secundária sobre ~50 eventos/7 dias). https://www.adtribute.io/glossary/learning-phase
[42] VWO Brasil. Calculadora de tamanho de amostra e duração de teste A/B. https://vwo.com/br/tools/ab-test-duration-calculator/
[43] Reportei. Testes A/B para tráfego pago. https://reportei.com/testes-a-b-para-trafego-pago/
[44] Recast. Diminishing returns: accounting for channel saturation. https://getrecast.com/diminishing-returns/ ; Gelman, Carlin (2014), Beyond Power Calculations (erro tipo M), referência de conhecimento prévio: http://www.stat.columbia.edu/~gelman/research/published/retropower_final.pdf
[45] BooleanMaths. Marginal ROAS and saturation curves. https://booleanmaths.com/resources/marginal-roas-saturation-curves

Notas de verificação. Simulações próprias (Python/SciPy, outubro de 2026) confirmaram: quantis de Garwood da tabela 1.2; falso positivo de 19,4% com 10 olhadas; P(CPA > R$200) = 71% no exemplo 6.4; P(melhor) da tabela 2.11. Taxas de Armitage para 2-100 olhadas e fronteiras de O'Brien-Fleming/Pocock vêm da literatura clássica de ensaios sequenciais, não reverificadas por simulação. A regra de ~50 eventos da fase de aprendizado e a janela engage-through vêm de fontes secundárias.
