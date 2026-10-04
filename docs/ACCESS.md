# LENT — Acesso e variáveis

Variáveis obrigatórias:

- `DATABASE_URL`: conexão PostgreSQL.
- `NEXTAUTH_URL`: URL pública do site.
- `NEXTAUTH_SECRET`: segredo aleatório longo, somente no ambiente.
- `ADMIN_EMAIL`: e-mail usado no seed.
- `ADMIN_PASSWORD`: senha inicial usada somente no seed; mínimo de 12 caracteres.
- `STORAGE_DIR`: diretório persistente de imagens, normalmente `/app/public/uploads` no container.

Não copie valores reais para este arquivo. Use `.env.example` como contrato.
