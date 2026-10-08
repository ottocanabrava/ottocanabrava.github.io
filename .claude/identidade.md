# Identidade do portfólio

Referência de trabalho para criar ou atualizar páginas. A fonte é a Home
(`index.html`): quando este texto e a Home divergirem, a Home vale e este texto
deve ser corrigido.

> As páginas de case (`extrator-de-fatura/`, `daily-ops-dashboard/`,
> `motor-triagem/`, `ticketscript/`, `formpilot/`, `documentos-verificaveis/`)
> ainda usam a identidade anterior (DM Sans, fundo `#ECEEF2`, nav escura, um
> acento por case). Não copie estilos delas para páginas novas.

## Ideia central: o fio

Tese da Home: *Transformo fluxos complexos em sistemas simples.* Tudo sai de
uma linha só:

| Forma do fio | Significa |
|---|---|
| emaranhado | trabalho manual |
| esticado | sistema |
| tenso (realçado) | relação entre duas coisas |
| ponto | conclusão, resultado |

Regras:

- **Um fio só existe se representa uma relação ou transformação real**, que o
  case ou o projeto comprova: um dado que alimenta um sistema, uma linha que vira
  documento, uma etapa que leva à seguinte. Na dúvida, sem fio.
- O fio nunca é decoração, moldura, divisória ou fundo.
- **Vermelhão (`--fire`) só no instante em que algo acontece**: o ponto final de
  uma transformação, o campo que acabou de ser preenchido, o item em foco.
  Nunca como cor de marca, de botão ou de título.
- Pontos pretos marcam etapas; o ponto vermelho, a conclusão. Ponto vazado e
  fio tracejado = relação que não é sequência (ex.: "em paralelo" no Sobre).
- Mapa da Home: só relações entrada → sistema comprovadas pelos cases (lista em
  `REL`, no script da Home). Não acrescente relação sem prova no case.

## Narrativa: causa → operação → transformação → resultado

Cada capítulo da Home conta a mesma sequência:

1. **Causa**: o trabalho manual de antes (portal a portal, planilha em outra aba).
2. **Operação**: a interface do sistema, em escala de uso, fazendo o trabalho.
3. **Transformação**: o fio mostra o dado indo de um lugar a outro.
4. **Resultado**: um número ou estado final grande, em texto, e o link
   "Explore o sistema →".

Estrutura de um capítulo (`section.scn`): `.ttl` (índice `01` + nome grande) →
`.sf` (a interface) → `.band` (três legendas curtas, uma por fase) → `.res`
(resultado + `.go`).

Números: só os que o case já publica, com a mesma redação. Hoje: `2–4h / mês`,
`30–60 min → verificação direta`, `10–20 min → ~2 min`, `5 tipos de documento`,
`1 clique`. Daily Ops não tem número. Nada de número novo, arredondado ou
"estimado".

## Tipografia e hierarquia

- **Geist** (400, 500, 600) para tudo; **Geist Mono** (400) só para índices,
  anos, IDs, nomes de coluna e listas de ferramentas.
- Títulos com peso 500 e tracking negativo forte; quanto maior, mais apertado.

| Papel | Tamanho | Tracking / entrelinha |
|---|---|---|
| nome do capítulo (`.ttl h2`) | `clamp(3rem, 9vw, 9rem)` | `-.055em` / `.92` |
| resultado (`.res b`) | `clamp(3rem, 10vw, 10rem)` (longo: `clamp(2.5rem, 6.6vw, 6.5rem)`) | `-.06em` / `.92` |
| frase de seção (Sobre, Contato) | `clamp(2.25rem, 5.6vw, 5.5rem)` | `-.05em` / `1` |
| frase da abertura | `clamp(1.75rem, 3.4vw, 3.25rem)` | `-.04em` / `1.04` |
| item de lista (método, sistemas) | `clamp(1.25rem, 2.3vw, 2.125rem)` | `-.035em` / `1.05` |
| texto de apoio | `clamp(1rem, 1.5vw, 1.375rem)`, cor `--ink-2` ou `--ink-3` | `1.4–1.5` |
| rótulo de seção / índice | `.875rem`, cor `--ink-3`, peso 400 | |
| mono (anos, ferramentas) | `.75rem` (celular `.8125rem` onde é texto de leitura) | `1.6` |

- Uma ideia por tela. Frases curtas; `max-width` em `ch` (14–24ch para frases
  grandes, 36–48ch para apoio).
- Hierarquia por tamanho e cor (`--ink` → `--ink-2` → `--ink-3`), não por caixa
  alta, negrito pesado, ícone ou cor de destaque.

## Cores e tokens

```css
:root{
  --bg:#F7F7F5; --ink:#0E0F12; --ink-2:#4A4D55; --ink-3:#8A8D95; --ink-4:#C4C6CB; --line:#E2E3E0;
  --fire:#E5482A;
  --ease:cubic-bezier(.22,.61,.36,1);
  color-scheme:light dark;
}
@media (prefers-color-scheme: dark){
  :root{ --bg:#0C0D0F; --ink:#EDEDEA; --ink-2:#B4B6BB; --ink-3:#7C7F87; --ink-4:#3A3C42; --line:#1E2024; --fire:#F2583A; }
}
```

- A página é neutra; a única cor é `--fire`.
- **Superfície de produto** (`.sf`): cartão branco que representa a interface
  real, com tokens próprios que **não mudam no modo escuro**, porque é a tela do
  sistema:
  `--u-ink:#111318; --u-2:#4B4F58; --u-3:#8C9099; --u-line:#E6E7EA; --u-soft:#F4F5F6`,
  `border-radius:20px` (16px no celular), sombra
  `0 0 0 1px rgba(14,15,18,.06), 0 40px 100px -50px rgba(14,15,18,.3)`.
  Destaque de linha recém-lida: fundo `#FFF1E8`.
