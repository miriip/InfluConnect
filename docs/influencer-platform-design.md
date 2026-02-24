# INFLUCONNECT — Plataforma de Influencer Marketing
## Documento de Arquitectura, Diseño y Estrategia

---

# 1. MAPA DEL SITIO (Arquitectura de Información)

## 1.1 Estructura General

```
INFLUCONNECT
│
├── PÚBLICO (Sin autenticación)
│   ├── Home (Landing principal)
│   ├── Cómo Funciona
│   ├── Para Influencers
│   ├── Para Empresas
│   ├── Catálogo de Influencers (Vista limitada)
│   ├── Pricing / Comisiones
│   ├── Casos de Éxito / Testimonios
│   ├── FAQ
│   ├── Contacto / Soporte
│   ├── Blog (opcional MVP+)
│   └── Legales
│       ├── Términos y Condiciones
│       ├── Política de Privacidad
│       └── Política de Cookies
│
├── AUTENTICACIÓN
│   ├── Login (selección de rol)
│   ├── Registro Influencer
│   ├── Registro Empresa
│   ├── Recuperar Contraseña
│   └── Verificación de Email
│
├── DASHBOARD INFLUENCER (Protegido)
│   ├── Overview / Home del dashboard
│   ├── Mi Perfil
│   │   ├── Información general
│   │   ├── Redes Sociales
│   │   ├── Métricas y Estadísticas
│   │   ├── Media Kit / Portfolio
│   │   └── Tarifas y Paquetes
│   ├── Solicitudes de Campaña
│   │   ├── Pendientes
│   │   ├── En Negociación
│   │   └── Historial
│   ├── Mis Campañas
│   │   ├── Activas
│   │   ├── Completadas
│   │   └── Calendario
│   ├── Mensajes / Chat
│   ├── Pagos y Facturación
│   └── Configuración
│
├── DASHBOARD EMPRESA (Protegido)
│   ├── Overview / Home del dashboard
│   ├── Perfil de Empresa
│   ├── Buscar Influencers
│   │   ├── Buscador con filtros
│   │   ├── Guardados / Listas
│   │   └── Comparar
│   ├── Mis Campañas
│   │   ├── Crear nueva
│   │   ├── Activas
│   │   ├── Borradores
│   │   └── Completadas
│   ├── Propuestas Enviadas
│   ├── Pagos y Facturación
│   ├── Mensajes / Chat
│   └── Configuración
│
└── DASHBOARD ADMIN (Protegido)
    ├── Overview / Métricas globales
    ├── Gestión de Usuarios
    │   ├── Influencers (aprobar/verificar)
    │   └── Empresas (aprobar/verificar)
    ├── Moderación
    │   ├── Perfiles reportados
    │   └── Contenido reportado
    ├── Gestión de Comisiones
    │   ├── Configurar porcentajes
    │   ├── Transacciones
    │   └── Reportes financieros
    ├── Soporte / Tickets
    ├── Gestión de Contenido
    │   ├── FAQ
    │   ├── Testimonios
    │   └── Blog
    └── Configuración del Sistema
```

---

# 2. WIREFRAMES TEXTUALES

## 2.1 HOME (Landing Principal)

### Sección 1: Hero
- **Layout**: Full-width, altura 100vh, fondo degradado oscuro con imagen sutil
- **Contenido**:
  - Navbar fijo: Logo (izq) | Links: Cómo funciona, Para Influencers, Para Empresas, Pricing | Login / Registro (der)
  - Headline principal: "Conectamos marcas con el influencer perfecto"
  - Subheadline: "La plataforma premium donde las empresas encuentran creadores verificados y los influencers acceden a oportunidades de alto valor"
  - Dos CTAs prominentes:
    - CTA Primario: "Soy Influencer" (fondo dorado/blanco)
    - CTA Secundario: "Soy Empresa" (borde blanco, transparente)
  - Stats de confianza debajo: "+5,000 influencers verificados | +500 marcas activas | $2M+ en transacciones"
  - Scroll indicator animado

### Sección 2: Social Proof / Logos
- **Layout**: Carrusel infinito de logos de marcas (grises, hover a color)
- **Texto**: "Confían en nosotras"

### Sección 3: Propuesta de Valor Dual
- **Layout**: Dos cards lado a lado (responsive: stacked en móvil)
- **Card Influencers**:
  - Icono: Estrella/verificado
  - Título: "Para Influencers"
  - Bullets: Acceso a marcas premium, tarifas justas, pagos garantizados, contratos claros
  - CTA: "Crear mi perfil"
- **Card Empresas**:
  - Icono: Edificio/gráfico
  - Título: "Para Empresas"
  - Bullets: Búsqueda avanzada con filtros, influencers verificados, escrow seguro, métricas reales
  - CTA: "Encontrar influencers"

