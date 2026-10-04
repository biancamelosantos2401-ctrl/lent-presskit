# PROJETO: SITE / EPK DIGITAL DO ARTISTA LENT

Você é o engenheiro responsável por construir um site profissional de apresentação para um artista/DJ, acompanhado de um CMS/painel administrativo próprio.

O projeto deve ser desenvolvido como produto real, preparado para produção, responsivo, seguro, de fácil manutenção e implantável em VPS via Docker/Coolify.

O artista não deve depender de desenvolvedor para atualizar o conteúdo da página.

---

# 1. OBJETIVO DO PROJETO

Construir um site de apresentação artístico para:

- Nome artístico: **LENT**
- Nome: **João Quaresma**

O site funcionará como:

- site oficial do artista;
- EPK digital;
- agenda;
- portfólio de eventos;
- central de SETs;
- apresentação artística;
- centralização das redes sociais;
- canal de contato/booking.

Deve existir também uma área administrativa autenticada onde o próprio artista poderá atualizar o conteúdo exibido no site.

O CMS **não** deve permitir destruir ou descaracterizar o design.

O artista pode alterar conteúdo.

O layout, grid, identidade, espaçamentos e estrutura visual permanecem controlados pelo sistema.

---

# 2. REGRA PRINCIPAL DE REFERÊNCIA VISUAL

Existe uma imagem/mockup de referência aprovada pelo cliente em:

`docs/reference/site-admin-reference.png`

Ela é a principal referência visual do projeto.

O site deve reproduzir o mais fielmente possível:

- composição;
- proporções;
- hierarquia visual;
- preto piano;
- tipografia condensada;
- cards;
- bordas;
- espaçamentos;
- verde neon;
- disposição da fotografia;
- menu;
- quadrantes;
- área "Sobre";
- identidade visual geral;
- aparência do painel administrativo.

Não reinterpretar o design.

Não criar um template SaaS genérico.

Não substituir o conceito visual por aparência padrão de framework.

Quando houver dúvida:

1. a imagem de referência define o **visual**;
2. esta especificação define o **comportamento**.

---

# 3. CONCEITO VISUAL

Visual:

**BLACK PIANO / UNDERGROUND / PREMIUM / MINIMAL / ELECTRONIC MUSIC**

Paleta base:

- Background principal: `#050505`
- Background secundário: `#090909`
- Cards: `#0D0D0D` / `#101010`
- Borders: `rgba(255,255,255,0.12)`
- Texto primário: `#F5F5F5`
- Texto secundário: `#989898`
- Accent: verde neon aproximadamente `#B8FF3C`
- Erros/exclusão: vermelho discreto

O verde deve aparecer somente como elemento de destaque.

Evitar excesso de neon.

---

# 4. TIPOGRAFIA E IDENTIDADE

A tipografia deve permanecer fixa no produto.

O administrador não poderá alterar fontes.

Usar:

- **Bebas Neue** para títulos/display;
- **Barlow Condensed** para textos, labels e interface.

Fallback:
`Arial Narrow, sans-serif`

A arte/logotipo:

**LENT + risco/pincelada verde**

é uma arte fixa.

Ela deve existir como asset próprio:

`/public/brand/lent-logo.svg`

ou PNG de alta resolução caso SVG não esteja disponível.

O texto "LENT" do logo não deve ser recriado dinamicamente.

Não permitir alterar o logo pelo painel administrativo.

---

# 5. STACK

Utilizar preferencialmente:

- Next.js 15+
- App Router
- TypeScript
- React
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Auth.js / NextAuth para autenticação
- Zod para validação
- React Hook Form quando necessário
- Lucide Icons
- Docker
- Docker Compose
- deploy compatível com Coolify

Para upload de arquivos:

Criar abstração de storage.

Inicialmente deve funcionar com volume persistente da VPS.

Estruturar para futura migração para:

- S3
- Cloudflare R2
- MinIO
- Supabase Storage

sem necessidade de refazer o sistema.

---

# 6. ROTAS

Site público:

- `/` ou `/lent`

Admin:

