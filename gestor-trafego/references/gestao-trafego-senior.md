# Gestão de tráfego sênior: Meta Ads (e Google/YouTube) em 2024-2026

Pesquisa consolidada em 13/10/2026 para o agente "gestor sênior analítico e estatístico de tráfego e funis".
Contexto-alvo: infoproduto brasileiro, lançamento pago com ingresso de R$29-97, checkout Hotmart,
20-120 vendas/dia, R$5-10 mil/dia de verba, campanhas CBO, criativo de vídeo.

**Precedência:** quando este arquivo conflita com as regras próprias da sua conta (réguas que você já mediu e escreveu),
a regra da sua conta vence. Este arquivo é a biblioteca externa; as suas regras são a lei local.

---

## 0. Como ler este arquivo

### 0.1 Legenda de força de evidência

Cada afirmação carrega uma etiqueta. O agente deve citar a etiqueta quando usar a regra numa recomendação.

| Etiqueta | Significado | Peso |
|---|---|---|
| `[META-OFICIAL]` | Texto da própria Meta (engineering blog, developer docs, Help Center lido direto) ou do Google Ads Help | Alto para mecânica; baixo para "quanto melhora" (a Meta vende mídia) |
| `[META-VIA-2ª]` | Regra atribuída à Meta, mas lida em fonte secundária (Help Center não renderizou na coleta) | Médio; conferir no Ads Manager antes de usar como lei |
| `[CONSENSO]` | 3+ autores independentes dizem o mesmo | Alto como ponto de partida |
| `[AUTOR: nome]` | Opinião ou método de um praticante | Hipótese; útil, não lei |
| `[VENDOR]` | Blog de ferramenta/agência, sem metodologia | Baixo; só direção |
| `[CAMPO]` | Prática observada em operação real de lançamento pago; os números são exemplo de calibração | Ponto de partida; substitua pelo que a sua conta medir |
| `[CÁLCULO]` | Derivação matemática deste documento | Alto se as premissas valem |

### 0.2 Três avisos de método

1. **Benchmarks externos são direção, nunca régua.** Quase todo benchmark público é de e-commerce americano em dólar.
   O próprio Motion, o Barry Hott e a Influee dizem que a régua certa é o histórico da sua conta.
2. **A Meta tem incentivo para "gaste mais, automatize mais".** Números de melhoria publicados por ela (+8% qualidade,
   +22% ROAS com Advantage+) são de segmentos selecionados e não auditados.
3. **Material brasileiro operacional é escasso em fonte pública.** Pedro Sobral publica regras no blog. Kiso, Tessmann,
   Ladeira, Érico, Ícaro, Picinini e Natanael têm o método atrás de curso pago ou em vídeo sem transcrição indexável.
   Onde não achei fonte verificável, está escrito "sem fonte pública verificável". Não inventei posição de ninguém.

---

## 1. Andromeda e a mudança de "segmentar público" para "segmentar pelo criativo"

### 1.1 Princípio

O leilão da Meta tem duas etapas: **recuperação (retrieval)** e **ranqueamento**. O Andromeda é a recuperação: reduz
"dezenas de milhões" de anúncios candidatos a alguns milhares por impressão, antes do ranqueamento final.
Como ele lê o conteúdo do criativo (imagem, texto, áudio) para decidir a quem mostrar, **o criativo passou a fazer o
trabalho que antes era da segmentação**.

### 1.2 Fatos oficiais

- `[META-OFICIAL]` Andromeda entrou em produção em dezembro/2024. Ganho declarado: +6% de recall e +8% de qualidade de
  anúncios "em segmentos selecionados"; capacidade de modelo 10.000x; inferência 3x mais rápida; extração de
  features 100x mais rápida. A recuperação processa ~3 ordens de grandeza mais anúncios que as etapas seguintes.
  Fonte: engineering.fb.com (dez/2024).
- `[META-OFICIAL]` A Meta justificou o sistema pelo volume de variações geradas por Advantage+ e IA generativa
  (1 milhão de anunciantes, 15 milhões de anúncios gerados em um mês).
- `[META-OFICIAL]` (blog Meta, abr/2025, citado por Jon Loomer): "o foco mudou da segmentação de nicho para a
  diversificação criativa".
- `[META-VIA-2ª]` A antiga recomendação "no máximo 6 anúncios por conjunto" sumiu da documentação em fevereiro
  (Loomer liga isso ao Andromeda; a Meta não confirmou). Limite técnico atual: **50 anúncios por conjunto**.
- `[META-VIA-2ª]` Rollout completo em outubro/2025 (Common Thread Collective, citando Confect).

### 1.3 "Entity ID" e similaridade criativa

- `[CONSENSO]` Anúncios muito parecidos são agrupados e disputam como se fossem um só. Formulação do palestrante
  do Motion (jul/2026): "dezenas de anúncios parecidos = 1 Entity ID = 1 anúncio = 1 oportunidade de leilão";
  "10 anúncios diversos = 10 Entity IDs".
- **"Entity ID" é termo da indústria, não da Meta.** O mecanismo é inferido do comportamento, não documentado.
- `[META-VIA-2ª]` Representantes da Meta disseram a uma agência (Growth Collective) que conta com **score de
  similaridade acima de 65%** tende a mostrar anúncios às mesmas pessoas, saturando mais rápido. O score só sai
  por pedido ao representante (contas gerenciadas), e nem a Meta explica o cálculo.
- `[VENDOR]` CTC e outros recomendam similaridade abaixo de 40%. Fontes divergem (40%, 60%, 65%). Tratar como direção.
- `[AUTOR: Savannah Sanchez]` Para a Meta tratar como variação nova, o visual tem de mudar **nos primeiros 3-5 segundos**.
- `[AUTOR: Affect Group / VENDOR]` Conceito novo deve diferir do anterior em pelo menos **2 de 3 dimensões**:
  mensagem, tratamento visual, formato.

### 1.4 Regra operacional

- Diversidade = **conceito/ângulo, persona, formato, contexto** (Loomer; CTC; Motion). Trocar cor de fundo ou
  legenda não é criativo novo (Precis).
- Auditoria de similaridade: se todos os anúncios ativos cabem numa frase só, consolidar e produzir conceitos
  distintos (CTC).
- Rotação não resolve similaridade; similaridade não se resolve com mais volume (Motion).

### 1.5 Efeitos colaterais medidos (fonte secundária)

- `[VENDOR]` Estudo de 3.014 anunciantes (citado pela CTC): ROAS médio -7% durante o rollout; conversão de landing
  page de 3,5% para 2,9%. Vida útil efetiva do criativo caiu de **6-8 semanas para 2-4 semanas** (CTC).
- `[AUTOR: CTC]` Portfólio de 170+ marcas: CPM +28% a/a no 1º tri, CTR +43%, conversões em queda.
- `[CAMPO]` Em lançamento pago com verba alta, é comum o vencedor durar poucos dias e saturar por verba no criativo,
  abaixo até da janela "2-4 semanas" do mercado: nesse caso a cadência de criativo novo tem de ser semanal ou mais rápida.
  Meça a vida útil dos vencedores na sua conta.

### 1.6 Divergências

| Tema | Lado A | Lado B |
|---|---|---|
| Volume de anúncios | Loomer: tem conjunto com 50 anúncios; Motion: 15-20 por conjunto; CTC: 25 conceitos num conjunto bateu 5 conjuntos (+17% conversões, -16% custo, dado Five Nine Strategy) | Charley Tichenor: evitar 50+ por conjunto; poucos anúncios com mais dado cada vencem. Nick Shackelford: "testar mais anúncios muitas vezes piora a performance". Precis: "volume não vence qualidade" |
| Andromeda melhorou ou piorou? | Meta: +8% qualidade | Estudo de 3.014 contas: ROAS -7%; quem ia melhor antes caiu mais |
| Teste só de hook | Savannah Sanchez: trocar só os 2-3 s iniciais isola a variável | Opascope (2026): teste só de hook não dá sinal limpo pós-Andromeda; variar o anúncio inteiro |

### 1.7 Armadilhas

- Subir 10 variações do mesmo vídeo com hooks diferentes e esperar 10 testes. Provavelmente é 1 teste.
- Ler "diversidade" como "volume". O objetivo é **mais anúncios significativamente diferentes**, não mais anúncios.
- Culpar o Andromeda por criativo fraco. CTC: "o Andromeda revelou um pipeline criativo que já era fraco".

---

## 2. Estrutura de conta: consolidação, CBO/ABO, Advantage+

### 2.1 Princípio

`[CONSENSO]` Menos campanhas, menos conjuntos, público aberto, muitos conceitos dentro. O motivo é matemático:
o aprendizado é por conjunto, e fragmentar verba divide o volume de eventos que cada conjunto vê.

### 2.2 Regras com números

- `[META-VIA-2ª]` Performance 5 da Meta: simplificar estrutura e concentrar criativos numa campanha central;
  diversificar criativo; CAPI; validação por Conversion Lift, A/B ou MMM. Teste interno citado pela Meta:
  pares de criativos não idênticos deram **+32% de eficiência e +8% de alcance incremental**.
- `[AUTOR: Jon Loomer]` "O menor número de conjuntos possível sem prejudicar resultado"; começar com 1 conjunto e só
  abrir outro para resolver problema provado (localidades distintas, remarketing separado, volume de anúncios acima
  de 50, meta de verba por produto). Ligar Advantage Campaign Budget (CBO) sempre que possível.
- `[AUTOR: Foxwell]` Conta nova: 1 CBO com 1 conjunto. Exemplo Hollow: criativos para caçador, enfermeira, ciclista
  e pedreiro, todos no mesmo CBO; a persona está no criativo, não no público.