### Sección 4: Cómo Funciona (Timeline)
- **Layout**: Línea de tiempo horizontal (vertical en móvil)
- **Pasos**:
  1. "Regístrate y verifica tu cuenta" (icono: usuario + check)
  2. "Completa tu perfil o busca el match" (icono: búsqueda)
  3. "Negocia y acuerda términos" (icono: handshake)
  4. "Ejecuta la campaña con respaldo" (icono: cohete)
  5. "Recibe pago de forma segura" (icono: escudo + dinero)

### Sección 5: Catálogo Preview
- **Layout**: Grid de 6 tarjetas de influencers (datos públicos: foto, nombre, categoría, seguidores, engagement)
- **Texto**: "Descubre talento verificado"
- **CTA**: "Ver catálogo completo"

### Sección 6: Testimonios
- **Layout**: Carrusel de 3 testimonios visibles (1 en móvil)
- **Estructura**: Foto, nombre, rol, estrellas, texto, marca/influencer asociado

### Sección 7: Seguridad y Confianza
- **Layout**: Grid de 4 íconos con texto
- **Elementos**:
  - "Verificación de identidad" (icono: escudo)
  - "Pagos protegidos" (icono: candado)
  - "Contratos claros" (icono: documento)
  - "Soporte 24/7" (icono: chat)

### Sección 8: Pricing Preview
- **Layout**: Card central con información de comisión
- **Texto**: "Sin costos fijos. Solo pagas cuando cierras un trato."
- **CTA**: "Ver detalles de comisiones"

### Sección 9: CTA Final
- **Layout**: Fondo oscuro con gradiente
- **Texto**: "¿Listo para empezar?"
- **Dos botones grandes**: "Registrarme como Influencer" / "Registrarme como Empresa"

### Sección 10: Footer
- **Layout**: 4 columnas
  - Logo + tagline + redes sociales
  - Links: Para Influencers, Para Empresas, Pricing, FAQ
  - Links: Legales, Contacto, Blog
  - Newsletter: "Recibe tips de influencer marketing"
- **Bottom bar**: Copyright | Políticas

---

## 2.2 CÓMO FUNCIONA

### Sección 1: Header
- Título: "Cómo funciona InfluConnect"
- Subtítulo: "El proceso simple y seguro para conectar marcas con creadores"
- Tabs: "Para Influencers" / "Para Empresas"

### Sección 2: Timeline Detallado (según tab seleccionado)

**Para Influencers:**
1. "Crea tu perfil profesional" — Completa tu información, redes y tarifas
2. "Pasa la verificación" — Validamos tu identidad y cuentas
3. "Recibe solicitudes" — Las marcas te contactan con propuestas
4. "Negocia términos" — Ajusta alcance, entregables y precio
5. "Ejecuta y cobra" — Entrega el contenido y recibe pago seguro

**Para Empresas:**
1. "Registra tu empresa" — Crea tu perfil corporativo
2. "Busca influencers" — Filtra por nicho, audiencia, ubicación, presupuesto
3. "Envía propuestas" — Define tu brief y alcance
4. "Negocia y confirma" — Acuerda términos con el influencer
5. "Paga y mide" — Ejecuta campaña con seguimiento de resultados

### Sección 3: Video/Ilustración
- Demo animada o video explicativo

### Sección 4: FAQ Rápido
- 5 preguntas frecuentes acordeón

### Sección 5: CTA
- Botones de registro según tab activo

---

## 2.3 PARA INFLUENCERS

### Sección 1: Hero
- Headline: "Monetiza tu influencia con marcas de calidad"
- Subheadline: "Accede a oportunidades pagadas, negocia tus tarifas y recibe pagos seguros"
- CTA: "Crear perfil gratis"
- Imagen: Mockup de dashboard o foto de influencer trabajando

### Sección 2: Beneficios
- Grid de 6 beneficios con íconos:
  1. "Perfil profesional gratuito"
  2. "Marcas que pagan bien"
  3. "Contratos claros"
  4. "Pagos garantizados"
  5. "Tú controlas tus tarifas"
  6. "Soporte dedicado"

### Sección 3: Cómo te protegemos
- Lista de seguridades: Verificación de marcas, escrow de pagos, contratos legales, resolución de disputas

### Sección 4: Requisitos
- Qué necesitas: +5,000 seguidores en alguna red, contenido original, engagement real

### Sección 5: Testimonios de influencers
- 3 casos de éxito con fotos y métricas

### Sección 6: CTA Final
- "Únete a +5,000 influencers verificados"
- Formulario rápido: Email + Red social principal

---

## 2.4 PARA EMPRESAS

### Sección 1: Hero
- Headline: "Encuentra el influencer perfecto para tu marca"
- Subheadline: "Búsqueda avanzada, influencers verificados y campañas sin complicaciones"
- CTA: "Buscar influencers"
- Imagen: Dashboard de búsqueda o collage de influencers

