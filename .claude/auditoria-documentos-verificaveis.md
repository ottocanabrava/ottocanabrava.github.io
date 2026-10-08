# Auditoria: demo de Documentos Verificáveis (escola)

Comparação entre a página `documentos-verificaveis/index.html` (case + demo,
publicada em 27–28/09/2026) e o repositório do projeto
`ottocanabrava/verifiable-documents` no commit `cfca67b` (07/10/2026). Fonte de
verdade: o repositório (`README.md`, `docs/especificacao.md`,
`docs/decisao.md`, `python/README.md`, `n8n/README.md`).

## Continua correto

- Planilha do Google como registro, sem banco próprio; revogar é mudar o `status`.
- PDF gerado sob demanda, nunca armazenado; reemitir gera de novo a partir da linha.
- ID de 12 letras ou dígitos, aleatório (~71 bits), sem `-` ou `_`, conferido
  antes de qualquer consulta; ID repetido não valida.
- QR aponta para `URL_DE_VALIDACAO?id=<id>`; sem URL configurada, a emissão falha.
- Validação mostra só tipo, nome, curso, carga horária e data; nunca CPF, RG ou
  endereço. PDF de declaração nunca servido pela página pública.
- Limite de 10 consultas por minuto por visitante e cache de 30 s (Python);
  sem cache no n8n.
- Uma especificação, duas implementações (Python/Flask e n8n), alternativas e
  não etapas; o custo de manter as duas.
- Acesso ao Google sem chave persistente; política do Workspace mantida.
- "O que pode ser validado" e "Fora do escopo": iguais ao README.
- 5 tipos de documento (número do hero e da Home).
- Rotas da versão Python (`GET /validar`, `GET /emitir`, `GET /emitir/<id>.pdf`)
  usadas na ilustração da arquitetura.
- Stack: Flask, ReportLab, gspread, pytest, Docker; n8n, Google Sheets, Google
  Slides, Google OAuth.

## Mudou no projeto (07/10) e está desatualizado na página

| Na página hoje | No projeto agora | Onde |
|---|---|---|
| Linha revogada: "A emissão continua gerando o PDF desta linha", com PDF exibido | **Revogado não gera PDF** (avulso, ZIP e Python); a lista tira "Baixar PDF" e a caixa do ZIP | demo, passos 2 e 3 |
| Validação de revogado: só "Este documento não é mais válido", "Nenhum dado do documento é mostrado" | Mostra o **tipo e o nome parcial** ("Carlos P."), para quem confere saber que digitou o código certo | demo, passo 5 |
| `144` testes automatizados | **156** | hero e quadro de implementação |
| n8n: "Validação pronta. Emissão testada até a geração do PDF…" | **Pronta**: validação e emissão testadas de ponta a ponta | quadro de implementação |
| Revogação só pela planilha | n8n: **botão Revogar** na emissão, com motivo (Teste, Emissão indevida, Dados incorretos, Pedido do aluno, Outro) e confirmação; grava `revogado_em`, `revogado_por`, `motivo_revogacao` (nunca na validação). Python: continua pela planilha | demo e implementação |
| Não existe | **Compartilhar** (Python e n8n): texto pronto para o aluno, com WhatsApp e e-mail, só com o que a validação já mostra | demo, passo 2 |
| Tela da emissão n8n com "Baixar PDF" na linha revogada (`img/n8n-emissao-lista.webp`) | Linha revogada sem "Baixar PDF"; ativos com Compartilhar e Revogar | imagem da implementação |
| Certificado de semestre não mencionado | Página de conteúdo **a pedido** (`semestre_conteudo`) | tipos de documento |

## Decisões tomadas

- **Tipo de escola: fica "escola de cursos livres"**, com os cursos atuais
  (Oratória, Comunicação Não Violenta, Escrita Profissional). Escolha
  intencional do autor: a demo é uma escola fictícia que mostra o
  funcionamento do sistema e não deve lembrar a instituição real (o README do
  projeto fala em "escola de idiomas"; não levar isso para a página nem trocar
  os exemplos por cursos de idiomas).