- `[AUTOR: Brad Ploch, Scalability School, abr/2026]` 1 campanha CBO por produto/oferta; conjunto = pasta, não segmento.
- `[AUTOR: Motion]` Menos campanhas; CBO para escalar, ABO para testar; **não separar conjunto por formato**
  (estático x vídeo); 15-20 anúncios por conjunto; otimizar no evento de negócio (compra), nunca em PageView.
- `[AUTOR: Affect Group]` 1 campanha, 1-2 conjuntos, 8-15 criativos simultâneos: 4-6 líderes, 3-5 intermediários,
  2-3 novos (aprox. 50/30/20).
- `[AUTOR: CTC]` Mais de 3-4 campanhas sem nenhuma chegar a 20+ conversões/semana: juntar os melhores anúncios
  numa campanha aberta.
- `[AUTOR: Charley Tichenor]` "Conta de uma campanha": 1 controle com vencedores + 1-2 conjuntos de teste de
  variáveis; público só idade/gênero/local; sem interesses nem exclusões. Excluir clientes aumenta custo.

### 2.3 Advantage+ (estado em 2025-2026)

- `[META-OFICIAL]` Developer blog (jun/2025) e docs (dez/2025): fluxo unificado substitui Manual, ASC e App.
  A partir da API v25.0 não se cria mais ASC pela flag antiga; "Advantage+" = Advantage+ audience + Advantage+
  campaign budget + Advantage+ placements ligados. O **limite de verba para clientes existentes (ECBC) foi
  descontinuado**; para replicar, excluir públicos de clientes num conjunto ou usar limite de gasto por conjunto.
- `[AUTOR: Loomer]` Advantage+ Sales aceita sugestão de público, exclusão de público personalizado e não tem limite
  de conjuntos (diferença para o antigo ASC).
- `[META-OFICIAL]` Anunciantes que não usavam Advantage+ creative e ligaram a segmentação por IA tiveram +22% de ROAS
  (dado da Meta, sem atribuição direta ao Andromeda).
- `[AUTOR: Foxwell]` Conferir os "enhancements" automáticos antes de gastar: vêm ligados por padrão e podem
  contaminar um teste deliberado.
- `[META-VIA-2ª]` No formato flexível, os enhancements do Advantage+ creative são "tudo ou nada" em algumas contas
  (Loomer, "3 problems with flexible format"). Conferir no Ads Manager da conta.

### 2.4 CBO x ABO

| Posição | Quem | Argumento |
|---|---|---|
| CBO-first (o anúncio "conquista" a verba) | Phil Kiel (Foxwell podcast), Brad Ploch, Foxwell, Loomer | O algoritmo aloca melhor que o comprador; forçar gasto é pagar caro por teste |
| ABO para teste, CBO para escala | Motion, HeroSpark, Sourei, Pedro Sobral (material antigo) | Teste precisa de gasto mínimo garantido por conceito; em CBO o novo não recebe verba |
| Teste separado mata o aprendizado | Artigo citado na busca Foxwell | Campanha de teste com 30% da verba isola o criativo do público onde ele vai rodar |
| Conceito novo em conjunto próprio | Barry Hott | Cada conceito compete em condição idêntica |

`[CAMPO]` Se a sua conta opera sempre em CBO, a divergência acima importa só para **como testar dentro do CBO** (ver seção 5).

### 2.5 Cálculo para uma conta típica

`[CÁLCULO]` 50 eventos/semana por conjunto = ~7 compras/dia por conjunto. Com CPA de R$175, um conjunto precisa de
~R$1.250/dia para sair do aprendizado. Com R$5-10 mil/dia, cabem **4 a 8 conjuntos "saudáveis" na conta inteira**.
Dez campanhas de R$250 com um conjunto cada nunca saem do aprendizado (3,5 vendas/semana cada).
`[CAMPO]` Se o dado da sua conta mostrar padrão contrário (ex.: campanha com 1 anúncio vendendo mais barato que com 4+),
lembre que esse dado tem viés de seleção, mas é o melhor que há. Declare o conflito; vence a conta até teste limpo.

### 2.6 Armadilhas

- Segmentar conjunto por interesse e chamar de "teste de público". Em 2025+ o criativo segmenta.
- Remarketing em conjunto separado com verba alta: público pequeno, CPA médio baixo e marginal alto (efeito
  breakdown, seção 7.5).
- Campanha nova para cada pack de criativo fragmenta eventos. `[CAMPO]` Há quem adote "pack novo = campanha nova" por
  rastreabilidade; o custo é aprendizado fragmentado. Se fizer isso, registre como trade-off consciente.

---

## 3. Fase de aprendizado

### 3.1 Princípio

O sistema precisa de volume do evento otimizado para estabilizar a entrega. Durante o aprendizado o CPA é mais
caro e mais volátil.

### 3.2 Regras

- `[META-VIA-2ª]` Sai do aprendizado com **~50 eventos otimizados em 7 dias, por conjunto** (não por campanha).
  Sem atingir: status "Aprendizado limitado". Causas típicas: público estreito, verba baixa, estrutura fragmentada.
- `[META-VIA-2ª]` Edições significativas que reiniciam: segmentação, criativo, evento de otimização, estratégia de
  lance, valor de orçamento (mudança grande), novo anúncio, pausa de 7+ dias.
- `[META-VIA-2ª]` Exemplo da própria Meta (citado por Loomer): de US$100 para US$101 não reinicia; de US$100 para
  US$1.000 pode reiniciar. A Meta **não publica o limite em %**. Os "20%" são regra de praticante.
- `[VENDOR]` Três aumentos de 10% na mesma semana podem reiniciar mesmo sem nenhum passar de 20%.
- `[META-VIA-2ª]` Orçamento diário pode gastar até 75% acima do definido num dia bom; o semanal não passa de 7x o diário.
- `[AUTOR: Tichenor]` Aprendizado longo é sinal de escolhas demais, não algo a "hackear" com mais anúncios.
- `[AUTOR: Flighted]` A regra de 50 eventos é impraticável abaixo de US$50 mil/mês; usar orçamento de teste a partir
  do CPA alvo.
- `[VENDOR]` Fórmula de piso: orçamento diário >= CPA alvo x 50 / 7. Para lance por custo, alguns blogs citam
  orçamento diário >= 5x o custo-alvo (não confirmado na Meta).

### 3.3 Armadilhas

- Confundir reinício de aprendizado com fadiga: por cerca de uma semana os dois parecem iguais (CPA sobe, CTR oscila).
- Medir criativo novo nas primeiras 24-48 h. O dado do dia 1 é do aprendizado.

---

## 4. Estratégias de lance

### 4.1 Mecânica `[META-OFICIAL via Loomer]`

| Estratégia | O que faz | Quando |
|---|---|---|
| Maior volume (padrão) | Maximiza eventos no orçamento, sem limite de custo | Ponto de partida de toda campanha nova; Loomer usa ~90% do tempo |
| Meta de custo por resultado (cost cap) | Mira um custo médio; não garante | Quando já se sabe o CPA médio sem meta e o CPA lucrativo; Loomer usa quando o CPA começa a subir |
| Bid cap | Teto de lance em cada leilão | Só avançado; lance calculado por taxa de conversão projetada e custo marginal |
| Maior valor / meta de ROAS | Prioriza valor da compra | Catálogo com preços variados; ingresso de preço único não se beneficia |

### 4.2 Regras com números

- `[AUTOR: Loomer]` Definir a meta de custo a partir do CPA médio observado **sem** meta. Meta agressiva demais =
  verba não gasta.
- `[VENDOR]` Trocar campanha para cost cap da noite para o dia derruba o gasto 25-40% no 1º dia; preferir duplicar
  com cost cap e reduzir a original aos poucos.
- `[META-VIA-2ª]` A ferramenta nativa de teste de criativo exige orçamento diário e **Maior volume**; não aceita
  cost cap, bid cap nem meta de ROAS.
- `[AUTOR: Barry Hott]` Desconfia de bid cap e cost cap: podem matar de fome um anúncio que gera lift total mesmo com
  CPA próprio ruim. Usa só se não houver tempo de analisar.
- `[AUTOR: Taylor Holiday/Andrew Faris, CTC]` "A Meta não sabe que resultado você quer; você sabe." Defesa de controle
  de custo quando o negócio tem teto de CPA definido por margem.

### 4.3 Aplicação a lançamento pago

`[CÁLCULO]` Ingresso de preço fixo, teto de CPA R$200 (exemplo). Cost cap a R$200 numa campanha cujo CPA sem meta está
em R$150 tende a não restringir nada; a R$120 tende a não gastar. Uso racional: cost cap ~10-20% abaixo do teto
**só** em campanha de escala que já provou CPA estável, nunca em teste.

---

## 5. Teste de criativos

### 5.1 Princípio

Teste só vale se responde a uma pergunta com amostra suficiente. Em 2025+ a unidade de teste é o **conceito**
(persona + ângulo + formato), e a iteração (hook, corpo, locutor) vem depois que o conceito provou tração.

### 5.2 Métodos e quem usa