### Sección 2: Beneficios
- Grid de 6 beneficios:
  1. "Filtros avanzados de búsqueda"
  2. "Perfiles verificados y métricas reales"
  3. "Escrow de pagos seguro"
  4. "Gestión de campañas integrada"
  5. "Reportes de resultados"
  6. "Soporte estratégico"

### Sección 3: Proceso de búsqueda
- Ilustración del flujo: Filtros → Preview → Contacto → Negociación → Campaña

### Sección 4: Tipos de campañas
- Cards: Stories, Posts, Reels, Videos largos, Embajadores de marca

### Sección 5: Casos de éxito de marcas
- Logos + resultados (alcance, engagement, ROI)

### Sección 6: CTA
- "Empieza tu primera campaña"
- Formulario: Email empresa + rubro

---

## 2.5 CATÁLOGO DE INFLUENCERS (Público limitado)

### Sección 1: Header
- Título: "Descubre talento verificado"
- Buscador simple (nombre o categoría)

### Sección 2: Filtros básicos
- Categoría (dropdown)
- País (dropdown)
- Rango de seguidores (slider)

### Sección 3: Grid de resultados
- Tarjeta por influencer:
  - Foto de perfil
  - Nombre / alias
  - Badge de verificación
  - Categorías (tags)
  - Redes con seguidores
  - Engagement rate
  - "Ver perfil" (lleva a login/registro para ver completo)

### Sección 4: CTA
- "Accede al catálogo completo con +5,000 influencers"
- Botones de registro

---

## 2.6 PRICING / COMISIONES

### Sección 1: Header
- Título: "Transparencia total en costos"
- Subtítulo: "Sin suscripciones. Solo pagas cuando generas valor."

### Sección 2: Estructura de comisiones
- Tabla comparativa:
  - Para Influencers: Gratis registrarse, comisión del 10% sobre cada campaña
  - Para Empresas: Gratis buscar, comisión del 5% sobre cada campaña
  - Total: 15% de comisión dividida entre ambas partes

### Sección 3: Ejemplo práctico
- Calculadora interactiva:
  - Input: Monto de campaña
  - Output: Influencer recibe X, plataforma recibe Y

### Sección 4: Qué incluye
- Lista de servicios incluidos en la comisión

### Sección 5: Comparativa con alternativas
- Tabla vs agencias tradicionales vs otras plataformas

### Sección 6: FAQ de pagos

---

## 2.7 DASHBOARD INFLUENCER

### Layout General
- Sidebar izquierda (colapsable en móvil)
- Header con notificaciones y perfil
- Área de contenido principal

### Sidebar Navigation
- Overview (icono: home)
- Mi Perfil (icono: usuario)
- Solicitudes (icono: sobre) — con badge de contador
- Mis Campañas (icono: briefcase)
- Mensajes (icono: chat) — con badge
- Pagos (icono: tarjeta)
- Configuración (icono: engranaje)

### Pantalla: Overview
- Stats cards: Solicitudes pendientes, Campañas activas, Ingresos este mes, Rating
- Gráfico: Ingresos últimos 6 meses
- Lista: Solicitudes recientes (3)
- Calendario: Próximas entregas
- Alertas: Verificaciones pendientes

### Pantalla: Mi Perfil
- Tabs: General, Redes, Portfolio, Tarifas
- **General**: Formulario con foto, nombre, bio, ubicación, idiomas, categorías
- **Redes**: Conectar Instagram, TikTok, YouTube, Twitch + mostrar métricas
- **Portfolio**: Subir imágenes/links de trabajos anteriores
- **Tarifas**: Tabla editable con tipos de contenido y precios

### Pantalla: Solicitudes
- Tabs: Nuevas, En Negociación, Aceptadas, Rechazadas
- Card por solicitud: Marca, campaña, presupuesto, fechas, botones Aceptar/Negociar/Rechazar

### Pantalla: Mis Campañas
- Tabs: Activas, Completadas, Canceladas
- Card por campaña: Estado (badge color), marca, entregables, fechas, progreso

### Pantalla: Pagos
- Tabla: Campaña, monto, fecha, estado (pendiente/procesado)
- Resumen: Total ganado, pendiente, comisiones pagadas
- Botón: Descargar facturas

---

## 2.8 DASHBOARD EMPRESA

### Layout General
- Similar al dashboard influencer

### Sidebar Navigation
- Overview
- Perfil Empresa
- Buscar Influencers
- Mis Campañas
- Propuestas Enviadas
- Mensajes
- Pagos
- Configuración

### Pantalla: Overview
- Stats: Influencers guardados, Campañas activas, Campañas completadas, Invertido este mes
- Gráfico: Inversión vs ROI
- Lista: Campañas próximas a vencer
- Recomendaciones: Influencers sugeridos

