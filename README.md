# LENT Presskit

Site oficial e EPK digital de LENT (João Quaresma), com agenda, eventos, sets, redes sociais, contato e painel administrativo protegido.

## Stack

- Next.js 15 + App Router + TypeScript
- React + Tailwind/PostCSS + CSS tokens do design master
- PostgreSQL + Prisma
- Auth.js/NextAuth com credenciais e hash bcrypt
- Storage local persistente com contrato pronto para S3/R2/MinIO
- Docker e Docker Compose compatíveis com Coolify

## Desenvolvimento

1. Copie `.env.example` para `.env` e defina as variáveis.
2. Instale dependências: `npm install`.
3. Gere o cliente: `npm run db:generate`.
4. Com PostgreSQL disponível, aplique a migration: `npm run db:deploy`.
5. Rode o seed com `ADMIN_EMAIL` e `ADMIN_PASSWORD` definidos: `npm run db:seed`.
6. Inicie: `npm run dev`.

## Qualidade

```text
npm run lint
npm run typecheck
npm test
npm run build
```

## Documentação

- `docs/spec/` — especificação original e critérios de aceite.
- `docs/ARCHITECTURE.md` — camadas e decisões estruturais.
- `docs/MAINTENANCE.md` — mapa de manutenção.
- `docs/ADMIN.md` — guia do painel para o artista.
- `docs/DEPLOY.md` — Docker/Coolify, volumes, migrations e seed.

O logo LENT, a tipografia, o grid e a identidade visual não são editáveis pelo painel. A fotografia inicial preservada está em `public/uploads/lent-original.jpg`.
