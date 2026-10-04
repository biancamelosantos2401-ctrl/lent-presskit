# LENT — Arquitetura

## Visão

O projeto é um monólito modular Next.js 15 com App Router. A interface pública e o painel administrativo vivem no mesmo deploy, mas o conteúdo passa sempre por PostgreSQL e pelas validações do servidor.

## Camadas

- **Apresentação:** `src/app` e `src/components` — rotas, páginas, componentes visuais e formulários.
- **Aplicação:** `src/app/admin/actions.ts` e `src/lib/site-data.ts` — casos de uso, revalidação e consultas.
- **Domínio:** `src/lib/validation.ts` — contratos Zod, protocolos permitidos e limites.
- **Infraestrutura:** `src/lib/db.ts`, `src/lib/auth.ts`, `src/lib/storage.ts` e `prisma/` — banco, sessão e arquivos.

O fluxo permitido é apresentação → aplicação → domínio/infraestrutura. Componentes visuais não executam SQL diretamente.

## Persistência

O PostgreSQL mantém usuários, configurações, agenda, eventos, sets, redes, seção Sobre e metadados de mídia. Imagens ficam em volume persistente por meio do contrato de storage local; o retorno é uma URL `/uploads/...`, mantendo a troca futura por S3/R2/MinIO isolada.

## Segurança

O admin usa credenciais com hash bcrypt e sessão JWT httpOnly via Auth.js/NextAuth. Todas as mutações verificam a sessão novamente no servidor. URLs e uploads são validados antes da persistência.