### Pantalla: Buscar Influencers
- Barra de búsqueda
- Filtros avanzados (sidebar):
  - Categoría (checkboxes)
  - Ubicación (país/ciudad)
  - Rango de seguidores
  - Engagement rate
  - Plataforma (IG, TT, YT, Twitch)
  - Presupuesto
  - Idiomas
- Grid de resultados con tarjetas completas
- Acciones: Ver perfil, Guardar, Comparar, Enviar propuesta

### Pantalla: Crear Campaña
- Wizard de 3 pasos:
  1. Información general: Nombre, objetivo, descripción
  2. Requisitos: Plataformas, entregables, fechas, presupuesto
  3. Revisión y publicación

### Pantalla: Mis Campañas
- Tabs: Borradores, Activas, Pausadas, Completadas
- Card con: Nombre, estado, influencers participando, progreso, acciones

### Pantalla: Propuestas Enviadas
- Lista con: Influencer, campaña, monto ofrecido, estado (pendiente/aceptada/rechazada/negociando)

---

## 2.9 DASHBOARD ADMIN

### Pantalla: Overview
- KPIs grandes: Usuarios totales, Influencers verificados, Empresas activas, Campañas este mes, Ingresos de comisiones
- Gráficos: Crecimiento de usuarios, Campañas por mes, Ingresos
- Tabla: Últimas transacciones
- Alertas: Usuarios pendientes de verificación, Tickets de soporte

### Pantalla: Gestión de Usuarios
- Tabs: Influencers, Empresas
- Tabla con: Nombre, email, estado, verificación, fecha registro, acciones
- Filtros: Por estado, verificación, fecha
- Acciones: Ver perfil, Aprobar/Rechazar, Suspender, Enviar mensaje

### Pantalla: Moderación
- Tabs: Perfiles reportados, Contenido reportado, Reviews
- Tabla con reportes y acciones de resolución

### Pantalla: Gestión de Comisiones
- Configurar porcentajes globales
- Tabla de transacciones con filtros
- Exportar reportes financieros

### Pantalla: Soporte
- Sistema de tickets
- Estado: Abierto, En progreso, Resuelto
- Asignación a agentes

---

# 3. DISEÑO VISUAL (UI System)

## 3.1 Paleta de Colores

### Colores Primarios
- **Negro Premium**: `#0A0A0A` (fondos oscuros)
- **Negro Suave**: `#141414` (cards, elevaciones)
- **Gris Oscuro**: `#1E1E1E` (hover states, separaciones)

### Colores Secundarios
- **Blanco Puro**: `#FFFFFF` (texto principal)
- **Blanco Suave**: `#F5F5F5` (texto secundario)
- **Gris Medio**: `#8A8A8A` (texto terciario, placeholders)
- **Gris Claro**: `#2A2A2A` (bordes sutiles)

### Color de Acento (Dorado Premium)
- **Dorado Principal**: `#D4AF37` (CTAs principales, badges premium)
- **Dorado Claro**: `#E5C76B` (hover states)
- **Dorado Oscuro**: `#B8941F` (active states)
- **Dorado Transparente**: `rgba(212, 175, 55, 0.1)` (backgrounds de acento)

### Colores de Estado
- **Éxito**: `#22C55E`
- **Advertencia**: `#F59E0B`
- **Error**: `#EF4444`
- **Info**: `#3B82F6`

### Gradientes
- **Hero**: `linear-gradient(135deg, #0A0A0A 0%, #1E1E1E 50%, #0A0A0A 100%)`
- **Acento Dorado**: `linear-gradient(135deg, #D4AF37 0%, #E5C76B 50%, #D4AF37 100%)`
- **Card Hover**: `linear-gradient(180deg, rgba(212,175,55,0.05) 0%, transparent 100%)`

## 3.2 Tipografías

### Familia Principal
- **Headings**: `Inter` o `Satoshi` (moderna, geométrica)
- **Body**: `Inter` (legible, profesional)
- **Accent/Display**: `Playfair Display` (para títulos hero elegantes)

### Escala Tipográfica
| Elemento | Tamaño | Peso | Line-height | Letter-spacing |
|----------|--------|------|-------------|----------------|
| H1 Hero | 64px / 40px móvil | 700 | 1.1 | -0.02em |
| H2 | 48px / 32px móvil | 600 | 1.2 | -0.01em |
| H3 | 32px / 24px móvil | 600 | 1.3 | 0 |
| H4 | 24px / 20px móvil | 500 | 1.4 | 0 |
| Body Large | 18px | 400 | 1.6 | 0 |
| Body | 16px | 400 | 1.6 | 0 |
| Body Small | 14px | 400 | 1.5 | 0 |
| Caption | 12px | 500 | 1.4 | 0.02em |
| Button | 14px | 600 | 1 | 0.02em |

