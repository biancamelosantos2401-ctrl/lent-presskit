# MAINTENANCE — LENT Presskit

## Mapa rápido

| Quero mudar | Onde mexer |
|---|---|
| Composição pública | `src/app/globals.css` e `src/components/public/PublicSite.tsx` |
| Galeria do hero | `src/components/public/HeroSlideshow.tsx`, `src/app/admin/(protected)/hero/page.tsx` e `SiteSettings.heroImages` |
| Conteúdo público | Painel `/admin`, nunca hardcode na página |
| Arquivos públicos | `src/app/admin/(protected)/materiais`, `src/components/admin/DocumentUploader.tsx` e `Resource` |
| Regras e campos | `src/lib/validation.ts` e `prisma/schema.prisma` |
| CRUD administrativo | `src/app/admin/actions.ts` e a página correspondente |
| Login | `src/lib/auth.ts` e `/admin/login` |
| Uploads e quota de 1 GB | `src/lib/storage.ts`, `src/app/api/upload/route.ts` e `src/components/admin/StorageUsage.tsx` |
| Dados iniciais | `prisma/seed.ts` |
| Deploy | `Dockerfile`, `docker-compose.yml`, `docs/DEPLOY.md` |

## Pontos sensíveis

- Não permitir que o painel edite o logo, tipografia, grid ou tokens visuais.
- Não remover os volumes PostgreSQL e uploads em deploy.
- Nunca versionar `.env`, senhas ou chaves.
- Toda ação administrativa deve manter `requireAdmin()` antes de escrever.

## Fluxos críticos

1. Login: `/admin/login` → NextAuth credentials → sessão JWT → layout protegido.
2. Conteúdo: formulário admin → Server Action → Zod → Prisma → `revalidatePath('/')`.
3. Imagem: `ImageUploader`/`MultiImageUploader` → `/api/upload` → sessão → MIME/tamanho/quota global → storage → `Media` → URL salva no formulário.
4. PDF: `DocumentUploader` → `/api/upload` com `kind=pdf` → `Media` → Server Action → `Resource` → seção pública com download.
5. Hero: painel → `heroImages` + `heroIntervalSeconds` → `HeroSlideshow` → alternância no cliente.

## Troubleshooting

| Sintoma | Investigar |
|---|---|
| Site sem dados | `DATABASE_URL`, migration e seed |
| Imagem some após restart | volume `uploads_data` e `STORAGE_DIR` |
| Login falha | `NEXTAUTH_SECRET`, seed e hash no User |
| Alteração não aparece | Server Action, `revalidatePath` e sessão |
| Upload bloqueado | `Media.size`, limite de 1 GB e volume configurado em `STORAGE_DIR` |