- **Tipos de documento na demo: ficam os 3 atuais.** Eles já cobrem cada
  capacidade diferente do sistema:
  - certificado de trimestre: o certificado simples (e o caso revogado);
  - certificado de curso: a segunda página de conteúdo, lida de outra planilha,
    e o botão do LinkedIn;
  - declaração de matrícula: dados pessoais no PDF que nunca chegam à validação.

  Os outros dois são variações dos mesmos casos (semestre = curso com a página
  de conteúdo a pedido; término de semestre = declaração) e só aumentariam a
  interface. A página continua dizendo "5 tipos de documento", em texto.

## Remover

- A nota "A emissão continua gerando o PDF desta linha" e o PDF do documento
  revogado como saída da emissão (`img/doc-Hx3pV9sKd7Qe.webp` deixa de ser uma
  saída; pode ficar só como "documento que circulou antes da revogação", se
  for útil).
- "Baixar PDF" na linha revogada da reprodução de `/emitir`.
- "144" e "Emissão testada até a geração do PDF".

## Acrescentar (só o que o projeto já tem)

- Revogado na validação: tipo + nome parcial.
- Compartilhar: o texto da especificação, com o ID e o link, para o documento ativo.
- Revogar com motivo e confirmação (n8n), como alternativa à planilha.
- Em texto, não na demo: o certificado de semestre ganha a página de conteúdo
  a pedido (`semestre_conteudo`).

## Reaproveitar

- Os registros fictícios, os PDFs e QRs gerados pelo código do projeto
  (certificado de curso com página de conteúdo, declaração de matrícula).
- A lógica da demo: `validar()` segue `src/validation.py` (formato → linha
  única → status → campos públicos); a troca de status na planilha e a
  revalidação; os IDs de teste (inexistente, malformado).
- A reprodução da página `/validar` e o rastro "o que a validação fez".
- Os textos de problema, decisões, "o que pode ser validado" e "fora do
  escopo", que seguem corretos.

## Reconstruir

- Toda a interface da página, para a identidade da Home: hoje é DM Sans, fundo
  `#ECEEF2`, nav escura, acento verde-petróleo, cartões com sombra e notas
  laterais em caixas.
- O stepper de 5 abas da demo, que vira um fluxo único em que a ação de uma
  etapa produz a próxima.
- A ilustração `img/arquitetura.png` (PNG 3200×1800 rolando de lado no
  celular), que a própria demo pode substituir.

## Dados da demo (conferidos em 08/10/2026, projeto em `517c8eb`)

- **QR dos PDFs:** decodificados das imagens em `documentos-verificaveis/img/`.
  `doc-Hx3pV9sKd7Qe`, `doc-k7Qm2xPz9aBc-p1` e `doc-Zr4tW8nLq2Ys` apontam para
  `https://ottocanabrava.github.io/documentos-verificaveis/?id=<id>`, cada um
  com o próprio ID. A página 2 do certificado de curso (conteúdo) não tem QR.
- **Revogação de Carlos:** `revogado_em = 12/02/2026 09:40`,
  `revogado_por = secretaria@escola-exemplo.com`,
  `motivo_revogacao = Dados incorretos (será reemitido)`, iguais à tela de
  referência do projeto (`docs/imagens/emissao-lista.png`). O mesmo e-mail
  fictício assina as revogações feitas na demo.
- **Diferença deliberada:** na referência, Carlos tem um certificado de
  semestre de Inglês; na demo, de trimestre de Oratória, porque é o PDF que o
  código do projeto gerou para o portfólio e porque a demo é a escola de
  cursos livres (decisão acima).
- **Escola real:** a página diz só "uma escola que não é identificada". Não
  diz o tipo (o README fala em idiomas; a demo é de cursos livres, de
  propósito).