## 3.3 Componentes UI

### Botones

**Primario (Dorado)**
- Background: `#D4AF37`
- Text: `#0A0A0A`
- Border-radius: `8px`
- Padding: `14px 28px`
- Hover: Background `#E5C76B`, transform `translateY(-2px)`
- Shadow hover: `0 4px 20px rgba(212, 175, 55, 0.3)`

**Secundario (Outline)**
- Background: transparent
- Border: `1px solid #FFFFFF`
- Text: `#FFFFFF`
- Hover: Background `rgba(255,255,255,0.1)`

**Terciario (Ghost)**
- Background: transparent
- Text: `#D4AF37`
- Hover: Text `#E5C76B`, underline

### Cards

**Card Base**
- Background: `#141414`
- Border: `1px solid #2A2A2A`
- Border-radius: `16px`
- Padding: `24px`
- Hover: Border color `#D4AF37` (sutil), shadow `0 8px 32px rgba(0,0,0,0.3)`

**Card Premium**
- Border: `1px solid rgba(212,175,55,0.3)`
- Background: `linear-gradient(180deg, rgba(212,175,55,0.05) 0%, #141414 100%)`
- Badge dorado en esquina

### Inputs

**Input Base**
- Background: `#1E1E1E`
- Border: `1px solid #2A2A2A`
- Border-radius: `10px`
- Padding: `14px 16px`
- Text: `#FFFFFF`
- Placeholder: `#8A8A8A`
- Focus: Border `#D4AF37`, shadow `0 0 0 3px rgba(212,175,55,0.1)`

### Badges

**Badge Verificado**
- Background: `rgba(34, 197, 94, 0.1)`
- Border: `1px solid #22C55E`
- Text: `#22C55E`
- Icono: Checkmark
- Border-radius: `20px`

**Badge Premium**
- Background: `rgba(212, 175, 55, 0.1)`
- Border: `1px solid #D4AF37`
- Text: `#D4AF37`
- Icono: Estrella

### Navegación

**Navbar**
- Background: `rgba(10, 10, 10, 0.8)`
- Backdrop-filter: `blur(20px)`
- Border-bottom: `1px solid rgba(255,255,255,0.05)`
- Height: `72px`

**Links**
- Color: `#F5F5F5`
- Hover: `#FFFFFF`
- Active: `#D4AF37`
- Underline animation on hover

## 3.4 Espaciado y Layout

### Sistema de Espaciado
- Base: `4px`
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

### Contenedores
- Max-width: `1280px`
- Padding lateral: `24px` (móvil), `48px` (tablet), `64px` (desktop)

### Grid
- 12-column grid
- Gap: `24px` (desktop), `16px` (móvil)

## 3.5 Animaciones y Microinteracciones

### Transiciones Base
- Duration: `300ms`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

### Scroll Animations
- Fade in + translate Y (20px)
- Stagger delay: `100ms` entre elementos
- Trigger: Cuando elemento entra 20% en viewport

### Hover Effects
- Cards: `translateY(-4px)` + shadow
- Botones: `translateY(-2px)` + glow
- Links: Underline slide in from left
- Imágenes: Scale `1.05` con overflow hidden

### Loading States
- Skeleton: Gradient shimmer animation
- Spinner: Dorado, 2s infinite rotation

---

# 4. COPYWRITING

## 4.1 Home — Textos Principales

### Hero
```
Headline: Conectamos marcas con el influencer perfecto

Subheadline: La plataforma premium donde las empresas encuentran 
creadores verificados y los influencers acceden a oportunidades 
de alto valor, con pagos seguros y contratos claros.

CTA Primario: Soy Influencer →
CTA Secundario: Soy Empresa →

Stats: +5,000 influencers verificados | +500 marcas activas | $2M+ en transacciones seguras
```

### Propuesta de Valor
```
Para Influencers:
"Convierte tu pasión en ingresos consistentes"
- Perfil profesional gratuito que destaca tu valor
- Acceso exclusivo a marcas premium y bien pagadas
- Pagos garantizados antes de entregar contenido
- Contratos claros que protegen tu trabajo
- Tú decides con quién trabajar y a qué precio

CTA: Crear mi perfil profesional

---

Para Empresas:
"Encuentra el creador ideal para tu mensaje"
- Búsqueda avanzada con filtros de nicho, audiencia y presupuesto
- Perfiles verificados con métricas reales y actualizadas
- Sistema de escrow que protege tu inversión
- Gestión integral de campañas desde un solo lugar
- Reportes detallados de resultados e impacto

CTA: Explorar influencers
```

