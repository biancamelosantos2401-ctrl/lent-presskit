# CRITÉRIOS DE ACEITE — LENT

O projeto somente pode ser considerado concluído quando todos os pontos abaixo estiverem atendidos.

## Site público

- [ ] Site carrega corretamente.
- [ ] UI segue o design master.
- [ ] Header fiel à referência.
- [ ] Arte LENT fixa.
- [ ] Fotografia do artista corretamente aplicada.
- [ ] Nome real, localização e tagline vêm do banco.
- [ ] Redes sociais vêm do banco.
- [ ] Redes desabilitadas não aparecem.
- [ ] Links abrem URLs corretas.
- [ ] WhatsApp funciona.
- [ ] Agenda funciona.
- [ ] Últimos Eventos funciona.
- [ ] Sets funciona.
- [ ] Sobre funciona.
- [ ] Estatísticas funcionam.
- [ ] Site responsivo.

## Painel administrativo

- [ ] Login real.
- [ ] Rotas protegidas.
- [ ] Alteração da foto Hero.
- [ ] Edição de dados do Hero.
- [ ] Logo LENT bloqueado.
- [ ] Gerenciamento de redes.
- [ ] Habilitar/desabilitar redes.
- [ ] Gerenciamento da Agenda.
- [ ] Gerenciamento de Últimos Eventos.
- [ ] Upload de imagens de eventos.
- [ ] Gerenciamento de Sets.
- [ ] Gerenciamento do Sobre.
- [ ] Gerenciamento das estatísticas.
- [ ] Configuração do WhatsApp.
- [ ] Feedback de sucesso/erro.
- [ ] Confirmação para exclusões.

## Persistência

- [ ] PostgreSQL funcionando.
- [ ] Prisma migrations funcionando.
- [ ] Dados persistem após restart.
- [ ] Uploads persistem após restart/deploy.
- [ ] Seed inicial disponível.

## Segurança

- [ ] Senha com hash.
- [ ] Sessão protegida.
- [ ] Validação Zod no servidor.
- [ ] URLs validadas.
- [ ] Uploads validados.
- [ ] Credenciais fora do repositório.
- [ ] `.env.example` criado.

## Deploy

- [ ] Dockerfile.
- [ ] docker-compose.yml.
- [ ] Volumes persistentes.
- [ ] Compatível com Coolify.
- [ ] `docs/DEPLOY.md`.

## Qualidade

- [ ] Lint passa.
- [ ] Typecheck passa.
- [ ] Testes passam.
- [ ] Build passa.
- [ ] Sem TODO crítico.
- [ ] Sem lorem ipsum.
- [ ] Sem mocks permanentes.
- [ ] Sem dados importantes hardcoded.

## Fidelidade visual

- [ ] Black piano dominante.
- [ ] Verde usado apenas como accent.
- [ ] Bebas Neue nos títulos.
- [ ] Barlow Condensed na interface/textos.
- [ ] Hero com proporções próximas ao design master.
- [ ] Três quadrantes com mesma altura visual.
- [ ] Agenda com datas grandes à esquerda.
- [ ] Últimos Eventos com imagem principal + miniaturas.
- [ ] Sets em lista compacta com thumbnail/play/waveform.
- [ ] Sobre em faixa horizontal.
- [ ] Admin compacto, escuro e editorial.
- [ ] Não parece template SaaS genérico.

## Definição final

Se uma funcionalidade existe no painel, ela deve refletir no site público.

Se uma opção está desabilitada, ela não deve aparecer no site público.

O administrador altera conteúdo.

O sistema preserva o design.