| Método | Como | Prós | Contras | Quem defende |
|---|---|---|---|---|
| Vários anúncios no conjunto | 3-50 anúncios, Meta distribui | Simples; aprendizado fica no conjunto | Entrega desigual; alguns nunca rodam; não é split test | Loomer, Foxwell, Kiel |
| Ferramenta de teste de criativo (Ads Manager, out/2025) | Até 5 anúncios novos dentro de conjunto existente, até 30 dias, métrica escolhida; aprendizado fica no conjunto | Teste dentro do público real sem conjunto paralelo | Só Maior volume, só orçamento diário | `[META-VIA-2ª]` |
| A/B test nativo | Divide público, variável única | Vencedor estatístico sem sobreposição | Temporário; resultado pior durante o teste | Loomer (raramente usa) |
| Flexible ad format | Até 10 mídias num anúncio, Meta combina | Substitui Dynamic Creative (restrito em Vendas desde 2024) | Não diz a combinação vencedora; enhancements tudo-ou-nada | Loomer usa |
| 3:2:2 (Dynamic Creative) | 3 criativos x 2 textos x 2 títulos = 12 variações | Testa variação de ângulo já provado | Tichenor disse (set/2025) que **errou** sobre o 3:2:2 pós-Andromeda; agora é piso, não teto | Tichenor |
| Conceito por conjunto (ABO) | 1 conceito = 1 conjunto | Condição idêntica | Fragmenta eventos | Barry Hott, Pedro Sobral (material antigo) |
| Incubadora separada | Campanha de teste só para formato totalmente novo, "algumas semanas" | Protege a campanha principal | Isola o criativo do público final | Affect Group |

### 5.3 Cadência e volume (números)

| Fonte | Volume recomendado |
|---|---|
| `[AUTOR: CTC]` gasto < US$10 mil/mês | 8-12 criativos novos distintos/mês |
| `[AUTOR: CTC]` US$10-50 mil/mês | 15-25/mês |
| `[AUTOR: CTC]` > US$50 mil/mês | 25-40+/mês, renovação semanal; 2-3 novos distintos/semana em gasto moderado |
| `[AUTOR: CTC]` correlação | Marcas com 20+ anúncios novos/mês: ROAS 65% maior que < 10/mês (correlacional) |
| `[AUTOR: Savannah Sanchez]` US$30-100 mil/mês | 2 inspirações/semana x 2 hooks escritos x 2 aberturas visuais |
| `[AUTOR: Foxwell]` conta do zero | US$10-15 mil em ~2 semanas, 5 conceitos distintos (1 do fundador + 4 propostas/objeções) |
| `[AUTOR: Pedro Sobral]` lançamento | Não começa sem **20 anúncios na largada**; produz anúncio novo o tempo todo |
| `[AUTOR: Precis]` recurso limitado | 3 conceitos distintos por mentalidade de público; renovação ~2 semanas |
| `[AUTOR: Affect]` | Conceito novo a cada 1-2 semanas; 20-30% dos anúncios ativos novos a cada renovação |
| `[AUTOR: Foxwell]` IA | 10-15% do mix em criativo gerado por IA |

`[CÁLCULO]` Exemplo: uma conta que gasta ~R$150-300 mil/mês (equivalente a US$27-55 mil). Pela régua CTC: 15-40 criativos
distintos/mês. `[CAMPO]` Se o vencedor dura 3-5 dias e são necessários ~20 vencedores simultâneos para 120 vendas/dia,
a necessidade real é maior: **8-15 conceitos novos por semana**.

### 5.4 Amostra mínima antes de julgar

- `[AUTOR: Motion]` 2.000 impressões, 50-100 cliques ou 3-5 compras, e no mínimo 3 dias.
- `[AUTOR: Barry Hott]` ~20 sinais relevantes no conjunto (idealmente 20 compras) antes de julgar.
- `[AUTOR: Flighted]` Gastar **3x o CPA alvo** antes de decidir; 5x quando a verba permite.
- `[AUTOR: Manson Chen, Substack]` Até 30 conversões por anúncio para concluir.
- `[CÁLCULO]` Erro relativo do CPA com k vendas ~ ±1,96/√k: 3 vendas = ±113%; 6 = ±80%; 25 = ±39%.
  Nenhuma decisão de "este criativo é melhor que aquele" fecha com menos de ~20 vendas por braço. Com 3-5 vendas
  só se decide **matar o claramente ruim**, nunca coroar o vencedor.

### 5.5 Armadilhas

- Deixar os enhancements automáticos ligados num teste deliberado (Foxwell).
- Misturar criativo novo com campeão de prova social no mesmo conjunto: a Meta prefere o que já tem histórico, e o
  novo não gasta (vários vendors). Contraponto Kiel: se não gastou, o algoritmo já "votou".
- Ler teste de hook como teste de conceito.
- `[CAMPO]` Realocar verba no meio do teste. Todo A/B sai com cláusula de congelamento.

---

## 6. Frequência e fadiga criativa

### 6.1 Princípio

Fadiga é problema de tempo, exposição e frequência; resolve-se com rotação. Similaridade é outro problema
(seção 1.3) e rotação não resolve (Motion).

### 6.2 Regras

- `[META-VIA-2ª]` Status de entrega no Ads Manager: **"Criativo limitado"** = custo por resultado acima do histórico,
  mas abaixo de 2x; **"Fadiga criativa"** = custo por resultado >= 2x o histórico. A exposição conta, inclusive de
  outras campanhas da mesma página. A Meta pode avisar antes de publicar se prevê fadiga nos primeiros 7 dias.
  O rótulo aparece sobretudo em conjunto de criativo único e chega tarde.
- `[META-VIA-2ª]` Estudo Meta 2022 (citado por Loomer): queda de 45% de performance após 4 exposições. Loomer
  ressalva que a média ignora janela, posicionamento e engajamento.
- `[AUTOR: Loomer]` Não existe frequência "boa" ou "ruim"; se o resultado não está caindo, não se preocupar.
  Correção: somar anúncios novos e distintos ao conjunto, ou desligar e recomeçar.
- `[AUTOR: Ben Heath]` A fadiga costuma ser **do hook**, não do anúncio inteiro. Trocar a abertura reaproveita o corpo.
- `[VENDOR]` Frequência > 2,5 em prospecção sugere saturação (Sourei); > 3-4 em público frio (Coupler); remarketing
  pede refresh a 4-5 (adlibrary); Trafius: prospecção 1-3, remarketing 3-8.
- `[VENDOR]` Sinal combinado: CTR em queda contínua + CPM subindo + frequência subindo + CPA subindo. Um só não basta.

### 6.3 Aplicação

`[CAMPO]` Em lançamento, a saturação costuma ser por **verba no criativo** (ex.: R$500-800/dia), não por frequência. A régua prática é custo
por checkout subindo com gasto estável, em 2 leituras seguidas.

---

## 7. Mensuração: CAPI, EMQ, atribuição, breakdown effect

### 7.1 CAPI e deduplicação

- `[META-VIA-2ª]` Performance 5: CAPI ao lado do pixel, com correspondência de eventos de alta qualidade.
- `[CONSENSO]` Deduplicação por **mesmo `event_id` + mesmo `event_name`**, janela de ~48 h. Falhas comuns: ID ausente
  num dos lados; ID gerado separadamente no navegador e no servidor; tipo diferente (número x texto).
- `[CONSENSO]` E-mail e telefone em SHA-256; `fbp`, `fbc`, IP e user agent **sem hash**.
- `[VENDOR]` Pixel sozinho perde ~30% das conversões (Sourei; sem metodologia).

### 7.2 EMQ (Event Match Quality)

- `[META-VIA-2ª]` Nota de 0 a 10, só para eventos web. Alvo de praticante: **>= 6 ("Bom") em Purchase e
  InitiateCheckout**; agências miram 7-8+. Nenhuma fonte oficial confirma o "6" como limiar.
- Alavancas: enviar e-mail, telefone, nome, cidade, `external_id`, `fbc`/`fbp`, IP e user agent no evento de servidor.
  No checkout Hotmart, o Purchase vem do webhook/integração; o InitiateCheckout depende da página.

### 7.3 Atribuição (estado em 2026)

- `[AUTOR: Loomer, mar/2026]` Padrão em conversão no site: **7 dias clique / 1 dia engajamento / 1 dia visualização**,
  modelo Standard, contagem "todas as conversões".
- `[AUTOR: Loomer]` Desde março/2026, **clique conta só clique no link** (antes, qualquer clique, inclusive curtida).
  Interação sem link e visualização engajada passaram para "engage-through", padrão 1 dia. Conversões de 2 a 7 dias
  depois de um clique sem link deixam de contar.
- `[META-OFICIAL]` (developer blog, out/2025): janelas de 7 e 28 dias de visualização deixaram de sair pela Insights
  API a partir de 12/01/2026; continuam 1d/7d/28d clique, 1d engajamento, 1d visualização. Datas divergem entre
  fontes secundárias.
- `[AUTOR: Loomer]` Atribuição incremental (2025): modelo estima se o anúncio causou a conversão. Pouca diferença
  na conta dele; boa para quem já tem volume, ruim para quem luta com aprendizado. "First conversion" virou opção
  de otimização no fim de 2025; ele é cético.
- `[AUTOR: Loomer]` Recomendação: 7d clique para compra; tirar visualização de 1 dia em remarketing e em eventos que
  não são compra (é a configuração que mais infla resultado).
- `[AUTOR: Barry Hott]` Usar ferramenta de atribuição de terceiro por período longo; a plataforma tem incentivo a
  reivindicar crédito.
- `[CAMPO]` O pixel costuma marcar mais compras que a plataforma de pagamento, e a diferença cresce em dia de live
  (venda orgânica atribuída pela janela de clique). Venda para CPA vem da sua ferramenta de rastreamento de vendas
  (UTM/sck conferido); caixa vem da plataforma de pagamento (ex.: Hotmart).

### 7.4 Implicação para lançamento pago