### Cómo Funciona
```
Título: Tu próxima colaboración en 5 pasos simples

1. Regístrate y verifica
   "Crea tu cuenta y validamos tu identidad en minutos"

2. Completa tu perfil o encuentra el match
   "Influencers: muestra tu mejor trabajo. Empresas: filtra por tu criterio ideal."

3. Negocia con confianza
   "Acuerda alcance, entregables y compensación de forma transparente"

4. Ejecuta con respaldo
   "Trabaja con contratos claros y soporte de la plataforma"

5. Recibe pago seguro
   "Influencers cobran garantizado. Empresas pagan solo por resultados."
```

### Seguridad y Confianza
```
Título: Tu seguridad es nuestra prioridad

Verificación de identidad
"Todos los usuarios pasan por un proceso de validación que garantiza perfiles reales"

Pagos protegidos
"Sistema de escrow que retiene el pago hasta la entrega confirmada del trabajo"

Contratos claros
"Plantillas legales que protegen a ambas partes y definen expectativas"

Soporte dedicado
"Equipo de atención listo para resolver cualquier situación 24/7"
```

### CTA Final
```
Título: ¿Listo para transformar tu presencia digital?

Subtítulo: Únete a la comunidad de creadores y marcas que están 
redefiniendo el influencer marketing en español.

Botón 1: Registrarme como Influencer
Botón 2: Registrarme como Empresa

Nota: "Registro gratuito. Sin compromisos."
```

## 4.2 Mensajes de Confianza (Trust Signals)

### Badges y Etiquetas
- "✓ Verificado por InfluConnect"
- "🛡️ Pago protegido"
- "⭐ Influencer Premium"
- "🏢 Empresa verificada"
- "📊 Métricas validadas"

### Microcopy de Seguridad
- "Tu información está protegida con encriptación de nivel bancario"
- "Nunca compartimos tus datos sin tu consentimiento"
- "Pagos procesados por [Stripe/PayPal] con protección al comprador"
- "Contratos revisados por abogados especializados"
- "Soporte en menos de 2 horas en horario laboral"

### Estados y Feedback
- "Perfil verificado exitosamente"
- "Pago retenido en escrow — seguro para ambas partes"
- "Contrato firmado por ambas partes"
- "Entrega confirmada — liberando pago"
- "Campaña completada con éxito"

---

# 5. STACK TECNOLÓGICO

## 5.1 Opción Recomendada (Full Stack Moderno)

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: shadcn/ui + Radix UI
- **Animaciones**: Framer Motion
- **Estado**: Zustand / React Query (TanStack Query)
- **Formularios**: React Hook Form + Zod

### Backend
- **Framework**: Next.js API Routes / Server Actions
- **Base de datos**: PostgreSQL (Supabase o Railway)
- **ORM**: Prisma
- **Autenticación**: NextAuth.js / Auth.js con:
  - Email + Password
  - Google OAuth
  - Instagram Basic Display API
- **Storage**: AWS S3 / Cloudinary (para imágenes y PDFs)
- **Pagos**: Stripe Connect (para marketplace y escrow)
- **Email**: Resend / SendGrid
- **Chat**: Socket.io / Pusher (para mensajería real-time)
- **Búsqueda**: Algolia (para búsqueda avanzada de influencers)

### DevOps
- **Hosting**: Vercel (frontend) + Railway/Render (backend si separado)
- **CI/CD**: GitHub Actions
- **Monitoreo**: Vercel Analytics + LogRocket

## 5.2 Alternativa MVP (Más Simple)

Para un MVP rápido (2-3 meses):

- **Frontend**: Next.js + Tailwind + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Pagos**: Stripe (sin escrow complejo, solo procesamiento)
- **Búsqueda**: PostgreSQL full-text search (sin Algolia)
- **Chat**: Comentarios async (sin real-time)

## 5.3 Arquitectura de Datos (Modelos Principales)

