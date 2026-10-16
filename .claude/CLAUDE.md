# Portfólio de Otto Canabrava (ottocanabrava.github.io)

Site estático em pt-BR, publicado pelo GitHub Pages a partir de `main`. Não
há build. Cada página é um `index.html` com o próprio CSS e JS embutidos. A
exceção são os cases que usam o template, como Documentos Verificáveis: eles
também carregam os arquivos compartilhados de `assets/case/`.

- `index.html`: a Home, referência da identidade visual. Antes de criar ou
  mudar qualquer página, leia [`identidade.md`](identidade.md).
- `<projeto>/index.html`: case de cada sistema. Documentos Verificáveis é a
  referência oficial; todos os outros cases (Extrator de Fatura, Daily Ops,
  Motor de Triagem, TicketScript, FormPilot e Agente de Qualificação de Leads)
  já seguem a mesma linguagem.
- `assets/case/` e `_template/case.html`: componentes compartilhados dos cases,
  o topo e o fechamento, extraídos de Documentos Verificáveis. Antes de criar
  ou mudar um case, leia [`template-de-cases.md`](template-de-cases.md).
  A navegação entre projetos (`assets/case/projetos.css`) está guardada, mas
  não faz parte do template ativo. Ela não é usada até o Otto decidir a
  identidade visual dela.
- `assets/marca/`, `favicon.*` e `apple-touch-icon.png`: o logo e os ícones,
  gerados por `.claude/marca/gerar.py` a partir da fonte Otto. Regras em
  [`identidade.md`](identidade.md#marca) e `.claude/marca/guia-de-uso.md`.
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
  até que uma segunda página precise dele de fato. Exceção já feita: o topo e o
  fechamento dos cases ficam em `assets/case/` e são ligados, não copiados nem
  recriados por página. A navegação entre projetos não entra nessa exceção
  até a decisão sobre a identidade visual dela.

## Ponytail (obrigatório)

Todo trabalho neste repositório usa o plugin
[Ponytail](https://github.com/DietrichGebert/ponytail), registrado em
`.claude/settings.json` (o Claude Code oferece a instalação ao abrir o
projeto; à mão: `/plugin marketplace add DietrichGebert/ponytail` e
`/plugin install ponytail@ponytail`).

Para que serve: manter as mudanças pequenas e completas. O Ponytail faz a
menor mudança que resolve o pedido, evita abstração e dependência por
antecipação e marca com `shortcut:` o atalho deliberado. Ele nunca corta
validação, segurança nem acessibilidade. Isso reforça as regras acima (sem
CSS compartilhado por antecipação, componentes do template ligados e não
recriados).

Como usar:

- antes de abrir um PR, rodar `/ponytail-review` no diff da branch;
- numa revisão geral do site, rodar `/ponytail-audit`, que só gera o
  relatório e não muda nada;
- numa sessão na nuvem, o setup script precisa rodar
  `claude plugin install ponytail@ponytail`: o registro no `settings.json`
  só baixa o código, não instala o plugin.

O Ponytail não substitui a identidade visual nem o fluxo abaixo: quando
houver conflito, valem `identidade.md`, `template-de-cases.md` e este
arquivo.

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

## Identidade Git (obrigatória)

Antes de criar qualquer commit:

- Conferir `git config user.name` e `git config user.email`: devem ser
  `ottocanabrava` e `ottocanabrava@gmail.com`. Se estiverem diferentes,
  corrigir a configuração local do repositório antes do commit.
- Para corrigir: `git config user.name ottocanabrava` e
  `git config user.email ottocanabrava@gmail.com`.
- Nunca usar `Claude` nem `noreply@anthropic.com` como autor dos commits.
- Não adicionar a linha `Co-Authored-By` do Claude na mensagem do commit.
- Não reescrever commits antigos nem fazer push sem autorização explícita do Otto.
