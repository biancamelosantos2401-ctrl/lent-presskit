# INSTRUÇÃO DE EXECUÇÃO PARA O CODEX

Execute este projeto como trabalho de desenvolvimento real.

## 1. Antes de programar

Leia integralmente, nesta ordem:

1. `docs/spec/00-LEIA-PRIMEIRO.md`
2. `docs/spec/01-PROMPT-MESTRE.md`
3. `docs/spec/02-FIDELIDADE-VISUAL.md`
4. `docs/spec/04-CRITERIOS-DE-ACEITE.md`

Depois inspecione:

- `docs/reference/site-admin-reference.png`
- `docs/reference/lent-original.jpg`

Analise também todo o repositório existente.

Não faça alterações antes de entender a estrutura atual.

---

## 2. Primeiro retorno esperado

Antes da implementação, apresente de forma objetiva:

### A. Diagnóstico do repositório
- stack atual;
- estrutura atual;
- o que já existe;
- riscos;
- conflitos com a especificação.

### B. Plano de implementação
Separado por fases.

### C. Árvore de arquivos planejada
Liste os principais arquivos a criar/alterar.

### D. Decisões técnicas
Explique apenas decisões que realmente precisem ser tomadas.

Não peça confirmação para detalhes que já estão definidos nos documentos.

---

## 3. Depois execute

Implemente o projeto completo.

Não pare após scaffolding.

Não entregue apenas mockups.

Não deixe funcionalidades simuladas quando a especificação pedir persistência real.

---

## 4. Ordem sugerida

1. Base do projeto.
2. Banco PostgreSQL + Prisma.
3. Autenticação administrativa.
4. Design system.
5. Site público.
6. Hero.
7. Redes sociais.
8. WhatsApp.
9. Agenda.
10. Últimos eventos.
11. Sets.
12. Sobre.
13. Painel administrativo.
14. Upload/storage.
15. Integração total painel → site público.
16. Responsividade.
17. Segurança.
18. Docker/Coolify.
19. Seed.
20. Documentação.
21. Testes.
22. Revisão visual final.

---

## 5. Qualidade obrigatória

Ao final, execute:

- instalação de dependências;
- migrations;
- seed;
- lint;
- typecheck;
- testes;
- build.

Corrija os erros encontrados.

Não considerar o trabalho concluído enquanto o build falhar.

---

## 6. Revisão visual obrigatória

Antes de concluir:

compare a implementação com:

`docs/reference/site-admin-reference.png`

Corrija diferenças relevantes.

A imagem é o alvo visual.

Não entregue simplesmente "inspirado".

---

## 7. Não alterar escopo

Não adicionar:

- multi-artista;
- billing;
- marketplace;
- funcionalidades SaaS;
- app mobile;
- recursos não solicitados.

Primeiro entregar LENT funcionando de ponta a ponta.

---

## 8. Resultado

O resultado deve permitir que João Quaresma/LENT gerencie sozinho:

- foto;
- dados;
- agenda;
- eventos;
- sets;
- redes;
- WhatsApp;
- conteúdo Sobre;
- estatísticas.

O artista não deve precisar editar código.

A identidade visual permanece protegida.