```prisma
// User base
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  role          Role      // INFLUENCER, BRAND, ADMIN
  status        Status    // PENDING, ACTIVE, SUSPENDED
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  influencerProfile InfluencerProfile?
  brandProfile      BrandProfile?
}

// Perfil de Influencer
model InfluencerProfile {
  id          String   @id @default(uuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  
  displayName String
  bio         String?
  location    String?
  languages   String[]
  categories  String[]
  avatar      String?
  isVerified  Boolean  @default(false)
  
  socialAccounts SocialAccount[]
  packages       Package[]
  portfolio      PortfolioItem[]
  
  campaigns      CampaignInfluencer[]
  reviews        Review[]
}

// Redes Sociales
model SocialAccount {
  id           String   @id @default(uuid())
  influencerId String
  platform     Platform // INSTAGRAM, TIKTOK, YOUTUBE, TWITCH
  username     String
  url          String
  followers    Int
  engagement   Float?
  avgViews     Int?
  verified     Boolean  @default(false)
}

// Paquetes de tarifas
model Package {
  id           String   @id @default(uuid())
  influencerId String
  name         String   // "Story", "Post", "Reel", etc.
  description  String?
  price        Decimal
  currency     String   @default("USD")
  deliveryDays Int
}

// Perfil de Empresa
model BrandProfile {
  id          String   @id @default(uuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  
  companyName String
  industry    String
  website     String?
  location    String?
  description String?
  logo        String?
  isVerified  Boolean  @default(false)
  
  campaigns   Campaign[]
}

// Campañas
model Campaign {
  id          String   @id @default(uuid())
  brandId     String
  brand       BrandProfile @relation(fields: [brandId], references: [id])
  
  name        String
  description String
  objective   String
  budget      Decimal
  startDate   DateTime
  endDate     DateTime?
  status      CampaignStatus @default(DRAFT)
  
  requirements CampaignRequirement[]
  influencers  CampaignInfluencer[]
}

// Relación Campaña-Influencer
model CampaignInfluencer {
  id           String   @id @default(uuid())
  campaignId   String
  influencerId String
  
  status       ProposalStatus @default(PENDING)
  agreedPrice  Decimal?
  message      String?
  
  deliverables Deliverable[]
  payment      Payment?
}

// Pagos
model Payment {
  id              String   @id @default(uuid())
  campaignInfId   String   @unique
  
  amount          Decimal
  platformFee     Decimal
  influencerAmount Decimal
  status          PaymentStatus @default(PENDING)
  
  stripePaymentId String?
  paidAt          DateTime?
}
```

---

# 6. ROADMAP: MVP vs FUTURO

## 6.1 Fase 1: MVP (Meses 1-3)

### Objetivo
Plataforma funcional básica que permita:
- Registro y verificación de usuarios
- Creación de perfiles básicos
- Búsqueda y contacto entre partes
- Gestión simple de campañas
- Procesamiento de pagos básico

### Funcionalidades MVP

**Público:**
- [x] Home con propuesta de valor
- [x] Páginas informativas (Cómo funciona, Para Influencers, Para Empresas)
- [x] Catálogo público limitado de influencers
- [x] Pricing / Comisiones
- [x] FAQ básico
- [x] Contacto

**Autenticación:**
- [x] Registro con email + password
- [x] Login con selección de rol
- [x] Verificación de email
- [x] Recuperar contraseña

**Dashboard Influencer:**
- [x] Perfil básico (info general, bio, foto)
- [x] Agregar redes sociales (manual)
- [x] Configurar tarifas simples
- [x] Ver solicitudes de campaña
- [x] Aceptar/Rechazar propuestas
- [x] Historial de campañas básico

**Dashboard Empresa:**
- [x] Perfil de empresa
- [x] Búsqueda de influencers con filtros básicos
- [x] Guardar favoritos
- [x] Crear campaña simple
- [x] Enviar propuesta a influencer
- [x] Seguimiento de propuestas enviadas

**Dashboard Admin:**
- [x] Ver lista de usuarios
- [x] Aprobar/verificar usuarios manualmente
- [x] Configurar porcentaje de comisión
- [x] Ver transacciones

**Pagos (MVP Simple):**
- [x] Integración Stripe para procesamiento
- [x] Pago directo (sin escrow complejo)
- [x] Confirmación manual de recepción
- [x] Comisión automática calculada

**Comunicación:**
- [x] Mensajes internos básicos (no real-time)
- [x] Notificaciones por email

---

## 6.2 Fase 2: Mejoras Core (Meses 4-6)

### Funcionalidades

**Autenticación:**
- [ ] Login social (Google, Instagram)
- [ ] Verificación automática de redes sociales (APIs)
- [ ] 2FA (autenticación de dos factores)

**Dashboard Influencer:**
- [ ] Media kit generado automáticamente
- [ ] Portfolio con imágenes y links
- [ ] Calendario de disponibilidad
- [ ] Estadísticas de rendimiento
- [ ] Sistema de reviews y ratings

**Dashboard Empresa:**
- [ ] Búsqueda avanzada con más filtros
- [ ] Comparador de influencers lado a lado
- [ ] Listas/carpetas de guardados
- [ ] Brief de campaña más detallado
- [ ] Plantillas de campaña

**Pagos:**
- [ ] Sistema de escrow completo
- [ ] Facturación automática
- [ ] Múltiples métodos de pago
- [ ] Retiros automáticos para influencers

**Comunicación:**
- [ ] Chat en tiempo real (Socket.io/Pusher)
- [ ] Notificaciones push
- [ ] Notificaciones in-app

**Admin:**
- [ ] Panel de métricas con gráficos
- [ ] Sistema de tickets de soporte
- [ ] Moderación de contenido reportado

---

## 6.3 Fase 3: Escala (Meses 7-12)

### Funcionalidades

