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

## Fluxo obrigatório de trabalho

Vale para todo trabalho no repositório, inclusive novos cases e mudanças em
cases existentes.

1. **Consultar o padrão antes de implementar.** Em qualquer case, novo ou
   existente, ler antes `_template/case.html`, `assets/case/` e
   [`template-de-cases.md`](template-de-cases.md). Não recriar componentes
   compartilhados nem reinterpretar referências visuais sem necessidade
   justificada.
2. **Trabalhar numa branch própria.** Nunca diretamente na `main`.
3. **Validar antes do PR.** Rodar os testes pertinentes e conferir:
   - desktop e celular, e `prefers-reduced-motion`;
   - links e teclado;
   - console;
   - regressões visuais.

   Informar com clareza o que foi testado e o que não foi possível testar.
4. **Abrir um PR para aprovação do Otto.** Com a implementação e a validação
   concluídas, fazer commit e push da branch e abrir um pull request contra a
   `main`. O PR traz:
   - resumo das mudanças;
   - arquivos alterados;
   - testes feitos;
   - capturas visuais relevantes.
5. **Nunca fazer merge sem confirmação explícita do Otto.** O PR é o ponto de
   revisão e decisão. Não integrar automaticamente, não alterar a `main`
   diretamente e não considerar o trabalho aprovado só porque os testes
   passaram.
6. **Não abrir PR vazio ou prematuro.** Primeiro concluir a tarefa e validar o
   resultado. Havendo decisão visual ou arquitetural pendente, apresentar a
   dúvida antes de avançar para a etapa que depende dela.