- `/admin/login`
- `/admin`
- `/admin/hero`
- `/admin/agenda`
- `/admin/eventos`
- `/admin/sets`
- `/admin/sobre`
- `/admin/redes-sociais`
- `/admin/contato`

---

# 7. HEADER

Criar header semelhante ao mockup.

Elementos:

- logo LENT no canto esquerdo;
- menu: HOME, AGENDA, EVENTOS, SETS, SOBRE, CONTATO;
- botão BOOKING →.

Desktop:
menu horizontal.

Mobile:
menu hamburger.

O header pode ser sticky.

Ao rolar:
background preto translúcido + blur discreto.

---

# 8. HERO PRINCIPAL

O hero deve ocupar a maior área da primeira dobra.

Estrutura visual:

- lado esquerdo: arte fixa LENT;
- centro/direita/fundo: fotografia do artista.

Elementos:

- LENT — logo fixo;
- João Quaresma;
- tagline;
- localização;
- redes sociais;
- contato;
- fotografia.

Exemplo:

JOÃO QUARESMA

MUSIC / PARTY / CULTURE

BELO HORIZONTE
BRASIL

Todos estes textos, exceto o logo LENT, poderão ser editados pelo painel.

---

# 9. IMAGEM HERO

A foto do artista pode ser substituída pelo administrador.

Separar:

## IDENTIDADE FIXA

- logo LENT;
- risco verde;
- fonte;
- layout;
- posição dos elementos.

## CONTEÚDO EDITÁVEL

- fotografia;
- nome real;
- cidade;
- país;
- tagline;
- demais textos.

Upload recomendado:
1920x1080 ou maior.

Aceitar:

- JPG
- JPEG
- PNG
- WEBP

Usar otimização e `next/image`.

---

# 10. REDES SOCIAIS E PLATAFORMAS

Exibir ícones abaixo das informações do artista.

Suportar inicialmente:

- Instagram
- SoundCloud
- Spotify
- YouTube
- TikTok

Estrutura:

- platform
- url
- enabled
- position

No painel o artista deve poder:

- informar URL;
- alterar URL;
- habilitar;
- desabilitar;
- definir ordem.

Quando `enabled = false`, o ícone não aparece no site.

Ao clicar:
abrir a URL informada.

Usar:

- `target="_blank"`
- `rel="noopener noreferrer"`

Validar protocolos e bloquear URLs inseguras.

---

# 11. BOTÃO WHATSAPP

Adicionar CTA destacado:

- ícone WhatsApp;
- texto padrão: **Entrar em contato**.

Visual:
botão preto, outline verde, ícone verde, hover elegante.

Preferencialmente no Hero.

Em mobile pode existir versão flutuante discreta.

Painel deve permitir:

- habilitar/desabilitar;
- informar telefone;
- informar mensagem padrão;
- alterar texto do botão.

Campos:

- enabled
- phone
- message
- buttonText

Gerar URL `wa.me`.

---

# 12. TRÊS QUADRANTES PRINCIPAIS

Logo abaixo do hero:

`[ AGENDA ] [ ÚLTIMOS EVENTOS ] [ SETS ]`

Todos devem manter:

- mesma altura visual;
- mesmo grid;
- mesmas bordas;
- mesmo radius;
- alinhamento;
- paddings;
- identidade visual.

O usuário altera conteúdo, não layout.

Mobile:
uma coluna vertical.

---

# 13. QUADRANTE 1 — AGENDA

Título padrão:
**AGENDA**

Subtítulo:
**PRÓXIMOS COMPROMISSOS**

Título e subtítulo editáveis separadamente.

Cada compromisso:

- id
- eventDate
- title
- venue
- city
- state
- country
- status
- ticketUrl
- enabled
- position

Status:

- CONFIRMADO
- A CONFIRMAR
- CANCELADO

Permitir:

- criar;
- editar;
- excluir;
- habilitar/desabilitar;
- reordenar.

Eventos antigos podem sair automaticamente da área pública sem serem apagados do banco.

CTA:
**VER AGENDA COMPLETA →**

Texto do CTA editável.

---

