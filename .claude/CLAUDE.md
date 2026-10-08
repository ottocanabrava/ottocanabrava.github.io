# Portfólio de Otto Canabrava (ottocanabrava.github.io)

Site estático em pt-BR, publicado pelo GitHub Pages a partir de `main`. Cada
página é um `index.html` autocontido (CSS e JS embutidos); não há build.

- `index.html`: a Home, referência da identidade visual. Antes de criar ou
  mudar qualquer página, leia [`identidade.md`](identidade.md).
- `<projeto>/index.html`: case de cada sistema. Documentos Verificáveis é a
  referência oficial; os demais ainda estão na identidade anterior.
- `assets/case/` e `_template/case.html`: componentes compartilhados dos cases
  (topo, fechamento, navegação entre projetos), extraídos de Documentos
  Verificáveis. Antes de criar ou mudar um case, leia
  [`template-de-cases.md`](template-de-cases.md).
- `.claude/`: documentação de trabalho; o Jekyll do Pages não publica pastas
  que começam com ponto.

## Regras

- Não inventar projeto, cargo, empresa, tecnologia, métrica, resultado ou
  responsabilidade. Só o que está nos cases, na Home ou no repositório do
  projeto; havendo conflito, o repositório atual do projeto vale e o conflito
  é sinalizado ao usuário.
- Não alterar números, relações do mapa nem narrativa da Home sem pedido.
- Não mexer no modo escuro sem pedido explícito.
- Dados de exemplo: sempre fictícios e declarados como tal. Nenhum exemplo
  deve lembrar a instituição real de um projeto (ex.: Documentos Verificáveis
  usa uma "escola de cursos livres" fictícia, de propósito).
- Os cases linkam para `/#projetos` (âncora do mapa na Home): não remover.
- Sem abstração ou CSS compartilhado por antecipação; copiar o padrão da Home
  até que uma segunda página precise dele de fato. Exceção já feita: topo,
  fechamento e navegação dos cases ficam em `assets/case/` e são ligados, não
  copiados nem recriados por página.
- Testar desktop e celular (e `prefers-reduced-motion`) antes de abrir PR.