`[CÁLCULO]` Em lançamento, o orgânico do expert (live, stories, grupo) cresce perto do carrinho. A janela de 7 dias de
clique captura gente que clicou num anúncio e comprou depois da live: o pixel sobe, o caixa de ads não sobe na mesma
proporção. **Ranking de criativo deve excluir dias de live** `[CAMPO]`.

### 7.5 Efeito breakdown

- `[META-VIA-2ª via Loomer]` O sistema otimiza o **total** da campanha, não o CPA médio de cada peça. Desloca verba
  para onde o **próximo** resultado é mais barato (custo marginal). Ao receber mais verba, o CPA médio da peça
  favorecida sobe; a peça com pouca verba parece mais barata.
- Exemplo Loomer: anúncio 2 recebe 80% da verba depois que o CPA dele caiu abaixo do anúncio 1; o CPA médio dele
  depois sobe acima do anúncio 1. Desligar o anúncio 2 tende a **piorar** o CPA total.
- Regra: comparar no nível de conjunto/campanha; pausar por média de CPA entre anúncios do mesmo conjunto exige
  cautela. Para provar, holdout.
- `[CAMPO]` Conflito declarado: pausar por anúncio com régua de gasto sem venda (ex.: R$230) é compatível com
  o efeito breakdown **quando o anúncio não vende nada**; não é compatível com pausar um anúncio de volume porque
  o CPA médio dele é maior que o de um anúncio de gasto pequeno. Por isso, pergunte antes de pausar
  campeão de volume.

---

## 8. Escala

### 8.1 Princípio

Escala é empurrar mais verba enquanto o **CPA marginal** (custo das vendas adicionais) fica abaixo do teto.
O CPA médio esconde o custo da escala: cada venda extra custa mais que a anterior (curva de retorno decrescente).

### 8.2 Vertical

- `[CONSENSO de praticante]` Aumentos de **~20% por vez**: "20% por semana" (vários), "no máximo 20% a cada 3-4 dias"
  (vários), "20-30% a cada 2-3 dias" (Sourei), "+20% a cada 48 h enquanto o ROAS segue saudável" (Sourei, fluxo
  diagonal), "+20% a cada poucos dias" (HeroSpark). **Não é regra da Meta.**
- `[AUTOR: Estêvão Soares]` 10%/dia dobra a verba em ~8 dias; 20%/dia em ~4 dias.
- `[VENDOR]` Escalar só com ROAS >= 20% acima do breakeven; segurar se o CPA ficar bem acima do alvo.
- `[VENDOR]` Escalar só quando o CPA segura por 3+ dias (Topgrowth).
- `[AUTOR: HeroSpark]` Escalar quando: CPA confortavelmente abaixo do teto, conjunto fora do aprendizado e criativos
  de reserva prontos. Parar quando o CPA encosta no teto. Exemplo: dobrar de R$6 mil para R$12 mil/mês levou o CPA
  de R$220 para R$270 e as vendas de ~27 para ~44 (CPA marginal = R$6.000/17 = **R$353**, 60% acima do médio).
- `[AUTOR: Pedro Sobral, material de comunidade, transcrição de terceiro]` "Escalar sempre na vertical; escalar na
  horizontal é rastejar." Duplicar conjunto melhora no curto prazo e não se sustenta.
- `[CAMPO]` Escala +20-40%/dia com CPA <= teto (ex.: R$200); quem subiu hoje não sobe de novo; saltos > 40% tendem a
  piorar o CPA.

### 8.3 Horizontal (duplicação, novos conjuntos/campanhas)

- `[AUTOR: Estêvão Soares]` Horizontal exige verba grande desde o início: referência de **50x o CPA em 7 dias** por
  estrutura nova. Abaixo de R$10 mil/mês, rever estrutura antes de horizontalizar.
- `[AUTOR: Sourei]` Fluxo diagonal: validar 5 criativos/ângulos por semana em ABO barato; graduar e escalar vertical
  na campanha de escala; frequência > 2,5 pede horizontal.
- `[AUTOR: Pedro Sobral, blog]` "Escala horizontal" no sentido de público: duplicar conjunto pode fazer a Meta gastar
  numa fatia mais qualificada; quanto maior o público, mais escala.

### 8.4 Por que a cópia do vencedor não repete

Explicações em ordem de plausibilidade:

1. **Regressão à média / maldição do vencedor** `[CÁLCULO]`: o vencedor foi escolhido entre vários com 5-15 vendas;
   parte do CPA baixo era sorte. A cópia mostra o CPA "verdadeiro", mais alto.
2. **Aprendizado zerado** `[CONSENSO]`: a cópia é conjunto novo, recomeça a fase de aprendizado.
3. **Canibalização e Entity ID** `[INFERÊNCIA a partir de 1.3]`: cópia idêntica disputa o mesmo leilão e o mesmo
   bolsão de público que o original.
4. **Perda de prova social** `[VENDOR]`: o post novo não tem comentários/curtidas; usar o mesmo ID de post na cópia
   mitiga.
5. **Saturação**: o original já gastou o melhor do público para aquele criativo.

`[CAMPO]` É comum a cópia do vencedor rodar com CPA bem acima do original, e a escala vertical na campanha original
bater a cópia 1x1x1. Conclusão prática: escalar no lugar, não duplicar; volume novo vem de criativo novo.

### 8.5 Verba por dia e hora

- `[META-VIA-2ª]` Orçamento diário oscila até +75% no dia (alguns citam +25%), teto semanal 7x o diário.
- `[VENDOR]` Mudar orçamento perto da meia-noite do fuso da conta concentra o gasto novo no dia seguinte; mudança no
  meio do dia faz o sistema tentar "alcançar" o novo valor nas horas restantes (comportamento relatado, não documentado).
- `[VENDOR]` Pico de uso móvel no Brasil: 19h-23h BRT (adlibrary).
- `[CAMPO]` Decisão de escala de manhã com o dia anterior fechado; subidas de madrugada; leitura à tarde para pausa.
- `[VENDOR]` Programação por horário (dayparting) só funciona com orçamento vitalício; raramente vale em conta com
  volume, porque reduz o leilão disponível.

### 8.6 Armadilhas

- Decidir escala pelo CPA **blended** (ads + orgânico). `[CAMPO]` O blended piora sozinho ao escalar porque o orgânico
  é fixo no numerador. Escala se decide pelo CPA marginal de ads.
- Escalar campanha com um criativo só: a verba encontra o teto do criativo (ex.: R$500-800/dia) e não da campanha.
- Escalar e subir criativo novo no mesmo dia: duas mudanças, nenhuma leitura.

---

## 9. Regras de corte (kill) e de escala (scale) com números

### 9.1 Kill: o que o mercado usa

| Regra | Fonte | Nota |
|---|---|---|
| Gasto >= 3x CPA alvo com 0 conversão = matar | `[CONSENSO de praticante]` (Flighted, AdsCrew, vários) | Regra mais comum |
| 3x CPA com 2 conversões = amarelo, gastar mais 1x; 3+ = manter | Flighted | Implica ~4x no total |
| 2x CPA alvo com 1 conversão = segurar 48-72 h | vários | 2x é checkpoint, não corte |
| CPA 2x o alvo por 2 dias, ou US$25 sem conversão | vendor | Agressiva |
| CPA > 25% pior que o alvo depois de 48-72 h | Motion | Para criativo com volume |
| Não pausar antes de 7 dias salvo catástrofe | Affect Group | Conservadora |
| CPA alto no dia 1-2 **não** é sinal de corte | Flighted | Aprendizado + atraso de atribuição |
| Corte imediato legítimo: zero entrega em 24-48 h, CTR muito abaixo da conta (ex.: 0,3% contra 1,5%), reprovação | Flighted | Não precisa esperar |
| Impressões altas com CTR caindo = criativo queimado | Affect Group | Qualitativo |
| ROAS < 1,5 = diagnosticar, não aumentar verba | HeroSpark | Para produto com margem |

### 9.2 Kill: exemplo de régua própria (a sua vence as acima)

`[CAMPO]` Exemplo com teto de CPA R$200: CPA > R$200 = pausa; gasto > R$230 sem venda = pausa; custo por checkout > R$60 = pausa; ~R$145 com 1
checkout = pausa sem esperar. Janelas: bom em 3d e ruim hoje = baixar 20-50%; ruim em 3d e ruim hoje = pausa;
ruim em 3d e bom hoje = mantém e reavalia.

`[CÁLCULO]` A régua R$230 equivale a ~1,15x o CPA teto, bem mais agressiva que o "3x" do mercado. É defensável
quando a conta tem um **indicador antecedente forte** (custo por checkout correlacionado com a venda) que o mercado
genérico não usa; o checkout dá ~5-10x mais eventos que a compra e decide mais cedo com menos ruído.
Custo da agressividade: mata alguns falsos negativos. P(0 vendas | CPA real = R$150, gasto R$230) ~ e^(-1,53) ~ 22%
(Poisson). Ou seja, ~1 em 5 anúncios bons com CPA R$150 é morto pela régua de R$230 se olhado só pela venda.
Por isso a régua de checkout complementa.

### 9.3 Scale: consolidado

| Regra | Fonte |
|---|---|
| +20% por degrau, a cada 2-4 dias | Consenso de praticante |
| Só fora do aprendizado e com criativos de reserva | HeroSpark |
| Só com CPA estável 3+ dias | Topgrowth (vendor) |
| Parar quando o CPA encosta no teto | HeroSpark |
| Avaliar o CPA marginal do degrau, não o médio | CTC/Within/Funnel (conceito) |
| `[CAMPO]` +20-40%/dia com CPA <= teto; degrau +15-30% após 2 dias seguidos no teto e checkout dentro da régua; teto por criativo ~R$600-800/dia | Exemplo de régua própria |