- Modo escuro: só pelos tokens. Não criar regra escura nova sem pedido explícito.

## Espaçamento e composição

- Margem lateral do texto: `clamp(20px, 6vw, 96px)`. Superfície de produto:
  `clamp(12px, 2.4vw, 40px)` (10px no celular).
- Seções respiram: `clamp(96px, 14vh, 160px)` a `clamp(120px, 18vh, 200px)` de
  padding vertical. Entre blocos de uma mesma seção, `clamp(88px, 12vh, 140px)`.
- Texto alinhado à esquerda; nada de colunas centralizadas, cards em grade ou
  ícones. Listas são linhas com ponto e fio, ou texto corrido.
- Nav fixa de 64px, transparente, só texto: nome à esquerda; Sistemas, Sobre e
  Contato à direita.

## Animação

GSAP 3.12.5 (+ ScrollTrigger) via cdnjs. O padrão atual:

- **A cena toca sozinha quando entra na tela**, uma vez, e para no **estado
  final estável**. Não depende de scroll nem de hover para contar a história.
  Helper `onEnter(alvo, INÍCIO, FIM, duração, render)` na Home: começa quando
  55% do alvo está visível; volta ao início só quando o alvo sai inteiro da tela.
- **A abertura da Home** toca ao carregar (1,6 s de espera, ~10 s), uma vez por
  visita. `/#projetos` e o link "Sistemas" pulam direto para o mapa pronto.
- Nada fixo na tela durante o scroll (sem *pin*). ScrollTrigger hoje só desenha
  a linha do Contato.
- Sem loop infinito. Sem animação que não mostre uma transformação real.
- Cada cena é uma função `render(p)` de um progresso `p` de 0 a 1, para ficar
  determinística e testável.
- Hover é extra: tensiona fios e realça relações, mas nada essencial fica só
  no hover (no celular ele não existe).
- Elementos pequenos (Sobre): transição CSS disparada por
  IntersectionObserver, que adiciona a classe `.on` uma vez.

### Movimento reduzido

`prefers-reduced-motion: reduce`, ou GSAP indisponível, ativa
`html.static`: toda cena aparece **no estado final**, parada e legível, sem
nada fixo na tela. O estado final precisa contar a história sozinho (ex.:
Documentos mostra planilha → documento → QR → validação numa composição só).
Sem JS (sem `html.js`), o conteúdo aparece pronto.

## Celular (≤ 760px)

- A mesma cena, em coluna; não uma versão resumida. Fios horizontais viram
  verticais.
- A superfície de produto ganha altura fixa (≈520–600px) e esconde colunas
  secundárias da interface em vez de encolher a fonte abaixo de ~12.5px.
- Texto de leitura no mínimo 15–16px. Nada de rolagem horizontal na página.

## Home × página de demonstração

| | Home | Demo |
|---|---|---|
| Papel | narrativa: por que e o que muda | o sistema funcionando |
| Ritmo | toca sozinha, uma ideia por tela | o visitante opera; cada ação tem resposta |
| Escala | interface grande, quase tela cheia | interface em tamanho de uso |
| Texto | frases curtas, resultado grande | o que a própria tela mostraria, e notas curtas onde a regra não é visível |
| Fio | transformação entre etapas | só para ligar a ação à consequência (linha → PDF, QR → validação) |

Uma demo compartilha tokens, tipografia, superfície de produto e regras do fio,
mas não repete título gigante, faixas de legenda ou números de resultado da
Home. Deve mostrar telas do próprio sistema (ou reproduções fiéis), com dados
fictícios declarados como tal.

## O que evitar

- Estética de dashboard genérico: grade de cards, KPIs coloridos, gráficos de
  enfeite, badges, ícones decorativos, gradiente, glassmorphism.
- Fio, ponto ou linha sem relação real por trás.
- Vermelhão como cor de marca, botão ou destaque permanente.
- Uma cor de acento por página.
- Texto explicando o que a interface já mostra.
- Fatos, números, tecnologias, cargos ou resultados que não estejam no case ou
  no repositório do projeto.
- Mexer no modo escuro sem pedido explícito.

## Padrões reutilizáveis

Já existem na Home e funcionam; reaproveite copiando (não há CSS compartilhado,
e não crie um antes de a segunda página precisar dele):

- bloco `:root` de tokens (claro + escuro) e a fonte Geist;
- `.sf` + tokens `--u-*` (superfície de produto) e `.mono`;
- `.th` (SVG sobreposto à interface para desenhar o fio entre elementos) e as
  funções `bez()`, `partial()` e `resample()`;
- `onEnter()` + `render(p)` para cenas que tocam ao entrar na tela;
- o esquema `html.static` para movimento reduzido;
- `.ab-m` / `.ab-t` (fio com pontos em linha, vertical no celular) para
  sequências curtas;
- `.end-row` (fio que termina num ponto) para a chamada final;
- `.go` ("Explore o sistema →") para links de saída.

## Fatos e fontes

- Fonte de verdade de cada projeto: a página do case e, quando houver, o
  repositório do projeto (ex.: `ottocanabrava/verifiable-documents` para
  Documentos Verificáveis). Se discordarem, o repositório atual vale e o
  conflito deve ser sinalizado.
- Dados de exemplo são sempre fictícios e declarados como tal.

## Como testar

Site estático: abra `index.html` servido na raiz. Testes com Playwright
(Chromium já instalado): desktop 1440×900, celular 390×844, modo escuro
(`colorScheme:'dark'`) e `reducedMotion:'reduce'`. Confira: sem erro no
console, `scrollWidth` igual à largura da janela, cenas no estado final depois
de tocar, e o estado estático legível.
