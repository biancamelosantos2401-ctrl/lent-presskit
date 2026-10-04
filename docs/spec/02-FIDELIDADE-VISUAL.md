# REGRA DE FIDELIDADE VISUAL — OBRIGATÓRIA

A imagem:

`docs/reference/site-admin-reference.png`

é o **DESIGN MASTER** deste projeto.

Ela não é uma inspiração.
Ela não é apenas uma referência de estilo.

**ELA DEFINE A INTERFACE.**

A implementação deve reproduzir sua composição visual com alta fidelidade.

Não reinterpretar layouts.

Não alterar proporções por preferência própria.

Não criar uma versão "inspirada".

Quando esta especificação e uma decisão estética do agente entrarem em conflito, a imagem de referência prevalece.

---

# 1. DESIGN SYSTEM BLOQUEADO

Utilizar:

- Background: `#050505`
- Surface: `#0A0B0B`
- Surface Elevated: `#101212`
- Border: `rgba(255,255,255,0.12)`
- Text Primary: `#F5F5F3`
- Text Secondary: `#9B9D99`
- Accent: `#B7FF3C`
- Danger: `#FF4141`

Não criar novas cores de destaque sem necessidade.

---

# 2. TIPOGRAFIA BLOQUEADA

Display / títulos:
**Bebas Neue**

Interface / texto:
**Barlow Condensed**

Fallback:
`Arial Narrow, sans-serif`

Não substituir por Inter, Roboto, Poppins ou fonte SaaS genérica.

---

# 3. GRID PÚBLICO — DESKTOP

Container máximo aproximado:
`1600px`

Desktop principal:
grid de 12 colunas.

Hero:
altura aproximada de `620–700px`.

Não transformar o Hero em uma seção simples centralizada.

A composição deve se aproximar de:

```text
┌─────────────────────────────────────────────┐
│ HEADER                                      │
├─────────────────────────────────────────────┤
│                                             │
│ LENT                     FOTO DO ARTISTA    │
│ JOÃO QUARESMA                               │
│ tagline                                     │
│                                             │
│ redes                    WhatsApp           │
│                                             │
├─────────────┬──────────────┬────────────────┤
│ AGENDA      │ ÚLT. EVENTOS │ SETS           │
│             │              │                │
└─────────────┴──────────────┴────────────────┘
│ SOBRE                                       │
└─────────────────────────────────────────────┘
```

A fotografia domina visualmente o Hero.

O conteúdo não fica em um card central.

---

# 4. ARTE LENT

O logo/arte LENT deve ser asset independente.

Nunca recriar usando HTML/CSS.

Nunca substituir por:

`<h1>LENT</h1>`

Utilizar:

- `/public/brand/lent-logo.png`
ou
- `/public/brand/lent-logo.svg`

A arte deve conter:

- LENT
- pincelada verde

Ela é fixa e bloqueada no CMS.

---

# 5. HERO

A fotografia deve ocupar aproximadamente 55–65% da largura visual.

A identidade textual ocupa aproximadamente 35–45%.

Evitar aparência de duas colunas rígidas.

Aplicar overlays e gradientes para integrar foto e fundo preto.

A localização:

BELO HORIZONTE
BRASIL

permanece pequena no lado direito superior da composição.

As redes ficam abaixo da tagline.

O botão WhatsApp fica próximo às redes, conforme referência.

---

# 6. QUADRANTES

Desktop:

`display: grid;`
`grid-template-columns: repeat(3, 1fr);`

Gap aproximado:
`14–18px`.

Os três cards devem ter a mesma altura.

Visual:

- background quase preto;
- border fina;
- radius discreto;
- sem sombras SaaS exageradas.

---

# 7. CARD AGENDA

Estrutura:

```text
AGENDA
PRÓXIMOS COMPROMISSOS

24 | LOST IN
OUT| Local 299
   | Belo Horizonte / MG

08 | ...
NOV|

21 | ...
NOV|

[ VER AGENDA COMPLETA → ]
```

Datas grandes à esquerda.