### 9.4 Fórmula do CPA marginal de um degrau

`[CÁLCULO]` CPA marginal = (gasto depois - gasto antes) / (vendas depois - vendas antes), com janelas iguais e
sem dia de live. Exemplo: R$2.000/dia com 14 vendas (CPA R$143) para R$2.500 com 16 vendas (CPA médio R$156):
marginal = 500/2 = **R$250**, acima do teto de R$200, embora o médio pareça bom. Com 2 vendas de diferença o erro
é enorme; ler em 2-3 dias somados.

---

## 10. Diagnóstico por métrica

### 10.1 Árvore de diagnóstico (do topo ao caixa)

Ler sempre na ordem, e mudar só o elo que quebrou. Cada elo tem o seu dono.

```
CPA alto
├─ CPM alto?            → leilão/público/qualidade (sazonalidade, similaridade, ranking de qualidade)
│                         dono: estrutura + criativo
├─ CTR (link) baixo?    → criativo não para o dedo ou não promete o clique
│   ├─ hook rate baixo  → primeiros 3 s (abertura visual, primeira frase)
│   └─ hook ok, hold baixo → corpo não sustenta; promessa do hook não se cumpre
├─ CPC (link) alto?     → CPC = CPM / CTR; consequência das duas acima, não causa
├─ Clique → LPV baixo?  → página lenta, redirecionamento, clique acidental (Audience Network)
├─ LPV → checkout baixo → página: promessa x anúncio, preço, prova, CTA na 1ª dobra
├─ Checkout → compra baixo → checkout: Pix, cartão recusado, campos, order bump, parcelamento
└─ Compra ok, caixa não fecha → atribuição (pixel x Hotmart), reembolso, orgânico na janela
```

Fórmulas: CPC = CPM / (CTR x 10) quando CTR em %, ou CPM / (CTR x 1.000) com CTR em fração; CPA = CPC / taxa de
conversão do clique; CPA = CPM / (1.000 x CTR x conv. clique).

`[AUTOR: Motion]` CTR alto com conversão ruim = desalinhamento entre promessa do anúncio, público e página. CTR é
diagnóstico, não objetivo.
`[AUTOR: Pedro Sobral]` Checkout para compra entre **5% e 12%** = ótimo (contexto de lançamento, carrinho de produto
principal). Acompanhar custo para chegar à página de vendas, ao checkout e por compra, e as taxas entre etapas.

### 10.2 Métricas de criativo

| Métrica | Fórmula | Faixas citadas | Fonte |
|---|---|---|---|
| Hook rate (thumbstop) | Reproduções de 3 s / impressões | < 25% fraco; 25-35% sólido; > 35% forte (Motion blog); 20-40% sólido (Motion glossário); ~28% sólido, 35-45% elite (outro) | Motion e vendors |
| Hold rate | Reproduções de 15 s (ou ThruPlay) / reproduções de 3 s | Média 40-50%; > 60% forte; < 30% fraco | Motion; definições variam |
| CTR (link) | Cliques no link / impressões | Meta média 0,9-1,5%, forte > 1,5% (Motion); mediana 1,71% tráfego (WordStream EUA 2025); BR "bom > 1,5%, ótimo > 2,5%" (Trafius, sem fonte) | ver ressalvas |
| Tempo médio de vídeo | — | ~50% da duração | Motion |
| Conclusão | — | 30-40% forte | Motion |

`[CAMPO]` Em lançamento pago é comum que **CTR, CPC, CPM e hook rate não prevejam a venda**, e que o custo por
checkout do dia 1 preveja melhor. Meça a correlação na sua conta. Hook e hold servem para **consertar** um criativo, não para **escolher** criativo.
`[CAMPO]` CPC e CTR sempre por `link_click`; "cliques (todos)" infla até 40%.

### 10.3 Indicadores antecedentes x consequentes

| Antecedente (lê cedo, mais ruído de negócio) | Consequente (lê tarde, é o que paga) |
|---|---|
| Hook rate, hold rate, CTR link, CPC link, custo por LPV | Compras, CPA, ROAS, caixa da plataforma de pagamento |
| Custo por checkout iniciado (em geral o melhor antecedente) | CPA marginal, R$ por venda do produto principal (métrica-mestre) |

Regra: antecedente decide **corte rápido do ruim**; consequente decide **escala**. Nunca escalar por antecedente.

### 10.4 Benchmarks (com ressalva forte)

| Item | Valor | Fonte e ressalva |
|---|---|---|
| CPM infoproduto Brasil | R$38 (faixa R$28-60) | Trafius 2026, **projeção sem metodologia** `[VENDOR]` |
| CPM BR topo / remarketing | R$15-35 / R$25-60 | Trafius, sem fonte |
| CPC link BR | R$0,80-2,50 (genérico); infoproduto R$3,20-8,00 `[CAMPO]` | Trafius genérico não serve para infoproduto |
| ROAS infoproduto BR | 4,0-8,0 | Trafius, sem fonte; **não se aplica a ingresso de lançamento pago**, que mira ~1 |
| CPM global 2025 | US$14,19 (+20% a/a); CTR 2,19% (+13,5%) | Triple Whale, ~35 mil contas, varejo |
| CPM Brasil x Europa | 60-70% abaixo | adlibrary, não verificado |
| Pix no checkout | +15-25% conclusão | relato de operadores, não verificado |
| Aprovação de cartão | ~85% média; 93%+ com antifraude/retentativa | HeroSpark (comercial) |
| Comparecimento | 10-20% em lançamento gratuito; > 50% em pago | GoExplosion |
| Webinar | 35-45% de comparecimento (média) | HeroSpark |

---

## 11. Lançamento pago e ingresso: economia brasileira

### 11.1 Princípio

No lançamento pago, o ingresso **filtra** e **financia** o tráfego; o lucro está no back-end (produto principal).
Logo o ingresso mira ROAS perto de 1 (ou um pouco abaixo, se o back-end paga), e a métrica-mestre é o retorno
por comprador de ingresso no back-end.

### 11.2 Regras com números

- `[AUTOR: HeroSpark]` CPA máximo = ticket / ROAS alvo. ROAS de breakeven só de anúncio ~1,04 com taxa de plataforma
  de ~4%; o alvo real é maior porque imposto, reembolso e lucro ficam de fora.
- `[CÁLCULO]` Exemplo: breakeven líquido do front ~R$58 por venda (ticket ~R$75 - plataforma ~10% - imposto ~12%).
  O front não se paga; métrica-mestre = R$ por venda do produto principal (back-end).
- `[CÁLCULO]` CPA máximo racional do ingresso = margem líquida do front + (taxa de ascensão x margem do back-end)
  - margem de segurança. Com R$58 de front, ascensão de 2% e margem de R$5.000 no back-end: 58 + 100 = R$158
  de CPA de equilíbrio do ciclo. Um teto de R$200 implica premissa de ascensão ~2,8% ou margem maior.
  **Recalcular o teto sempre que a taxa de ascensão do ciclo anterior for conhecida.**
- `[AUTOR: GoExplosion]` Pago aumenta comparecimento (> 50% contra 10-20%) e a conversão no principal, sem número.
- `[AUTOR: Pedro Sobral]` Ciclo de 8 etapas: planejamento, captação (7-30 dias), aquecimento (2-5% da verba),
  lembrete (2-5%), remarketing (~15%), vendas (carrinho 2-7 dias), entrega, entressafra (reinvestir parte do lucro
  em conteúdo). Na captação: se o CPA subir, escolher entre baixar o CPA desejado ou o ritmo diário.
  Otimizações: lances e orçamentos diários; públicos e anúncios a cada 2-3 dias; páginas a cada 5-7 dias; estrutura
  só se o resultado estiver muito ruim. Métricas principais da captação: CPA, leads/dia, gasto diário, conversão
  da página. Secundárias: CPM, CPC, CTR, acessos x cliques.
- `[AUTOR: Pedro Sobral]` Ajustes com campanha ativa: orçamento a cada 2 dias; públicos a cada 4; criativos a cada
  2-3; estrutura a cada 7.
- `[AUTOR: Ladeira, podcast #03 com Rafael Carpena]` Capítulos "Atribuição incremental no Meta Ads" e "O ROAS que
  parecia bom, mas não era". Conteúdo integral não transcrito; registra-se só o tema.
- `[CAMPO]` Baixar o preço do ingresso pode dobrar a conversão da página sem mexer no ROAS.
  Preço menor compra volume, não margem.

### 11.3 Referências BR sem fonte pública verificável

Rafael Kiso (mLabs), Tiago Tessmann (Conversão Extrema), Érico Rocha (Fórmula de Lançamento, origem Jeff Walker,
captura de e-mail antes da oferta), Ícaro de Carvalho (O Novo Mercado), Bruno Picinini (perpétuo com carta, VSL e
webinário), Natanael Oliveira. Buscas não retornaram regra operacional numérica atribuível a eles. O agente
**não deve citar posição deles** sem fonte nova.

### 11.4 Armadilhas

- Julgar ingresso por ROAS de e-commerce (4-8). O ingresso é custo de aquisição do back-end.
- Esquecer que o recebimento de cartão parcelado e o reembolso mexem no caixa do ciclo.
- Comprar volume de ingresso barato que não ascende: o CPA cai e o R$ por venda do produto principal piora junto.

---

