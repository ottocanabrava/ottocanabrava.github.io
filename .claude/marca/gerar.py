"""Gera os arquivos da marca a partir da fonte Otto. Rodar da raiz do repositório:

    python3 .claude/marca/gerar.py

Escreve:
- assets/marca/otto-canabrava.svg  logo estático (cases), troca claro/escuro sozinho;
- favicon.svg                      o O cortado com o ponto, troca claro/escuro sozinho;
- index.html                       o logo da navegação, entre os marcadores <!-- marca --> e <!-- /marca -->;
- .claude/marca/remotion/src/logo.json  geometria para os vídeos.
favicon.ico e apple-touch-icon.png são PNG/ICO renderizados do favicon (skill logo-design, export_variants.py).
"""
import json, math, os, re
from fonte import layout, R, MID, BASE, ASC, STROKE, BAR_Y, CUT_AT, CUT_CLOSED, CUT_OPEN, on_ring

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
CLARO = {'ink': '#0E0F12', 'fire': '#E5482A'}     # --ink e --fire do site
ESCURO = {'ink': '#EDEDEA', 'fire': '#F2583A'}
TEMA = (f'.i{{stroke:{CLARO["ink"]}}}.f{{fill:{CLARO["fire"]}}}'
        f'@media (prefers-color-scheme:dark){{.i{{stroke:{ESCURO["ink"]}}}.f{{fill:{ESCURO["fire"]}}}}}')

TOKS = ['o', 'tt', 'o_cut', ' ', 'c', 'a', 'n', 'a', 'b', 'r', 'a', 'v', 'a']
paths, box, _ = layout(TOKS, 14)
lens_l, lens_r = box[0][0] + R, box[2][0] + R
dx = (R * R - (MID - BAR_Y) ** 2) ** .5
paths.insert(1, (f'M{lens_l + dx:.2f} {BAR_Y} H{lens_r - dx:.2f}', True))   # a ponte: liga as duas lentes
N_OTTO = 5                         # o, ponte, t, t, o cortado
C_INDEX = N_OTTO                   # o c do nome é a lente duplicada na animação
DOT = on_ring(lens_r, CUT_AT)      # o ponto completa o o cortado
W = round(box[len(TOKS) - 1][1] + 14 + STROKE / 2)
# recorte justo no desenho (do pé à ponta do b), para o tamanho em CSS valer para as letras
H = STROKE / 2
VB = f'{lens_l - R - H:g} {ASC - H:g} {box[len(TOKS) - 1][1] - (lens_l - R) + STROKE:g} {BASE - ASC + STROKE:g}'

def traços(classe_c=''):
    out = []
    for i, (d, reta) in enumerate(paths):
        attrs = ' stroke-linecap="butt"' if reta else ''
        if i == C_INDEX and classe_c:
            attrs += f' class="{classe_c}"'
        out.append(f'<path d="{d}"{attrs}/>')
    return ''.join(out)

G = f'fill="none" stroke-width="{STROKE}" stroke-linecap="round" stroke-linejoin="round"'
PONTO = f'cx="{DOT[0]:.2f}" cy="{DOT[1]}" r="{STROKE / 2}"'

def escrever(rel, texto):
    with open(os.path.join(ROOT, rel), 'w') as f:
        f.write(texto)

# 1. logo estático para <img>
escrever('assets/marca/otto-canabrava.svg',
         f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VB}"><title>Otto Canabrava</title>'
         f'<style>{TEMA}</style><g class="i" {G}>{traços()}</g><circle class="f" {PONTO}/></svg>\n')

# 2. favicon: só o o cortado com o ponto, ocupando o quadrado, na mesma proporção traço/raio
RF = 88
SF = STROKE * RF / R
def anel(d):
    a = math.radians(d)
    return 128 + RF * math.cos(a), 128 - RF * math.sin(a)
(x1, y1), (x2, y2), (px, py) = anel(CUT_AT + CUT_CLOSED), anel(CUT_AT - CUT_CLOSED), anel(CUT_AT)
escrever('favicon.svg',
         f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 280 280"><title>Otto Canabrava</title>'
         f'<style>{TEMA}</style><path class="i" d="M{x1:.2f} {y1:.2f} A{RF} {RF} 0 1 0 {x2:.2f} {y2:.2f}" '
         f'fill="none" stroke-width="{SF:.2f}"/><circle class="f" cx="{px:.2f}" cy="{py:.2f}" r="{SF / 2:.2f}"/></svg>\n')

# 3. logo da navegação na Home: embutido, para a animação desenhar cada traço (cores pelos tokens do CSS)
svg_home = (f'<svg class="marca" viewBox="{VB}" role="img" aria-label="Otto Canabrava" '
            f'data-lente="{lens_r} {MID} {R}" data-corte="{CUT_AT} {CUT_CLOSED} {CUT_OPEN}" '
            f'data-c="{box[4][0] + R}" data-otto="{N_OTTO}">'
            f'<g class="mt" {G}>{traços("mc")}</g><circle class="mp" {PONTO}/></svg>')
home = os.path.join(ROOT, 'index.html')
html = open(home).read()
novo, n = re.subn(r'<!-- marca -->.*?<!-- /marca -->', f'<!-- marca -->{svg_home}<!-- /marca -->', html, flags=re.S)
assert n == 1, 'marcadores <!-- marca --> não encontrados em index.html'
escrever('index.html', novo)

# 4. dados para os vídeos (Remotion)
json.dump({'width': W, 'height': 256, 'stroke': STROKE, 'nOtto': N_OTTO, 'cIndex': C_INDEX,
           'paths': [{'d': d, 'butt': reta} for d, reta in paths], 'cutDot': DOT, 'dotR': STROKE / 2,
           'lens': [lens_r, MID, R], 'cut': [CUT_AT, CUT_CLOSED, CUT_OPEN], 'cGlyph': [box[4][0] + R, CUT_OPEN],
           'ink': CLARO['ink'], 'fire': CLARO['fire']},
          open(os.path.join(ROOT, '.claude/marca/remotion/src/logo.json'), 'w'), indent=1)
print('ok', W)