# 14. QUADRANTE 2 — ÚLTIMOS EVENTOS

Título padrão:
**ÚLTIMOS EVENTOS**

Subtítulo:
**REGISTROS RECENTES**

Permitir editar separadamente:

- título;
- subtítulo;
- imagens;
- textos;
- evento destacado;
- eventos secundários;
- CTA.

O layout permanece bloqueado.

Estrutura visual:

- uma imagem principal grande;
- informações do evento;
- três thumbnails menores;
- botão inferior.

Evento:

- título
- subtítulo
- cidade
- estado
- data
- descrição
- imagem de capa
- galeria
- enabled
- position

Permitir:

- adicionar imagem;
- substituir;
- remover;
- reordenar.

CTA:
**VER TODOS OS EVENTOS →**

---

# 15. QUADRANTE 3 — SETS

Título:
**SETS**

Subtítulo:
**ÚLTIMOS LANÇAMENTOS**

Título e subtítulo editáveis separadamente.

Cada SET:

- title
- subtitle
- genre
- duration
- coverImage
- platform
- embedUrl
- externalUrl
- enabled
- position

Suportar:

- SoundCloud
- Mixcloud
- YouTube
- Spotify
- link externo

Não depender obrigatoriamente de APIs externas.

Preferir embed oficial quando adequado.

Mostrar até 3 itens compactos na home.

CTA:
**VER TODOS OS SETS →**

---

# 16. WAVEFORM

Se for simples, implementar waveform real.

Caso contrário, usar representação visual estática elegante.

Não adicionar dependência pesada somente para isso.

---

# 17. SEÇÃO SOBRE

Abaixo dos três quadrantes.

Estrutura:

`[ FOTO ] [ CONTEÚDO ] [ NÚMEROS ]`

Título padrão:
**SOBRE**

Tudo editável, exceto identidade/layout.

Campos:

- sectionTitle
- body
- image
- enabled

Separar título do corpo no CMS.

---

# 18. ESTATÍSTICAS DO SOBRE

Exemplo:

- 10+ / ANOS
- 150+ / EVENTOS
- 20+ / CIDADES

Não hardcode.

Coleção `aboutStats`:

- value
- label
- position
- enabled

Permitir:

- editar valor;
- editar texto;
- habilitar/desabilitar;
- adicionar;
- remover;
- reordenar.

Preservar o layout.

---

# 19. PAINEL ADMINISTRATIVO

Interface admin com a mesma identidade:

- black piano;
- cards grafite;
- texto branco;
- accent verde.

Sidebar:

- LENT
- Painel do Artista
- Painel
- Perfil
- Hero
- Agenda
- Últimos eventos
- SETs
- Sobre
- Redes sociais
- Contato

Botão:
**VER SITE ↗**

---

# 20. LOGIN

Página:
`/admin/login`

Campos:
- email
- senha

Sem cadastro público.

Usuários administrativos criados via seed/script ou banco.

Senha com hash seguro.

Proteger todas as rotas `/admin`.

---

# 21. DASHBOARD

Mostrar resumo:

- próximos eventos;
- eventos cadastrados;
- sets publicados;
- redes ativas.

Atalhos:

- Novo compromisso
- Novo evento
- Novo set
- Alterar foto principal

Dashboard simples e compacto.

---

# 22. ADMIN — HERO

Sessão:
**Hero / Identidade**

Card 1:
Imagem de fundo (hero)

- preview atual;
- trocar imagem;
- remover.

Card 2:
Identidade fixa

- mostrar logo LENT;
- texto: "Esta arte é fixa e não pode ser alterada."

Campos editáveis:

- nome real;
- localização;
- tagline.

---

# 23. ADMIN — REDES SOCIAIS

Tabela:

`PLATAFORMA | URL | STATUS | EXIBIR | AÇÕES`

Instagram
SoundCloud
Spotify
YouTube
TikTok

Cada item:

- URL input
- toggle enabled

Mostrar status:
`● Ativo`

Botão:
**SALVAR ALTERAÇÕES**

---

# 24. ADMIN — AGENDA

Tabela:

- DATA
- EVENTO
- LOCAL
- CIDADE
- STATUS
- AÇÕES

Ações:

- editar
- excluir
- ativar/desativar

Botão:
**+ NOVO COMPROMISSO**

---

# 25. ADMIN — ÚLTIMOS EVENTOS

Campos:

- Título da seção
- Texto/subtítulo de apoio

Galeria de eventos.

Botão:
**+ NOVO EVENTO**

Permitir:

- upload;
- preview;
- editar informações;
- deletar;
- reordenar.

---

# 26. ADMIN — SETS

Tabela/lista:

- CAPA
- TÍTULO
- GÊNERO
- DURAÇÃO
- PLATAFORMA
- STATUS
- AÇÕES

Botão:
**+ NOVO SET**

Campos:

- título
- subtítulo
- gênero
- duração
- plataforma
- URL
- Embed URL
- capa
- ativo

---

# 27. ADMIN — SOBRE

Separar:

- título da seção;
- texto;
- imagem;
- estatísticas.

Não usar apenas um textarea gigante.

---

# 28. CONTROLE DE PUBLICAÇÃO

Para:

- agenda;
- eventos;
- sets;
- estatísticas;
- redes.

Usar `enabled boolean`.

Permitir ocultar sem apagar.

---

# 29. REORDENAÇÃO

Usar `position integer`.

Permitir reorganização por:

- drag and drop;
ou
- botões ↑ ↓.

Evitar dependência pesada sem necessidade.

---

# 30. MODELO DE BANCO

Criar tabelas equivalentes:

- User
- SiteSettings
- SectionSettings
- SocialLink
- AgendaItem
- RecentEvent
- RecentEventImage
- SetItem
- AboutSection
- AboutStat
- Media

`SectionSettings` pode armazenar títulos, subtítulos e CTAs editáveis de cada seção.

---

# 31. SITE SETTINGS

Campos possíveis:

- id
- realName
- location
- country
- tagline
- heroImage
- bookingUrl
- whatsappEnabled
- whatsappPhone
- whatsappMessage
- whatsappButtonText
- createdAt
- updatedAt

O nome artístico/logo LENT não precisa ser configurável.

---

# 32. SOCIAL LINK

- id
- platform
- url
- enabled
- position
- createdAt
- updatedAt

---

# 33. AGENDA ITEM

- id
- eventDate
- title
- venue
- city
- state
- country
- status
- ticketUrl
- enabled
- position
- createdAt
- updatedAt

---

# 34. RECENT EVENT

- id
- title
- subtitle
- description
- eventDate
- city
- state
- coverImage
- enabled
- position
- createdAt
- updatedAt

---

# 35. RECENT EVENT IMAGE

- id
- eventId
- imageUrl
- position

---

# 36. SET ITEM

- id
- title
- subtitle
- genre
- duration
- platform
- coverImage
- embedUrl
- externalUrl
- enabled
- position
- createdAt
- updatedAt

---

# 37. ABOUT SECTION

- id
- title
- body
- imageUrl
- enabled
- createdAt
- updatedAt

---

# 38. ABOUT STAT

- id
- value
- label
- enabled
- position

---

# 39. MEDIA

Campos:

- id
- filename
- originalName
- mimeType
- size
- url
- createdAt

Nunca confiar apenas na extensão enviada pelo navegador.

---

# 40. UPLOADS

Upload seguro.

Limite recomendado:
10 MB por imagem.

Validar MIME.

Aceitar apenas formatos permitidos.

Renomear arquivos com UUID.

Evitar path traversal.

---

# 41. RESPONSIVIDADE

Excelente em:

- desktop;
- notebook;
- tablet;
- mobile.

Mobile deve reorganizar, não apenas reduzir.

Hero mobile:

- foto;
- logo;
- texto;
- redes;
- WhatsApp.

Quadrantes:
1 coluna.

Sobre:

- imagem;
- texto;
- estatísticas.

---

# 42. ACESSIBILIDADE

Implementar:

- alt;
- labels;
- focus states;
- teclado;
- contraste;
- aria-label;
- aria-hidden em decorativos.

---