## 12. Google e YouTube (secundário)

- `[META-OFICIAL equivalente: Google Ads Help]` Demand Gen: começar em Maximizar conversões; passar para tCPA/tROAS
  depois de **>= 50 conversões**; tROAS ~20% abaixo do ROAS dos últimos 30 dias, ajustando +-10%.
- `[Google Ads Help]` Mudar metas de lance **20% por vez** para evitar oscilação (contexto de campanha sem tráfego por
  meta baixa).
- `[Google, relatado por imprensa]` Teste de ajuste retroativo de custo em Demand Gen tCPA: pode ativar até 5 dias
  após o lançamento e durar até 3 semanas; não garantido.
- `[Google, material comercial]` Quem adota 3 de 4 boas práticas de YouTube (força de dados, volume de conversão etc.)
  teria +40% de conversões. Autodeclarado.
- `[VENDOR]` 7-14 dias sem mexer depois de mudar tCPA, orçamento ou conversão. Não confirmado pelo Google.
- `[AUTOR: Pedro Sobral]` Lançamento: Google em rede de pesquisa, YouTube em formato de ação; com pouca verba,
  só Meta. Lembrete em bumper de 6 s.
- `[CAMPO]` Tag do Google Ads (`AW-...`) sem rótulo de conversão não registra conversão; conferir o rótulo antes de subir.

---

## 13. Rotina e processos do sênior

### 13.1 Rotina diária (consolidada de Sobral, Trafius e praticantes)

| Horário | Tarefa | Saída |
|---|---|---|
| Manhã (dia anterior fechado) | Ler `/activities` do dia anterior e o status atual antes de qualquer decisão `[CAMPO]` | Sem decisão em cima de estado velho |
| Manhã | Varredura por anúncio, ontem e hoje separados: gasto, checkouts, custo por checkout, vendas, gasto sem venda `[CAMPO]` | Lista de pausa e de escala |
| Manhã | Escala do dia (um degrau por campanha), decidida pelo CPA marginal | Changelog |
| Tarde | Releitura de pausa (régua de gasto sem venda e de checkout) `[CAMPO]` | Pausas |
| Noite | Reconciliar pixel x rastreamento de vendas x plataforma de pagamento; marcar dia de live | Base limpa para o ranking |

Regra de ouro de praticante: **uma mudança por objeto por dia**, para que a leitura do dia seguinte tenha dono.

### 13.2 Rotina semanal

- `[AUTOR: Trafius]` Relatório semanal: resumo executivo (2-3 tópicos), KPIs contra a semana anterior, análise por
  funil (topo: CPM, CTR, custo por LPV; fundo: CPA, compras, ROAS), destaques com ação, 3-5 próximos passos.
  1-2 h fixas na segunda ou terça. Método: achar a maior variação, decompor nas métricas que a compõem, hipótese,
  ação.
- Revisão de criativos: matar o que fadigou, graduar o que provou, encomendar a próxima leva (briefing por persona e
  ângulo, não por demografia, CTC/Precis).
- Revisão de estrutura (no máximo 1x/semana, Sobral): consolidar campanhas abaixo de ~20 conversões/semana (CTC).
- Auditoria de similaridade criativa dos ativos (CTC, Precis).
- `[AUTOR: Foxwell]` Ele audita 20-30 contas/mês; reconhecimento de padrão entre contas é o valor do sênior.

### 13.3 Naming convention

Princípio `[CONSENSO]`: o nome deve permitir filtrar no Ads Manager e agregar em planilha sem abrir o objeto.
Separador fixo, campos fixos, data em formato ordenável.

Proposta:

```
Campanha:  {GESTOR} | {OFERTA} | {ESTRUTURA} | {PACK/TEMA} | {AAMMDD}
           ex.: GESTOR | EVENTO2 | CBO | PACK11 | 261014
Conjunto:  {PUBLICO} | {POSICIONAMENTO} | {OTIMIZACAO}
           ex.: ABERTO-BR-25-65 | ADV+ | PURCHASE
Anúncio:   nome do arquivo original do criativo [CAMPO]
           ex.: HOOK3_E3_V2.mp4
```

`[CAMPO]` Um prefixo fixo do gestor no nome define escopo (o que é seu na conta); nome do anúncio = nome do arquivo
original; um registro numerado de anúncios amarra criativo a campanha.

### 13.4 Changelog (registro de mudanças)

`[CONSENSO]` Sem registro, não há como separar efeito da mudança de ruído. Campos mínimos por linha:

| Campo | Exemplo |
|---|---|
| Data e hora | 2026-10-13 09:12 |
| Objeto (ID + nome) | {ID da campanha} / GESTOR EVENTO2 CBO |
| Mudança | Orçamento R$1.000 para R$1.250 (+25%) |
| Motivo (régua aplicada) | 2 dias no teto, checkout R$48 |
| Métrica de referência antes | CPA px R$162 (3d), 18 vendas rastreadas |
| Quem decidiu / quem executou | Gestor / agente |
| Leitura marcada para | 2026-10-14 15h |

A Meta mantém o histórico em `/activities`, mas sem motivo nem métrica de referência; o changelog é do gestor.

### 13.5 Cadência de teste de criativos

- Encomenda contínua, não por campanha (CTC: "pipeline semanal: brief, produção, teste, aposentadoria").
- Mix por leva: 60-70% iteração de vencedor, 30-40% conceito novo (Affect).
- Itere vencedor no meio da semana, sem esperar o ciclo mensal (Motion).
- Registro de hipótese por conceito: persona, ângulo, formato, resultado, motivo de morte.

### 13.6 Relatório para o dono

- `[CAMPO]` Tabela + nota que define a métrica e nomeia a fonte; sem bloco de "leitura"; recomendação única.
- `[AUTOR: Trafius]` 3-5 KPIs ligados ao objetivo do negócio, não 20.
- `[AUTOR: CTC]` Medir eficiência no nível da conta (aMER) e ROAS incremental, não ROAS de anúncio.
  `[AUTOR: Taylor Holiday/CTC]` Margem de contribuição e caixa acima de faturamento; CTC reporta receita, gasto e
  margem de contribuição contra a previsão (ex.: mar/2025, receita -0,79% do plano, margem +11,68%).

### 13.7 Checklist pré-subida (consolidado)

1. Escopo: conta certa, campanha com o prefixo do gestor `[CAMPO]`.
2. Objetivo Vendas, evento Purchase (não PageView, não AddToCart) (Motion).
3. Atribuição: 7d clique padrão; checar engage-through e visualização (Loomer).
4. Lance: Maior volume para teste (exigência da ferramenta de teste) (Meta via 2ª).
5. Advantage+ enhancements conferidos um a um; desligar o que altera a mensagem (Foxwell).
6. Público aberto; exclusões só com motivo (Tichenor contra excluir clientes).
7. Posicionamentos Advantage+ ligados (Loomer), com proporções corretas por posicionamento.
8. UTM e parâmetros de checkout corretos; parâmetros do checkout conferidos com uma compra de teste `[CAMPO]`.
9. Pixel + CAPI disparando Purchase e InitiateCheckout com `event_id` igual (dedup).
10. Ortografia: anúncio com erro **não sobe** `[CAMPO]`.
11. Criativo distinto dos ativos (2 de 3 dimensões) (Affect/CTC).
12. Nome do anúncio = arquivo; registro numerado atualizado `[CAMPO]`.
13. Sobe **PAUSADO**; quem liga é o dono da conta `[CAMPO]`.
14. Changelog preenchido com leitura marcada.

---

## 14. Quem é quem

| Autor | País | Tese central | Concorda com | Discorda de |
|---|---|---|---|---|
| Meta (engineering, Help Center, Performance 5) | EUA | Simplificar, automatizar (Advantage+), diversificar criativo, CAPI, validar com lift | Loomer, Foxwell, CTC | Praticantes que pedem controle (Hott, Faris) |
| Jon Loomer | EUA | Padrões da Meta servem para a maioria; poucos conjuntos; muitos anúncios distintos; cuidado com a janela de visualização | Meta, Foxwell | Tichenor (volume por conjunto); vendors do "20%" (Meta não publica %) |
| Andrew Foxwell | EUA | O comprador virou estrategista criativo; 1 CBO, persona no criativo; conferir enhancements | Loomer, Kiel, Ploch | Volume pelo volume ("volume trap") |
| Phil Kiel / Brad Ploch (Scalability School) | EUA | CBO-first: o anúncio conquista verba; conjunto = pasta | Foxwell | Teste ABO com gasto forçado |
| Charley Tichenor | EUA | Controle + teste de variável contra controle; 3:2:2 (revisado pós-Andromeda); 5-6 conceitos complementares | CTC na diversidade de conceito | Loomer (50 anúncios); quem exclui clientes |
| Taylor Holiday / Andrew Faris (CTC) | EUA | Margem de contribuição e caixa acima de ROAS de plataforma; "a Meta não sabe o resultado que você quer"; aMER/iROAS | Hott (desconfiar da atribuição) | Leitura de ROAS por anúncio |
| Common Thread Collective (blog) | EUA | Andromeda expôs pipeline criativo fraco; 20+ anúncios novos/mês; similaridade < 40% | Loomer, Motion | Shackelford (mais anúncios piora) |
| Motion (creative analytics) | EUA | Hook/hold como diagnóstico; Entity ID; Explore, Exploit, Amplify; 15-20 anúncios por conjunto | CTC | Tichenor (volume) |
| Barry Hott | EUA | "Ugly ads": relevância e autenticidade > polimento; ~20 compras para julgar; benchmark = seus melhores anúncios | Faris (controle) | Benchmarks de CPM/CTR; bid cap como padrão |
| Savannah Sanchez | EUA | Hook é a variável mais importante; isolar os 2-3 s iniciais; visual distinto nos 3-5 s | Motion | Opascope (teste só de hook morreu) |
| Nick Shackelford | EUA | Testar mais anúncios muitas vezes piora; problema costuma ser de modelo de negócio | Tichenor, Precis | CTC (volume) |
| Ben Heath | Reino Unido | Consolidação (1-2 conjuntos); fadiga é do hook | Loomer | Pouca fonte primária indexada |
| Depesh Mandalia | Reino Unido | BPM: marca + performance; sistema de teste/otimização/escala para CBO | CBO-first | Regras numéricas não públicas |
| Pedro Sobral | Brasil | Escala vertical ("horizontal é rastejar"); 20 anúncios na largada; cadência fixa de ajuste; ciclo de 8 etapas de lançamento | Consenso do 20% | Estêvão Soares (vertical nem sempre); material de teste antigo usa interesse + lookalike |
| Estêvão Soares | Brasil | Escolha vertical x horizontal depende de estrutura, verba e CPA; horizontal pede 50x CPA em 7 dias | Sourei (diagonal) | Sobral (vertical sempre) |
| Sourei / Trafius / HeroSpark | Brasil | Guias com régua numérica (20-30% a cada 2-3 dias; CPA máx = ticket/ROAS; relatório semanal) | Consenso | Sem metodologia publicada |
| Leandro Ladeira | Brasil | (tema) atribuição incremental; ROAS enganoso | CTC (desconfiar do ROAS) | Sem regra numérica pública |
| Kiso, Tessmann, Érico, Ícaro, Picinini, Natanael | Brasil | Sem fonte pública verificável de regra operacional | — | — |

