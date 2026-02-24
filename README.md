## INFLUCONNECT

Plataforma premium de influencer marketing con contratos automáticos en PDF y transparencia total de comisiones entre marcas, creadores y la plataforma.

Este monorepo incluye:
- **Frontend React + Vite** (`app/`)
- **Documentación funcional y técnica** (`docs/`)

---

## 📂 Estructura del repositorio

- **`app/`**: frontend React + TypeScript + Vite de InfluConnect  
  - Autenticación y cambio de vistas por rol (empresa, influencer, admin)  
  - Dashboards con detalle de campañas, pagos y comisiones  
  - Integración UI para Stripe y Mercado Pago (modo demo)  
- **`docs/`**: documentación funcional, de negocio y técnica  
  - `influencer-platform-design.md` — diseño y arquitectura completa  
  - `influencer-platform-contracts-commissions.md` — contratos PDF + comisiones  
  - `influencer-platform-summary.md` — resumen ejecutivo  
  - `frontend-setup.md` — notas técnicas del setup del frontend (stack, Tailwind, shadcn/ui)  
  - `RESUMEN-EJECUTIVO.md` — versión en español para stakeholders  
  - `SISTEMA-DE-PAGOS.md` — detalle del sistema de pagos y guías de prueba  
  - `assets/` — diagramas, mockups y arquitectura visual

---

## 🚀 Cómo correr la app (frontend)

1. **Entrar en la carpeta de la app**

```bash
cd app
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno (opcional para pagos reales)**

Copiar `.env.example` a `.env` y ajustar claves si se usan integraciones reales:

```bash
cp .env.example .env
```

4. **Levantar en desarrollo**

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173` (por defecto de Vite).

5. **Build para producción**

```bash
npm run build
```

Los archivos compilados se generan en `app/dist`.

---

## 📖 Documentación recomendada

- **Para entender el producto**: `docs/influencer-platform-summary.md`  
- **Para detalle funcional + UX/UI**: `docs/influencer-platform-design.md`  
- **Para contratos y comisiones**: `docs/influencer-platform-contracts-commissions.md`  
- **Para pagos y pruebas end-to-end**: `docs/SISTEMA-DE-PAGOS.md`

---

## 📌 Notas

- Las carpetas de build (`dist`) y dependencias (`node_modules`) ya están ignoradas en `.gitignore` para que el repositorio en GitHub se mantenga limpio.  
- La carpeta `docs/assets/` contiene todos los diagramas y mockups que se referencian en la documentación.