# 43. SEO

Implementar:

- metadata Next.js;
- title;
- description;
- OpenGraph;
- Twitter card;
- favicon;
- canonical;
- sitemap.xml;
- robots.txt.

Exemplo:
`LENT | DJ & Producer`

---

# 44. PERFORMANCE

Evitar:

- bibliotecas gigantes;
- JavaScript desnecessário;
- vídeos automáticos pesados;
- imagens enormes sem otimização.

Usar:

- next/image;
- lazy loading;
- WebP/AVIF quando disponível.

---

# 45. ANIMAÇÕES

Discretas:

- fade;
- reveal;
- micro-interactions;
- hover;
- scale mínimo;
- parallax sutil.

Não usar:

- partículas aleatórias;
- neon excessivo;
- animação que prejudique leitura.

---

# 46. ESTADOS VAZIOS

Se nenhum compromisso:
**Novas datas em breve.**

Se não houver sets/eventos/redes:
não quebrar layout.

---

# 47. FEEDBACK ADMIN

Ao salvar:
**Alterações salvas com sucesso.**

Ao excluir:
pedir confirmação.

---

# 48. AUTO-SAVE

Não implementar inicialmente.

Usar botão explícito:
**SALVAR ALTERAÇÕES**

---

# 49. PREVIEW

Criar botão:
**Ver site**

abrindo nova aba.

---

# 50. ARQUITETURA

Separar:

- UI;
- domínio;
- persistência;
- storage;
- autenticação.

Evitar lógica de banco dentro de componentes de apresentação.

---

# 51. COMPONENTES SUGERIDOS

Public:

- Header
- Hero
- ArtistLogo
- SocialLinks
- WhatsappCTA
- HomeCards
- AgendaCard
- RecentEventsCard
- SetsCard
- AboutSection
- Footer

Admin:

- AdminSidebar
- AdminHeader
- FormCard
- ImageUploader
- SocialLinksEditor
- AgendaEditor
- RecentEventsEditor
- SetsEditor
- AboutEditor
- Toggle
- ConfirmDialog

---

# 52. DESIGN SYSTEM

Criar tokens:

- --background
- --background-elevated
- --surface
- --surface-hover
- --border
- --text
- --text-muted
- --accent
- --danger

Não espalhar HEX aleatório.

---

# 53. COMPONENTIZAÇÃO

Não transformar tudo em um `page.tsx`.

Evitar componentes gigantes.

Evitar abstração excessiva.

---

# 54. SERVER ACTIONS / API

Pode usar Server Actions para CRUD.

Validar entradas no servidor com Zod.

Operações administrativas devem verificar sessão autenticada no servidor.

---

# 55. SEGURANÇA

Obrigatório:

- autenticação;
- senha com hash;
- cookies httpOnly;
- secure em produção;
- SameSite;
- proteção de rotas admin;
- validação de URLs;
- validação de uploads;
- sanitização quando necessário;
- segredos somente no servidor.

Criar `.env.example`.

Nunca versionar credenciais.

---

# 56. DOCKER

Criar:

- Dockerfile
- docker-compose.yml

Serviços:

- web
- postgres

Volumes persistentes:

- PostgreSQL
- uploads

Deploy/restart não pode apagar imagens.

---

# 57. COOLIFY

Compatível com Coolify.

Criar:
`docs/DEPLOY.md`

Documentar:

- variáveis;
- database;
- volumes;
- build;
- start;
- migrations;
- seed;
- backup.

---

# 58. SEED

Seed inicial com dados de demonstração:

Hero:

- João Quaresma
- Belo Horizonte / Brasil
- MUSIC / PARTY / CULTURE

Agenda:

- LOST IN
- UNDERGROUND
- TECH SESSION

Sets demonstrativos:

- Lost in Set
- Warm Up
- Private Set

Todo conteúdo deve ser editável/removível.

---

# 59. FOTOGRAFIA

Usar como fotografia inicial:

`docs/reference/lent-original.jpg`

Não modificar o rosto.

Não gerar outra pessoa.

Não substituir por banco de imagens.

Preservar a fotografia real.