---

## 15. Mapa de divergências (para o agente decidir com consciência)

| Questão | Posições | Como o agente decide (com régua própria) |
|---|---|---|
| Quantos anúncios por conjunto | 3-6 (Meta antiga, Tichenor) x 15-20 (Motion) x até 50 (Loomer) | Dado local: 1 anúncio vende melhor (viés). Testar 4-8 distintos por conjunto antes de generalizar |
| Teste em CBO ou ABO | Kiel/Foxwell x Motion/Sobral/Hott | Conta é CBO. Usar a ferramenta de teste de criativo dentro do conjunto, ou campanha CBO de teste com verba pequena e prazo fixo |
| Limite do degrau de escala | 20% (consenso) x 20-30% (Sourei) x 20-40% (campo) | +20-40%/dia, nunca > 40% |
| Corte | 3x CPA (mercado) x 1,15x CPA + checkout (conta) | Conta vence; perguntar antes de cortar campeão de volume |
| Duplicar vencedor | Sobral contra; vendors a favor com público novo | Conta: escalar no lugar; cópia só com post ID preservado e como teste declarado |
| Frequência | "Não existe número" (Loomer) x 2,5/3-4 (vendors) | Usar custo por checkout e CPA marginal; frequência só como suspeita |
| Janela de visualização | Manter para compra (Loomer) x desconfiar (Hott) | Manter padrão; decidir pela venda rastreada/plataforma de pagamento, nunca pelo pixel cru |
| Hook rate prevê venda? | Motion: sinal primário x conta: não previu | Usar para consertar criativo, não para escolher |

---

## 16. Playbook do sênior (45 regras)

Etiqueta entre colchetes = força da regra. Onde a sua conta tiver régua própria medida, ela prevalece.

### Estrutura

1. Consolidar: cada conjunto ativo deve ter caminho para ~50 compras/semana; com CPA R$175 isso é ~R$1.250/dia por
   conjunto. Conjunto que não chega nem a 20/semana é candidato a fusão. [META-VIA-2ª + CTC + CÁLCULO]
2. Público aberto (país, idade larga) por padrão; o criativo segmenta. Interesse só com hipótese escrita. [CONSENSO]
3. Não separar conjunto por formato (vídeo x estático). [Motion]
4. Otimizar sempre em Purchase; nunca em evento de topo quando o objetivo é venda. [Motion]
5. Conferir um a um os enhancements de Advantage+ creative antes de publicar. [Foxwell]
6. Remarketing separado só se houver motivo provado; o breakdown effect torna o CPA médio dele enganoso. [Loomer]

### Criativo e teste

7. Unidade de teste é o conceito (persona + ângulo + formato). Variação de cor, legenda ou fundo não conta como criativo
   novo. [CONSENSO]
8. Conceito novo difere do ativo em pelo menos 2 de 3: mensagem, tratamento visual, formato; visual muda nos 3-5 s
   iniciais. [Affect + Sanchez]
9. Volume mínimo em lançamento de alto volume: 8-15 conceitos novos por semana (vencedor dura 3-5 dias; ~20 vencedores simultâneos para
   120 vendas/dia). [CAMPO + CÁLCULO]
10. Mix de cada leva: 60-70% iteração do vencedor (novo hook, novo locutor, novo corte), 30-40% conceito novo. [Affect]
11. Fadiga do vencedor: primeiro trocar o hook mantendo o corpo; só depois aposentar o conceito. [Ben Heath]
12. Lance de teste = Maior volume, orçamento diário. Nada de cost cap em teste. [META-VIA-2ª]
13. Não coroar vencedor com menos de ~20 vendas por braço (erro do CPA ±44% com 20). Com 3-5 vendas, só matar o
    claramente ruim. [CÁLCULO + Hott]
14. Todo teste A/B tem cláusula de congelamento: peso fixo, zero realocação, gatilho único de aborto escrito. [CAMPO]
15. Ranking de criativo exclui dia de live e se faz pela venda rastreada (UTM/sck conferido), não pelo pixel cru. [CAMPO]
16. Registrar cada conceito morto com o motivo (hipótese que falhou). O arquivo de mortos vale tanto quanto o de vencedores. [Affect + CTC]

### Kill (corte)

17. Régua própria primeiro (exemplo com teto R$200): CPA > R$200, gasto > R$230 sem venda, custo por checkout > R$60, ~R$145 com 1 checkout =
    pausa sem perguntar. [CAMPO]
18. Campeão de volume com CPA dentro do teto que bate em régua de pausa: avisar e não pausar. [CAMPO]
19. Corte imediato sem esperar amostra: entrega zero em 24-48 h, CTR link < 1/4 da média da conta, reprovação. [Flighted]
20. CPA alto no dia 1-2 de anúncio novo, com checkouts acontecendo, não é corte; é aprendizado. [Flighted + CAMPO]
21. Nunca pausar um anúncio de volume só porque o CPA médio dele é maior que o de um anúncio de gasto pequeno no mesmo
    conjunto (efeito breakdown). Comparar o total do conjunto com e sem. [Loomer]
22. Janelas combinadas: bom em 3d e ruim hoje = baixar 20-50%; ruim em 3d e ruim hoje = pausa; ruim em 3d e bom hoje =
    manter e reler amanhã. [CAMPO]

### Scale (escala)

23. Escala se decide pelo CPA marginal de ads, nunca pelo blended nem pelo médio. Marginal = delta gasto / delta vendas,
    janelas iguais, sem dia de live. [CAMPO + CÁLCULO]
24. Degrau de +20-40%/dia com CPA <= teto; um degrau por campanha por dia; nunca > 40% (saltos maiores tendem a
    piorar o CPA). [CAMPO]
25. Escalar só com: conjunto fora do aprendizado, 2 dias seguidos dentro do teto, checkout dentro da régua, e criativo de
    reserva pronto. [HeroSpark + CAMPO]
26. Escalar no lugar (vertical na campanha original) antes de duplicar; cópia do vencedor regride à média. [Sobral + CAMPO]
27. Se duplicar, preservar o post ID (prova social) e tratar a cópia como teste declarado com prazo. [VENDOR]
28. O teto é do criativo, não da campanha: ao passar de R$600-800/dia num criativo, o volume novo vem de criativo novo. [CAMPO]
29. Não escalar e subir criativo novo no mesmo objeto no mesmo dia. Uma mudança, uma leitura. [CONSENSO]
30. Cost cap só em campanha de escala com CPA estável, 10-20% abaixo do teto, migrando por duplicação e redução gradual
    (troca direta derruba gasto 25-40%). [Loomer + VENDOR]

### Diagnóstico

31. Ler o funil na ordem: CPM, CTR link, CPC link, clique para LPV, LPV para checkout, checkout para compra, compra para
    caixa. Mexer só no elo que quebrou. [CONSENSO]
32. CPC é consequência (CPM / CTR), nunca causa. [CÁLCULO]
33. Custo por checkout iniciado costuma ser o antecedente-mestre em lançamento pago; hook, CTR, CPC e CPM servem para
    consertar criativo, não para escolher. [CAMPO]
34. CTR alto + conversão baixa = desalinhamento anúncio/página/público, não "criativo bom". [Motion]
35. Checkout para compra fora de 5-12% (carrinho de lançamento) = olhar Pix, recusa de cartão, campos, bump. [Sobral]
36. Variação > 50% de um dia para o outro é SUSPEITA até segunda leitura na fonte. [CAMPO]
37. Toda métrica de CPA vem com o número de vendas ao lado e o intervalo (±1,96/√k). [CÁLCULO]

### Mensuração

38. Purchase e InitiateCheckout com pixel + CAPI, mesmo `event_id`; EMQ >= 6 como piso, mirar 7-8. [CONSENSO, limiar de praticante]
39. Atribuição padrão 7d clique / 1d engajamento / 1d visualização; desde mar/2026 clique = só clique no link. Decidir
    pela venda rastreada/plataforma de pagamento, e usar o pixel só para padrão relativo entre criativos. [Loomer + CAMPO]
