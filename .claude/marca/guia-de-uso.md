# otto canabrava — guia de uso

Os arquivos das tabelas estão no kit da marca (zip entregue ao Otto). No site, os arquivos em uso são `assets/marca/otto-canabrava.svg`, `favicon.*` e `apple-touch-icon.png`, gerados por `gerar.py`.

## 1. O logo

**Ideia:** "otto" é um par de óculos. Os dois o são as lentes e o tt é a ponte. O ponto vermelho completa a segunda lente.
Na animação, essa lente se duplica e vira o C de Canabrava. O ponto escreve o resto do nome e volta para fechar o O.

| Versão | Arquivo | Quando usar |
|---|---|---|
| Letreiro completo | `logo-otto-canabrava.svg` (`-escuro` no modo escuro) | site, currículo, apresentações |
| Símbolo | `simbolo-otto.svg` (`-escuro`) | cabeçalho estreito, camiseta, bordado |
| O cortado com o ponto | `favicon-o.svg` e `web/` | favicon, avatar, ícone de app |
| Uma cor | `variacoes/*-black.svg`, `*-white.svg` | impressão de uma cor, gravação, fundos de foto |
| Vídeo | `videos/*.mp4` (claro, escuro e quadrado) | LinkedIn, abertura de vídeos, apresentações |

## 2. Construção (fonte Otto)

- **Traço:** uma grossura só, com pontas redondas. Ponta reta só onde há corte (o O cortado e o c).
- **Medidas:** todas as curvas têm o raio da lente. A altura-x é igual à altura da lente.
- **Espaço entre letras:** haste|haste 12, curva|haste 8, curva|curva 4 (em unidades do desenho; o traço tem 18).
- **t baixo:** as hastes dos t ficam na altura do topo das lentes. Isso mantém a silhueta baixa e larga.
- **Corte:** fica às 3h e tem a largura do ponto. O ponto tem a grossura do traço.
- **Nome:** não digite o nome numa fonte qualquer. Ele é desenhado com a fonte Otto (`fonte.py`).

## 3. Área de proteção

Ao redor do logo, deixe livre **metade da altura de uma lente** em todos os lados. A área cresce junto com o logo.

## 4. Tamanho mínimo

| Versão | Tela | Impressão |
|---|---|---|
| Letreiro completo | 120 px de largura (o topo do site usa 124–132 px) | 30 mm |
| Símbolo otto | 40 px de largura | 10 mm |
| O cortado | 16 px | 4 mm |

Abaixo do mínimo do símbolo, use o O cortado. No bordado, o otto precisa ter pelo menos 35 mm de largura, o que dá cerca de 2 mm de traço.

## 5. Cores (as do site)

| Papel | Claro | Escuro |
|---|---|---|
| Tinta | `#0E0F12` (14, 15, 18) | `#EDEDEA` (237, 237, 234) |
| Ponto | `#E5482A` (229, 72, 42) | `#F2583A` (242, 88, 58) |
| Fundo | `#F7F7F5` (247, 247, 245) | `#0C0D0F` (12, 13, 15) |

- O vermelho aparece **só no ponto**. Nunca como fundo, texto ou contorno.
- Em uma cor, o ponto fica da mesma cor do traço.
- CMYK e Pantone ainda precisam ser definidos com a gráfica, com prova impressa.

**Combinações aprovadas:**
- tinta clara sobre fundo claro;
- versão escura sobre fundo escuro;
- preto sobre branco;
- branco sobre foto, numa área calma.

## 6. Animação

1. O otto se desenha.
2. O ponto pousa na lente.
3. A lente se duplica e desliza até virar o C.
4. O ponto escreve "anabrava" em velocidade constante.
5. O ponto volta num salto e fecha a lente.

**No site:**
- toca uma vez;
- com `prefers-reduced-motion`, aparece direto no estado final, parado.

## 7. Não fazer

- Não esticar, girar, inclinar nem contornar o logo, e não pôr sombra ou gradiente.
- Não mudar o ponto de lugar nem de cor, e não acrescentar outro ponto.
- Não deixar os t mais altos nem trocar as pontas redondas por retas.
- Não usar o vermelho como cor de fundo ou de texto.
- Não separar "otto" de "canabrava" com outra fonte.

## 8. Arquivos-fonte

- **`fonte.py`:** a fonte Otto (letras, métricas e o corte). Rode `python3 .claude/marca/fonte.py` para o autoteste.
- **`gerar.py`:** gera o logo, o favicon, o logo embutido da Home e os dados dos vídeos.
- **`remotion/`:** o projeto dos vídeos. Para renderizar: `npm i`, depois `npx remotion render LogoOtto`, `LogoOttoEscuro` ou `LogoOttoQuadrado`.

Pendências:
- **Marca registrada:** a busca ainda não foi feita.
- **Matrizes por traço:** os SVGs são desenhados por traço. Para gráfica ou corte a laser, converta os traços em contornos no Illustrator ou no Inkscape.