Aplicar apenas crop/posição por CSS.

---

# 60. CROPPING

Hero:
`object-fit: cover`.

Se simples, permitir ajustar:

- objectPositionX
- objectPositionY

Não criar editor complexo.

---

# 61. LOGO

Logo LENT:

- mesma proporção;
- não esticar;
- não editável;
- não removível.

---

# 62. FORA DO ESCOPO DA PRIMEIRA FASE

Não implementar agora:

- multi-artista;
- assinatura SaaS;
- pagamentos;
- marketplace;
- venda de ingresso;
- chat;
- CRM;
- newsletter complexa;
- analytics próprios;
- app mobile;
- editor drag-and-drop completo;
- mudança de template.

Preparar código para evolução futura, sem introduzir complexidade desnecessária.

---

# 63. EXPERIÊNCIA DO ARTISTA

O artista deve conseguir sozinho:

- trocar foto principal;
- alterar informações;
- alterar localização;
- alterar tagline;
- configurar WhatsApp;
- alterar URLs das redes;
- ativar/desativar redes;
- adicionar compromissos;
- editar compromissos;
- excluir compromissos;
- adicionar eventos anteriores;
- enviar fotos;
- adicionar SETs;
- alterar Sobre;
- alterar estatísticas.

Sem editar código.

---

# 64. O QUE NÃO PODE ALTERAR

Não permitir alterar:

- estrutura;
- tipografia;
- CSS;
- logo LENT;
- grid;
- breakpoints;
- design system;
- posição arbitrária de componentes.

---

# 65. CRITÉRIO VISUAL

Ao abrir o projeto:

Deve transmitir:

- DJ profissional;
- underground;
- premium;
- black piano;
- identidade musical;
- design editorial.

Não pode parecer:

- dashboard corporativo genérico;
- template WordPress;
- landing page genérica;
- site SaaS.

---

# 66. ORGANIZAÇÃO ESPERADA

Estrutura aproximada:

```text
src/
  app/
    (public)/
    admin/
    api/
  components/
    public/
    admin/
    ui/
  lib/
    auth/
    db/
    storage/
    validations/
  services/
  types/

prisma/
  schema.prisma
  seed.ts

public/
  brand/
  uploads/

docs/
  ARCHITECTURE.md
  DEPLOY.md
  ADMIN.md
```

---

# 67. DOCUMENTAÇÃO

Criar `README.md`.

Criar `docs/ADMIN.md` explicando para usuário não técnico:

- trocar foto;
- editar agenda;
- adicionar evento;
- adicionar set;
- alterar redes;
- editar WhatsApp.

---

# 68. TESTES MÍNIMOS

Criar testes principalmente para:

- validações;
- URLs;
- autenticação;
- CRUD crítico.

Executar:

- lint;
- typecheck;
- build.

---

# 69. FLUXO DE IMPLEMENTAÇÃO

Antes de programar:

1. analisar repositório;
2. ler documentação;
3. identificar stack atual;
4. preservar funcionalidades existentes;
5. criar plano;
6. listar arquivos a criar/alterar;
7. só então implementar.

Fases:

1. estrutura + banco + autenticação;
2. site público;
3. painel administrativo;
4. uploads;
5. integração CMS → frontend;
6. responsividade;
7. Docker/Coolify;
8. testes e documentação.

---

# 70. REGRAS PARA O CODEX

Não parar em wireframe.

Não entregar somente HTML estático.

Não hardcodar dados que deveriam vir do banco.

Não declarar como pronto algo não implementado.

Não substituir o design aprovado.

Não alterar a identidade visual por preferência própria.

Não usar lorem ipsum.

Não deixar TODOs importantes.

Não ignorar mobile.

Não ignorar persistência.

Não deixar mocks no resultado final.

Implementar produto funcional de ponta a ponta.

---

# 71. RESULTADO ESPERADO

O resultado deve parecer um produto criado especificamente para LENT.

Prioridades:

1. fidelidade visual;
2. simplicidade administrativa;
3. estabilidade;
4. performance;
5. experiência mobile;
6. facilidade de manutenção.