40. Razão pixel/caixa fora do padrão histórico em dia sem live = investigar rastreio antes de decidir verba. [CAMPO]

### Economia de lançamento

41. Teto de CPA do ingresso = margem líquida do front + (ascensão x margem do back-end) - segurança. Recalcular a cada
    ciclo com a ascensão real. [CÁLCULO]
42. Ingresso não se julga por ROAS de e-commerce; a métrica-mestre é R$ por venda do produto principal. [CAMPO]

### Rotina

43. Manhã: ler `/activities` e status atual antes de recomendar; varredura por anúncio, ontem e hoje separados; escala
    do dia. Tarde: releitura de pausa. Noite: reconciliação pixel x rastreamento de vendas x plataforma de pagamento. [CAMPO]
44. Toda mudança entra no changelog com motivo, métrica de referência e hora de releitura. [CONSENSO]
45. Semanal: consolidar campanhas abaixo de ~20 vendas/semana, auditar similaridade criativa, encomendar a leva seguinte
    por persona e ângulo, relatório em tabela com 3-5 KPIs e uma recomendação. [CTC + Trafius + CAMPO]

---

## 17. Fontes

### Oficiais (Meta, Google)

1. Meta Engineering, "Meta Andromeda: Advantage+ automation's next-gen personalized ads retrieval engine" (dez/2024):
   https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/
2. Meta for Developers, "Advantage+ campaign experience for sales and app" (jun/2025):
   https://developers.facebook.com/blog/post/2025/06/03/advantage-plus-campaign-experience-for-sales-and-app/
3. Meta for Developers, Advantage+ Shopping Campaigns (Marketing API, dez/2025):
   https://developers.facebook.com/documentation/ads-commerce/marketing-api/advantage-shopping-campaigns
4. Meta Business Help Center, "Sobre a fase de aprendizado" (não renderizou na coleta; regras via fontes 9, 25, 26):
   https://www.facebook.com/business/help/112167992830700
5. Google Ads Help, Demand Gen FAQ: https://support.google.com/google-ads/answer/14509385
6. Google Ads Help, Demand Gen com tráfego baixo e metas de lance: https://support.google.com/google-ads/answer/14718747
7. Google Business, boas práticas de Demand Gen:
   https://business.google.com/ca-en/accelerate/resources/articles/best-practices-for-high-performing-demand-gen-campaigns/

### Internacionais (praticantes)

8. Jon Loomer, "Meta Andromeda": https://www.jonloomer.com/meta-andromeda/
9. Jon Loomer, "How Meta Ads Attribution Works in 2026": https://www.jonloomer.com/meta-ads-attribution-2026/
10. Jon Loomer, "Bid strategies best practices": https://www.jonloomer.com/bid-strategies-best-practices-for-meta-advertising/
11. Jon Loomer, "Breakdown effect": https://www.jonloomer.com/breakdown-effect/
12. Jon Loomer, "Creative testing": https://www.jonloomer.com/creative-testing-meta-advertising/
13. Jon Loomer, "Creative fatigue": https://www.jonloomer.com/creative-fatigue-meta-ads/
14. Jon Loomer, "Active ad sets per campaign": https://www.jonloomer.com/active-ad-sets-meta-ads-campaign/
15. Jon Loomer, "Advantage+ Sales replaces Advantage+ Shopping" e "No more existing customer budget cap":
    https://www.jonloomer.com/qvt/advantage-sales-replaces-advantage-shopping/ ·
    https://www.jonloomer.com/qvt/no-more-existing-customer-budget-cap/
16. Jon Loomer, flexible ad format: https://www.jonloomer.com/how-i-use-flexible-ad-format/ ·
    https://www.jonloomer.com/qvt/3-problems-with-flexible-format/
17. Common Thread Collective, "Meta Andromeda, ROAS e estratégia criativa 2026":
    https://commonthreadco.com/blogs/coachs-corner/meta-andromeda-roas-creative-strategy-2026
18. Common Thread Collective, "What drove March?" (margem de contribuição x plano):
    https://commonthreadco.com/blogs/coachs-corner/march-lessons-from-ecommerce-growth-strategy
19. CTC, "Based or Bullsh*t with Andrew Faris": https://commonthreadco.com/blogs/taylor-reacts/based-or-bull-with-andrew-faris
20. Motion, "Key creative performance metrics": https://motionapp.com/blog/key-creative-performance-metrics
21. Motion, "Andromeda 2.0 explained" (palestra, jul/2026):
    https://motionapp.com/library/talk/andromeda-2-0-explained-how-meta-s-algorithm-actually-picks-your-winning-ads/
22. Motion, perfil Savannah Sanchez: https://motionapp.com/library/expert/savannah-sanchez/
23. Practical Ecommerce, entrevista Barry Hott: https://www.practicalecommerce.com/ugly-ads-perform-best-marketer-says
24. The Marketing Factor, entrevista Andrew Foxwell:
    https://themarketingfactor.beehiiv.com/p/what-actually-moves-the-needle-on-meta-right-now
25. Scalability School (Foxwell, Kiel, Ploch), "How To Test Creative on Meta In 2026" (fev/2026):
    https://podcastaddict.com/episode/https%3A%2F%2Ftraffic.libsyn.com%2Fsecure%2Fcedc0a7b-1a31-4213-91cd-d7047c8c8294%2FHow_To_Test_Creative_on_Meta_In_2026.mp3%3Fdest-id%3D5024810&podcastId=6673851
26. Growth Collective, "What Meta told us about Andromeda": https://growthcollective.beehiiv.com/p/what-meta-told-us-about-andromeda
27. Precis, "Meta Andromeda and creative strategy: what changed and what didn't":
    https://www.precis.com/resources/meta-andromeda-and-creative-strategy-what-actually-changed-and-what-didnt
28. Aimerce, Charley Tichenor sobre Andromeda: https://aimerce.ai/topics/charley-t-meta-andromeda-breakdown-47
29. Pencil Weekly Sharpener (Tichenor, 3:2:2): https://pencilai.beehiiv.com/p/weekly-sharpener-111
30. Flighted, "How to know when to pause a Meta ad": https://www.flighted.co/blog/how-to-know-when-to-pause-a-meta-ad
31. Affect Group, teste de criativos em 2026:
    https://affectgroup.com/blog/how-to-test-creatives-in-meta-ads-in-2026-a-working-system-in-the-era-of-advantage-and-andromeda/
32. Search Engine Journal, avaliação de criativo e ferramenta de teste:
    https://www.searchenginejournal.com/how-to-evaluate-creative-performance-in-meta-ads/558741/
33. Foundr/Audible, Nick Shackelford (workshop e podcast "$76M in 3 Years"): https://foundr.com/pages/fom-workshop
34. 2X eCommerce, Depesh Mandalia (BPM): https://2xecommerce.transistor.fm/episodes/s05-ep26-brand-driven-performance-marketing-bpm-with-facebook-advertising
35. Within, "Marginal metrics: why you've got CPAs wrong": https://www.within.co/blog/marginal-metrics-why-youve-got-cpas-wrong/
36. Adweek (parceiro Meta), Performance 5: https://www.adweek.com/partner-articles/5-ways-to-optimiz
37. Fontes de fadiga/status (2x): https://www.tryatria.com/blog/meta-creative-fatigue-diagnose-and-fix-2026
38. Deduplicação/EMQ: https://datanostro.com/en/docs/learn/meta-capi-deduplication/ ·
    https://customerlabs.com/blog/improve-your-event-match-quality-from-ok-to-great/

### Brasil

39. Pedro Sobral, "Como fazer tráfego para lançamento":
    https://pedrosobral.com.br/blog/c/trafego-para-lancamentos/como-fazer-trafego-para-lancamento
40. Pedro Sobral, "Como fazer testes no tráfego pago":
    https://pedrosobral.com.br/blog/c/estrategias-de-trafego-pago/como-fazer-testes-no-trafego-pago-e-melhorar-seus-resultados
41. Pedro Sobral, material "Semana dos Anúncios" (aula 2): https://sobralmidias.s3.amazonaws.com/Semana+dos+Anuncios+-+02.pdf
42. Estêvão Soares, "#83 Escala vertical vs horizontal": https://newsletter.estevaosoares.com/p/meta-ads-escala-vertical-horizontal
43. Sourei, "Escala horizontal ou vertical: guia 2026": https://sourei.com.br/blog/midia-performance/escala-horizontal-ou-vertical
44. HeroSpark, "Tráfego pago para infoprodutos": https://herospark.com/guias/trafego-pago
45. Trafius, "Benchmark de CPM no Brasil 2026 por nicho": https://trafius.com.br/blog/benchmark-de-cpm-no-brasil-em-2026-por-nicho
46. Trafius, "Relatório semanal de tráfego pago": https://trafius.com.br/blog/relatorio-semanal-de-trafego-pago-template-pratico
47. GoExplosion, "O que é um lançamento pago" (set/2026): https://blog.goexplosion.com/2026/09/22/lancamento-pago/
48. Podcast do Ladeira #03 (Rafael Carpena): https://podcastaddict.com/podcast/podcast-do-ladeira/6148120
49. adlibrary, "Meta Ads Brazil playbook 2026": https://adlibrary.com/posts/meta-ads-brazil-playbook-2026
50. Hotmart, venda de ingressos: https://hotmart.com/pt-br/blog/vender-ingressos