**Plataforma:**
- [ ] App móvil (React Native / Flutter)
- [ ] Blog con contenido de marketing
- [ ] Programa de referidos
- [ ] Suscripción premium (Influencer Pro / Brand Pro)

**Influencer:**
- [ ] Analytics avanzados de campañas
- [ ] Sugerencias de marcas compatibles (AI)
- [ ] Colaboraciones entre influencers
- [ ] Tienda de media kits premium

**Empresa:**
- [ ] Campaign manager avanzado
- [ ] Reportes de ROI detallados
- [ ] Integración con herramientas de marketing
- [ ] API para agencias
- [ ] Servicio de concierge (búsqueda asistida)

**Seguridad:**
- [ ] Contratos digitales firmables
- [ ] KYC avanzado
- [ ] Sistema de disputas automatizado
- [ ] Seguro de campañas

**Internacionalización:**
- [ ] Soporte multi-moneda
- [ ] Traducción a múltiples idiomas
- [ ] Influencers y marcas globales

---

## 6.4 Fase 4: Innovación (Año 2+)

- [ ] AI para matching influencer-marca
- [ ] Predicción de performance de campañas
- [ ] Marketplace de contenido (compra de posts ya creados)
- [ ] Integración con TikTok Shop / Instagram Shopping
- [ ] Tokenización y pagos con cripto
- [ ] Metaverso / influencers virtuales

---

# 7. ESTRATEGIA DE SEGURIDAD Y CONFIANZA

## 7.1 Sistema de Verificación

### Niveles de Verificación

**Nivel 1: Básico**
- Verificación de email
- Perfil completo al 80%
- Badge: "Perfil completo"

**Nivel 2: Verificado**
- Verificación de identidad (documento oficial)
- Verificación de al menos 1 red social (propiedad de cuenta)
- Badge dorado: "✓ Verificado"

**Nivel 3: Premium**
- Historial de 3+ campañas exitosas
- Rating 4.5+ estrellas
- Sin disputas en 6 meses
- Badge: "⭐ Influencer Premium"

## 7.2 Sistema Anti-Fraude

### Prevención
- Verificación obligatoria antes de transacciones
- Límites de transacción para usuarios nuevos
- Detección de comportamientos sospechosos (ML)
- Validación de métricas de redes (detecta followers falsos)

### Protección
- Escrow de pagos (retención hasta confirmación)
- Contratos con términos claros
- Historial de transacciones visible
- Sistema de reputación transparente

### Resolución
- Medición de disputas por parte del admin
- Arbitraje en casos complejos
- Sanciones progresivas (suspensión temporal → permanente)
- Seguro opcional de campaña

## 7.3 Señales de Confianza en UI

### Elementos Visuales
- Badges de verificación prominentes
- Estrellas de rating en perfiles
- Contador de campañas completadas
- Fecha de registro en plataforma
- "Última actividad" visible

### Transparencia
- Comisiones siempre visibles antes de transacción
- Historial de precios del influencer
- Términos y condiciones claros
- Política de cancelación explícita

### Soporte Visible
- Botón de ayuda en todas las pantallas
- Tiempo estimado de respuesta
- Centro de ayuda completo
- Chat en vivo (horario laboral)

---

# 8. RESUMEN EJECUTIVO

## Propuesta de Valor

**InfluConnect** es una plataforma premium de influencer marketing que conecta creadores de contenido verificados con marcas que buscan resultados. A diferencia de las agencias tradicionales (costosas y lentas) o las redes sociales directas (inseguras y desorganizadas), ofrecemos:

1. **Verificación rigurosa** que garantiza perfiles reales
2. **Proceso estandarizado** que simplifica colaboraciones
3. **Pagos seguros** con protección para ambas partes
4. **Transparencia total** en métricas, precios y comisiones

## Modelo de Negocio

- **Ingresos**: Comisión del 15% por transacción (10% influencer, 5% marca)
- **Sin costos fijos**: Registro y uso gratuito, solo se paga al cerrar trato
- **Escalabilidad**: Margen alto, costos operativos bajos, crecimiento viral potencial

## Diferenciadores Clave

1. **Diseño premium** que atrae a influencers y marcas de calidad
2. **Verificación real** no solo de email, sino de identidad y propiedad de cuentas
3. **Sistema de reputación** que premia el buen comportamiento
4. **Soporte humano** no solo automatizado
5. **Enfoque en mercado hispanohablante** (oportunidad azul)

## Métricas de Éxito (KPIs)

- **Mes 3**: 500 influencers registrados, 50 marcas, 20 campañas
- **Mes 6**: 2,000 influencers, 200 marcas, 100 campañas, $50K en transacciones
- **Mes 12**: 10,000 influencers, 1,000 marcas, 500 campañas, $500K en transacciones

---

*Documento creado para InfluConnect — Plataforma de Influencer Marketing Premium*
*Versión 1.0 — Febrero 2026*