Informações no centro.

Status pequeno à direita.

---

# 8. CARD ÚLTIMOS EVENTOS

Estrutura:

```text
ÚLTIMOS EVENTOS
REGISTROS RECENTES

[ IMAGEM DESTAQUE GRANDE ]

NOME DO EVENTO       DATA
LOCAL

[thumb] [thumb] [thumb]

[ VER TODOS OS EVENTOS → ]
```

Manter esta hierarquia.

Não transformar automaticamente em carrossel.

Não transformar cada imagem em card independente.

---

# 9. CARD SETS

Estrutura:

```text
SETS
ÚLTIMOS LANÇAMENTOS

[img] ▶ Nome do Set
        gênero       duração
        waveform

[img] ▶ Nome do Set
        gênero       duração
        waveform

[img] ▶ Nome do Set
        gênero       duração
        waveform

[ VER TODOS OS SETS → ]
```

Lista compacta.

Não utilizar cards verticais.

Não utilizar grandes players embedded diretamente nesta tela.

---

# 10. SOBRE

Desktop:

grid aproximado:

- 25% imagem
- 47% texto
- 28% indicadores

Estrutura:

```text
[FOTO] [ SOBRE                        ] [10+] [150+] [20+]
       [ texto do artista             ] [ANOS][EVENTOS][CIDADES]
```

A seção deve parecer uma única faixa horizontal.

Não criar três cards independentes.

---

# 11. ADMIN — COMPOSIÇÃO VISUAL

O painel administrativo deve se aproximar da referência.

Sidebar fixa à esquerda:
aproximadamente `220px`.

Conteúdo principal:
cards escuros e compactos.

Não criar dashboard SaaS com muito espaço vazio.

Utilizar densidade semelhante à imagem.

Elementos podem compartilhar a mesma tela quando fizer sentido.

Exemplo Hero:

```text
┌──────────────────────────────────────────────────────┐
│ Hero / Identidade                    [SALVAR]        │
├───────────────────────┬──────────────────────────────┤
│ IMAGEM HERO           │ IDENTIDADE FIXA LENT        │
│ preview               │ logo                         │
│ trocar / remover      │ 🔒 não editável             │
└───────────────────────┴──────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ REDES SOCIAIS E PLATAFORMAS                         │
│ Instagram URL                  Ativo [ON]            │
│ SoundCloud URL                 Ativo [ON]            │
│ Spotify URL                    Ativo [ON]            │
│ YouTube URL                    Ativo [ON]            │
│ TikTok URL                     Ativo [ON]            │
└──────────────────────────────────────────────────────┘
```

---

# 12. PROIBIDO VISUALMENTE

Não usar visual padrão de:

- Bootstrap;
- Material UI;
- shadcn sem customização profunda;
- cards brancos;
- gradientes coloridos aleatórios;
- blur excessivo;
- glassmorphism forte;
- sombras grandes;
- bordas muito arredondadas;
- fontes arredondadas;
- layout SaaS;
- dashboard corporativo azul;
- ícones coloridos;
- excesso de verde neon.

O site deve permanecer majoritariamente:

**PRETO + BRANCO**

com **VERDE** apenas como accent.

---

# 13. RESPONSIVIDADE SEM DESCARACTERIZAR

No mobile:

- preservar identidade;
- preservar hierarquia;
- não simplesmente reduzir desktop;
- reorganizar elementos;
- manter LENT em destaque;
- manter foto do artista dominante;
- empilhar os três quadrantes;
- manter CTA WhatsApp acessível;
- manter leitura limpa.

---

# 14. REGRA FINAL

A imagem aprovada é o alvo.

Antes de concluir:

1. renderizar a tela pública;
2. renderizar o painel;
3. comparar com `site-admin-reference.png`;
4. corrigir diferenças de:
   - grid;
   - proporção;
   - tipografia;
   - espaçamento;
   - densidade;
   - alinhamento;
   - bordas;
   - contraste;
   - composição.

Não considerar a UI concluída enquanto estiver apenas "parecida".
