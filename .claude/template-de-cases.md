# Template de cases

Documentos Verificáveis (`documentos-verificaveis/index.html`) é a referência
oficial dos cases. O topo, o fechamento e a base visual dele foram **extraídos**
para arquivos compartilhados, sem alteração de valores. Os outros cases devem
ligar esses arquivos, e não recriar os componentes.

Documentos Verificáveis é a referência visual aprovada para o **topo** e o
**fechamento**. O template compartilhado (`_template/case.html` e
`assets/case/`) é a fonte de verdade para novos cases. A navegação entre
projetos ainda **não** faz parte do padrão (ver abaixo).

Todo trabalho em cases segue o fluxo obrigatório de
[`CLAUDE.md`](CLAUDE.md#fluxo-obrigatório-de-trabalho):
1. consultar este template;
2. trabalhar numa branch própria;
3. validar;
4. abrir um PR contra a `main`;
5. só fazer merge com confirmação explícita do Otto.

Não há build nem framework. Cada case continua sendo um `index.html` com o
próprio conteúdo, CSS e JS. Ele só **liga** os arquivos compartilhados por
caminho relativo (`../assets/case/…`), que funciona no GitHub Pages, no
servidor local e nas pré-visualizações (raw.githack).

## Arquivos e fonte de verdade

| Arquivo | O que é | Fonte |
|---|---|---|
| `assets/case/case.css` | Base (tokens claro/escuro, página, foco, `.mono`, `.sr-only`), **topo** (`.nav`) e **fechamento** (`.tx`, `.tx-k`, `.tx-sub`, `.tx-end`, `.tx-au`, `.tx-src`, `.end-row`, `.end-ln`, `.end-pt`, `.end-a`, `.foot`), com as regras de celular | Extraído de Documentos Verificáveis |
| `assets/case/case.js` | Revelação do fio do fechamento (`.end-row` ganha `.on` ao entrar na tela; com movimento reduzido ou sem `IntersectionObserver`, já aparece pronto) | Extraído do script "Seções de texto" de Documentos Verificáveis, mais dois acréscimos (ver abaixo) |
| `assets/case/projetos.css` | Navegação entre projetos ("Continue explorando": ← Anterior · Todos os projetos · Próximo →), prefixo `cx-` | Extraído dos cinco cases que a usam (CSS idêntico nos cinco) |
| `_template/case.html` | Esqueleto de um case com a marcação exata dos componentes e as partes variáveis marcadas com ✎ | Marcação de Documentos Verificáveis |

### O que em `case.js` é extraído e o que foi acrescentado

**Extraído de Documentos Verificáveis** (script "Seções de texto"), com a mesma
lógica e a mesma margem:
- a revelação por `IntersectionObserver`, com `rootMargin "0px 0px -20% 0px"`;
- a saída direta para o estado final quando há `html.static` ou quando o
  navegador não tem `IntersectionObserver`.

**Acrescentado** para o componente funcionar sozinho, num case sem os scripts
de Documentos Verificáveis:
1. **Ativação do movimento reduzido** (linha 11): com
   `prefers-reduced-motion: reduce`, o próprio script adiciona `static` ao
   `<html>`. Em Documentos Verificáveis, isso já era feito pelo script da demo.
   Repetir é inofensivo.
2. **Revelação no fim da rolagem** (linhas 19–21): ao chegar ao fim da página,
   a linha é revelada. Isso cobre o caso em que o fechamento é o fim da página
   e a margem de 20% nunca é cruzada.

Nenhum dos dois muda Documentos Verificáveis. Lá, a linha aparece no mesmo
ponto da rolagem antes e depois da extração, medido em 1440×900, 390×844 e
1440×600.

Se um componente compartilhado precisar mudar, a mudança é feita no arquivo de
`assets/case/` e vale para todos os cases que o ligam. Ela não é feita dentro
de uma página.

## Página com identidade própria (`case-isolado`)

Um case que mantém a identidade visual própria, como o FormPilot, usa o topo e o
fechamento compartilhados sem receber a base de Documentos Verificáveis. Para
isso, marca `<html lang="pt-BR" class="case-isolado">`.

**O que a página recebe:** só os componentes, com a identidade de Documentos
Verificáveis (cores, Geist, foco vermelho). As raízes dos componentes são
exatamente três:
- `body > header.nav` (o topo, filho direto de `<body>`);
- `section.tx-end` (o fechamento);
- `footer.foot` (o rodapé).

**O que a página não recebe:**
- as cores de Documentos Verificáveis no `:root`;
- o modo escuro e o `color-scheme`;
- as regras de `body` e `html`, o reset de links e o foco global.

A página continua com as próprias fontes, cores e foco, e sem modo escuro se não
tiver.

**Contrato de herança.** As raízes declaram o que os componentes herdariam do
`<body>` de Documentos Verificáveis, para não herdar nada da página. Os valores
foram medidos na página real:
- `font-family` (Geist), `color`, fundo `--bg`, `-webkit-font-smoothing` e
  `-webkit-text-size-adjust`, das mesmas regras usadas pela base;
- `font-size:medium`, `font-weight:400`, `font-style:normal`,
  `line-height:normal`, `letter-spacing:normal`, `word-spacing:normal`,
  `text-align:start`, `text-transform:none` e `text-indent:0`, que são os
  valores efetivos em Documentos Verificáveis.

Essas regras ficam em `:where()`, com prioridade zero, para que as regras do
próprio componente vençam (por exemplo `.nav{font-size}` e `.foot{color}`).

**O topo no fluxo.** No modo isolado, o topo não é fixo: fica no fluxo da
página, sobre o fundo `--bg`, e rola junto com ela. Assim ele não flutua sobre
seções escuras da página.

**Regras para a página isolada:**
- **Sem seletores de elemento soltos** que alcancem a marcação dos componentes:
  nada de `nav{}`, `footer{}`, `header{}`, `section{}`, `h2{}`, `p{}` ou `a{}`.
  Seletores dependentes de uma classe da página (`.hero h1`, `.sh p`) estão
  liberados.
- **Sem redefinir** as classes dos componentes, como em qualquer case.
- **Acessos internos:** se a página precisar de atalhos para as próprias seções,
  eles ficam no conteúdo dela (no FormPilot, o índice `.hero-idx`, no fim do
  hero), e não no topo.
- **Validação:** compare os estilos calculados dos componentes da página com os
  de Documentos Verificáveis. As únicas diferenças aceitas são:
  - o fundo pintado nas raízes;
  - `position` do topo (e o `bottom` resolvido);
  - alturas onde o texto é diferente;
  - variáveis da página que os componentes não leem.

## Como usar num case

1. Parta de `_template/case.html`.
2. Mantenha no `<head>`, nesta ordem:
   - as fontes Geist e Geist Mono;
   - `<script>document.documentElement.classList.add("js");</script>`, que precisa vir antes do CSS, porque as regras de revelação dependem de `html.js`;
   - `<link rel="stylesheet" href="../assets/case/case.css">`, **antes** do `<style>` do case, para que o case possa acrescentar estilos sem disputar a cascata com os componentes.
3. Escreva o conteúdo próprio em `<main>`, antes do fechamento.
4. Preencha o fechamento só nos pontos marcados.
5. Ligue `<script src="../assets/case/case.js"></script>` como último script, depois dos scripts do case. Se o case usar a classe `static` para movimento reduzido, como faz Documentos Verificáveis, o script compartilhado a respeita.

## O que pode variar por case

- Título, descrição e `id` da primeira seção, para onde aponta o "↑ Topo".
- Todo o conteúdo de `<main>` antes do fechamento: abertura, demo e seções próprias.
- No fechamento:
  - o texto do rótulo (`.tx-k`), que por padrão é "Sobre o projeto";
  - o parágrafo de contexto e autoria (`.tx-sub.tx-au`);
  - o link de referência (`.tx-src`), que pode ser omitido se não houver;
  - o texto da saída (`.end-a`), que por padrão é "Todos os sistemas". O destino `/#projetos` é **fixo** em todos os cases e não muda por projeto;
  - outras saídas, se houver, ficam no mesmo `.end-row`, depois da saída para `/#projetos`.
- O `<style>` e os `<script>` próprios do case, para o que é só dele.

## O que não deve ser duplicado nem recriado

- Os tokens `:root`, a `.nav`, `.tx`, `.tx-k`, `.tx-sub`, `.tx-end`, `.tx-au`, `.tx-src`, `.end-*` e `.foot`. Não redefina essas classes no `<style>` do case. Se uma página precisar de outro valor, é sinal de que o componente compartilhado deve mudar (em `assets/case/`), não de que a página deve divergir.
- A marcação do topo e do fechamento: mesmos elementos, classes e ordem do esqueleto.
- O script de revelação do fio: não copie para a página, ligue `case.js`.

## Navegação entre projetos (decisão pendente)

Documentos Verificáveis e FormPilot **não** têm navegação entre projetos. As
duas páginas terminam no fechamento e no rodapé; no FormPilot, o Otto pediu
para tirá-la. O componente com setas foi extraído dos cinco cases da
identidade anterior (faixa escura, acento verde-água) para
`assets/case/projetos.css`, sem alteração. Ele não é usado a partir desse
arquivo: os quatro cases que ainda o têm (Extrator, Daily Ops, Motor e
TicketScript) mantêm a cópia embutida.

Ordem dos projetos (a mesma da Home):

1. Extrator de Fatura (`/extrator-de-fatura/`)
2. Daily Ops Dashboard (`/daily-ops-dashboard/`)
3. Motor de Triagem (`/motor-triagem/`)
4. TicketScript (`/ticketscript/`)
5. FormPilot (`/formpilot/`)
6. Documentos Verificáveis (`/documentos-verificaveis/`)

Comportamentos do componente:
- **Posição:** "Projeto N de 6".
- **Pontas da sequência:** no primeiro e no último case, o lado sem vizinho vira um cartão tracejado (`cx-edge`), escondido no celular.
- **Etiqueta de relação** (`cx-rel`): por exemplo, entre TicketScript e FormPilot, "evolução deste projeto" e "origem deste projeto".
- **Celular:** até 720 px, os cartões ficam empilhados, com "Todos os projetos" por último.
- **Hover e foco:** visíveis.

**A navegação só entra no padrão depois que o Otto decidir a identidade
visual dela.** Até lá:
- ela não é ligada em nenhum case novo;
- ela não é aplicada a Documentos Verificáveis;
- nenhuma versão é redesenhada por conta própria.

A decisão pendente tem duas partes: se Documentos Verificáveis passa a ter o
componente e em qual linguagem visual.

## Como validar uma mudança no template

A validação vem antes do PR, e o PR informa o que foi testado e o que não foi
possível testar.

Compare, em Documentos Verificáveis:
- desktop (1440) e celular (390);
- movimento reduzido, sem JS e modo escuro;
- topo, fechamento e rodapé, que devem ficar idênticos ao estado anterior, pixel a pixel;
- links, foco por teclado, ausência de rolagem horizontal e console sem erros;
- o fio do fechamento revelado ao entrar na tela.
