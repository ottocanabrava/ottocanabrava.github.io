"""Fonte Otto: letras de traço único construídas com a geometria do logo.

Coordenadas são linhas centrais do traço numa tela de 256 de altura. Cada letra tem espaço lateral próprio,
então o texto é espaçado por métricas, não à mão.
shortcut: só as letras do nome e as ligaduras do logo; acrescentar letras quando uma página precisar.
"""
import math

STROKE = 18
TOP, MID, BASE = 94, 140, 186      # topo da altura-x, centro das curvas, linha de base
ASC_T, ASC = 88, 46                # o t é baixo (silhueta baixa e larga); b/d/h/k/l sobem até ASC
R = 46                             # raio das curvas = raio da lente
BAR_Y = TOP + 10                   # barra do t = ponte dos óculos
CUT_AT = 0                         # corte às 3h: o único lugar em que a abertura lê como C
CUT_CLOSED, CUT_OPEN = 15, 40      # meia-abertura: com o ponto dentro = O; aberta = C (a mesma do c)
# espaços laterais; espaço visível entre letras = lsb + rsb - traço: haste|haste 12, curva|haste 8, curva|curva 4
SB_STEM, SB_ROUND, SB_DIAG = 15, 11, 3

def on_ring(cx, deg):
    a = math.radians(deg)
    return cx + R * math.cos(a), MID - R * math.sin(a)

def _bowl(cx):
    return f'M{cx} {TOP} A{R} {R} 0 0 0 {cx} {BASE} A{R} {R} 0 0 0 {cx} {TOP}'

def _cut(cx, half, at=0):  # o cortado em ±half graus em volta do ângulo `at`; pontas retas
    (x1, y1), (x2, y2) = on_ring(cx, at + half), on_ring(cx, at - half)
    return f'M{x1:.2f} {y1:.2f} A{R} {R} 0 1 0 {x2:.2f} {y2:.2f}'

# cada letra: (espaço à esquerda, largura, espaço à direita, desenho(x0) -> lista de (caminho, ponta reta?))
G = {
    'o': (SB_ROUND, 2 * R, SB_ROUND, lambda x: [(_bowl(x + R), False)]),
    'c': (SB_ROUND, R + 35.2, 12, lambda x: [(_cut(x + R, CUT_OPEN), True)]),   # lado aberto: a próxima letra chega um pouco mais perto
    'a': (SB_ROUND, 2 * R, SB_STEM, lambda x: [(_bowl(x + R), False), (f'M{x + 2 * R} {TOP} V{BASE}', False)]),
    'n': (SB_STEM, 76, SB_STEM, lambda x: [(f'M{x} {TOP} V{BASE}', False),
                                           (f'M{x} 132 A38 38 0 0 1 {x + 76} 132 V{BASE}', False)]),
    'b': (SB_STEM, 2 * R, SB_ROUND, lambda x: [(f'M{x} {ASC} V{BASE}', False), (_bowl(x + R), False)]),
    'r': (SB_STEM, 38, SB_DIAG, lambda x: [(f'M{x} {TOP} V{BASE}', False),
                                           (f'M{x} 132 A38 38 0 0 1 {x + 38} {TOP}', False)]),
    'v': (10, 80, 10,   # as diagonais encostam nas vizinhas na altura-x: deixar uma folga ali
          lambda x: [(f'M{x} {TOP} L{x + 40} {BASE} L{x + 80} {TOP}', False)]),
    ' ': (0, 52, 0, lambda x: []),
    # ligaduras do logo
    # hastes a 34 de distância, para o pé do primeiro t (até x+26) não encostar na segunda
    'tt': (SB_DIAG, 74, SB_DIAG, lambda x: [(f'M{x + 14} {ASC_T} V172 Q{x + 14} {BASE} {x + 26} {BASE}', False),
                                            (f'M{x + 48} {ASC_T} V172 Q{x + 48} {BASE} {x + 60} {BASE}', False)]),
    'o_cut': (SB_ROUND, 2 * R, SB_ROUND, lambda x: [(_cut(x + R, CUT_CLOSED, CUT_AT), True)]),
}

def layout(tokens, x=0):
    """tokens: nomes de letras. Devolve [(caminho, ponta reta)], {índice: (x0, x1)} e o x final."""
    out, boxes = [], {}
    for i, t in enumerate(tokens):
        lsb, w, rsb, draw = G[t]
        x0 = x + lsb
        out += draw(x0)
        boxes[i] = (x0, x0 + w)
        x = x0 + w + rsb
    return out, boxes, x

if __name__ == '__main__':
    # autoteste: as caixas das letras do logo não se sobrepõem
    toks = ['o', 'tt', 'o_cut', ' ', 'c', 'a', 'n', 'a', 'b', 'r', 'a', 'v', 'a']
    paths, boxes, end = layout(toks, 14)
    xs = [boxes[i] for i in range(len(toks))]
    assert all(a[1] <= b[0] for a, b in zip(xs, xs[1:])), 'letras se sobrepõem'
    print('ok', len(paths), 'traços, largura', round(end))
