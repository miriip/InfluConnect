## InfluConnect — Backend (API & Servicios)

Arquitectura backend en Node.js + TypeScript, con PostgreSQL y Prisma, organizada en **microservicios** con **arquitectura en capas**.

### Estructura general

- `api/`
  - `gateway/` — API Gateway / BFF para el frontend (único punto de entrada HTTP)
  - `services/`
    - `auth/` — autenticación y gestión básica de usuarios
    - `campaigns/` — campañas, entregables y postulaciones
    - `payments/` — integración con Stripe / Mercado Pago y registro de pagos
    - `contracts/` — generación y almacenamiento de contratos PDF
    - `notifications/` — notificaciones internas / activity log
  - `prisma/` — definición de modelo de datos compartido (PostgreSQL)

Cada servicio sigue una arquitectura por capas:

- `domain/` — entidades y contratos de dominio (modelos puros, sin framework)
- `application/` — casos de uso (orquestan dominio + repositorios)
- `infrastructure/` — implementación concreta (Prisma, HTTP clients, mensajería)
- `presentation/` — controladores / rutas HTTP expuestas por el servicio

### Stack técnico

- **Runtime**: Node.js + TypeScript
- **DB**: PostgreSQL (modelo definido con Prisma)
- **ORM**: Prisma Client
- **HTTP**: Express (simple y flexible para microservicios)

### Próximos pasos

1. Implementar `prisma/schema.prisma` y generar cliente (`npx prisma generate`).
2. Implementar endpoints mínimos en `gateway` y en `services/*`.
3. Añadir `docker-compose.yml` para levantar `db + gateway + servicios`.

