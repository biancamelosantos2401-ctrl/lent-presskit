# Deploy — LENT Presskit

## Local com Docker

1. Crie um `.env` fora do Git com `POSTGRES_PASSWORD`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
2. Execute `docker compose up -d --build`.
3. Rode o seed uma vez com as mesmas variáveis administrativas: `docker compose exec web npm run db:seed`.
4. Valide `/`, `/admin/login`, upload e persistência após `docker compose restart`.

## Coolify/VPS

- Aponte o recurso para este repositório.
- Use o Dockerfile ou o `docker-compose.yml`.
- Configure as variáveis no painel do Coolify, nunca no Git.
- Mantenha PostgreSQL e uploads em volumes persistentes.
- Fotos e PDFs usam o mesmo volume persistente e quota global de 1 GB; mantenha o volume de uploads ao trocar releases.
- Execute `npm run db:deploy` em cada release antes de iniciar o servidor.
- Execute o seed somente na primeira instalação ou quando houver uma operação consciente de atualização dos dados iniciais.
- Configure o domínio do site e HTTPS no proxy, sem substituir outros hosts da VPS.

## Backup e rollback

Faça backup do volume PostgreSQL e do volume de uploads antes de mudanças de infraestrutura. O rollback deve restaurar a imagem do container e manter os volumes intactos.
