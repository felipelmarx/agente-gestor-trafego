# Agente gestor de tráfego

Um agente de IA que decide o que pausar, o que manter, o que escalar e o que testar no
Meta Ads, com número, janela e fonte. Na primeira conversa ele conhece o seu negócio
(conteúdo, nicho, público, oferta e números) e usa isso em toda otimização.

## Baixar

Clique em **Code → Download ZIP** no topo desta página e descompacte. Você vai ter:

```
gestor-trafego/
├── SKILL.md                     o agente
├── references/                  base de conhecimento (estatística, Meta Ads, funis)
│   ├── estatistica-decisao.md
│   ├── gestao-trafego-senior.md
│   └── funis-economia-cro.md
└── scripts/                     calculadoras (só no Claude Code)
    ├── decisao.mjs
    └── stats.mjs
```

## Jeito mais fácil: peça para o Claude instalar

No **Claude Code**, cole esta mensagem e aperte Enter:

```
Instale para mim o agente gestor de tráfego deste repositório: https://github.com/felipelmarx/agente-gestor-trafego
1. Baixe o repositório (git clone, ou o ZIP https://github.com/felipelmarx/agente-gestor-trafego/archive/refs/heads/main.zip).
2. Copie a pasta "gestor-trafego" para ~/.claude/skills/gestor-trafego (no Windows, C:\Users\MEU-USUÁRIO\.claude\skills\gestor-trafego). Crie as pastas se não existirem; substitua versão antiga.
3. Confira se o Node.js está instalado (node -v). Se não estiver, me explique como instalar.
4. Teste: node ~/.claude/skills/gestor-trafego/scripts/decisao.mjs
5. Apague a pasta temporária do download e me confirme o que foi instalado e onde.
```

Depois feche e abra o Claude Code e digite `/gestor-trafego`.

Manual completo com passo a passo: https://mentoria-trafego-respiracao-delta.vercel.app/agente.html

## Instalar manualmente

### Claude (claude.ai, site ou app)
1. Abra **Projetos** → **Criar projeto**, com o nome do seu produto.
2. Em **Instruções do projeto**, cole o conteúdo de `gestor-trafego/SKILL.md`.
3. Em **Conhecimento do projeto**, envie os três arquivos da pasta `references/`.
4. Abra uma conversa no projeto e escreva: *"Oi, quero começar."*

### ChatGPT
1. Crie um **Projeto** com o nome do seu produto.
2. Nas **Instruções**, cole o conteúdo de `SKILL.md`. Se não couber, envie o `SKILL.md` em
   Arquivos e escreva nas instruções: *"Siga o arquivo SKILL.md em todas as conversas."*
3. Envie os três arquivos de `references/` em **Arquivos**.
4. Comece com *"Oi, quero começar."*

### Claude Code
1. Copie a pasta `gestor-trafego/` inteira para `~/.claude/skills/` (vale para todos os
   projetos) ou para `.claude/skills/` dentro da pasta do seu projeto.
2. Para as calculadoras, tenha o [Node.js](https://nodejs.org) instalado.
3. Abra o Claude Code e digite `/gestor-trafego`.

## A primeira conversa

Antes de olhar qualquer número, o agente faz seis blocos de perguntas, um de cada vez:

1. Você e o seu conteúdo
2. Nicho e público
3. Produto e oferta
4. Funil
5. Números (ticket líquido, CPA-alvo e máximo, verba, histórico)
6. Conta e limites

No fim ele entrega o **Perfil do negócio**. Salve como `perfil-do-negocio.md` nos arquivos
do projeto (no Claude Code ele grava sozinho). A partir daí, toda conversa nova começa
sabendo quem você é. Quando preço, oferta ou meta mudarem, peça para ele atualizar.

## No dia a dia

| Quando | O que enviar |
|---|---|
| Otimização da manhã | Por anúncio, últimos 3 dias: gasto, impressões, hook, CTR, checkouts e vendas da plataforma |
| Escala | CPA de 3 dias, vendas, frequência e verba atual do vencedor |
| CPA subiu | O funil inteiro do período e do período anterior |
| Próximo lote | Anúncios que venceram e que perderam, com ângulo, formato e números |

O agente sugere; quem decide e quem clica é você. Nunca envie senha, token de acesso,
dado de cartão ou dado pessoal de comprador.
