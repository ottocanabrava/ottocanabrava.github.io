# Template de cases

Documentos Verificáveis (`documentos-verificaveis/index.html`) é a referência
oficial dos cases. O topo, o fechamento e a base visual dele foram **extraídos**
para arquivos compartilhados, sem alteração de valores. Os outros cases devem
ligar esses arquivos, e não recriar os componentes.

Não há build nem framework. Cada case continua sendo um `index.html` com o
próprio conteúdo, CSS e JS. Ele só **liga** os arquivos compartilhados por
caminho relativo (`../assets/case/…`), que funciona no GitHub Pages, no
servidor local e nas pré-visualizações (raw.githack).

## Arquivos e fonte de verdade

| Arquivo | O que é | Fonte |
|---|---|---|
| `assets/case/case.css` | Base (tokens claro/escuro, página, foco, `.mono`, `.sr-only`), **topo** (`.nav`) e **fechamento** (`.tx`, `.tx-k`, `.tx-sub`, `.tx-end`, `.tx-au`, `.tx-src`, `.end-row`, `.end-ln`, `.end-pt`, `.end-a`, `.foot`), com as regras de celular | Extraído de Documentos Verificáveis |
| `assets/case/case.js` | Revelação do fio do fechamento (`.end-row` ganha `.on` ao entrar na tela; com movimento reduzido ou sem `IntersectionObserver`, já aparece pronto) | Extraído do script "Seções de texto" de Documentos Verificáveis |
| `assets/case/projetos.css` | Navegação entre projetos ("Continue explorando": ← Anterior · Todos os projetos · Próximo →), prefixo `cx-` | Extraído dos cinco cases que a usam (CSS idêntico nos cinco) |
| `_template/case.html` | Esqueleto de um case com a marcação exata dos componentes e as partes variáveis marcadas com ✎ | Marcação de Documentos Verificáveis |

Se um componente compartilhado precisar mudar, a mudança é feita no arquivo de
`assets/case/` e vale para todos os cases que o ligam. Ela não é feita dentro
de uma página.

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
  - o texto do rótulo (`.tx-k`);
  - o parágrafo de contexto e autoria (`.tx-sub.tx-au`);
  - o link de referência (`.tx-src`), que pode ser omitido se não houver;
  - o texto e o destino das saídas (`.end-a`). Mais de uma saída fica no mesmo `.end-row`.
- O `<style>` e os `<script>` próprios do case, para o que é só dele.

## O que não deve ser duplicado nem recriado

- Os tokens `:root`, a `.nav`, `.tx`, `.tx-k`, `.tx-sub`, `.tx-end`, `.tx-au`, `.tx-src`, `.end-*` e `.foot`. Não redefina essas classes no `<style>` do case. Se uma página precisar de outro valor, é sinal de que o componente compartilhado deve mudar (em `assets/case/`), não de que a página deve divergir.
- A marcação do topo e do fechamento: mesmos elementos, classes e ordem do esqueleto.
- O script de revelação do fio: não copie para a página, ligue `case.js`.

## Navegação entre projetos (decisão pendente)

Documentos Verificáveis **não** tem navegação entre projetos hoje. A página
termina no fechamento e no rodapé. O componente com setas existe nos outros
cinco cases, na identidade anterior (faixa escura, acento verde-água), e foi
extraído para `assets/case/projetos.css` sem alteração. Ele ainda não é usado
a partir desse arquivo: os cinco cases mantêm a cópia embutida até migrarem.

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

Antes de aplicá-lo como padrão, falta decidir se Documentos Verificáveis passa
a ter esse componente e em qual linguagem visual.

## Como validar uma mudança no template

Compare, em Documentos Verificáveis:
- desktop (1440) e celular (390);
- movimento reduzido, sem JS e modo escuro;
- topo, fechamento e rodapé, que devem ficar idênticos ao estado anterior, pixel a pixel;
- links, foco por teclado, ausência de rolagem horizontal e console sem erros;
- o fio do fechamento revelado ao entrar na tela.
