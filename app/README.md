## InfluConnect — Frontend (React + Vite)

Aplicación frontend de la plataforma **InfluConnect**, construida con React, TypeScript, Vite, Tailwind CSS y componentes estilo `shadcn/ui`.

---

## 🏗️ Stack

- **Framework**: React + Vite + TypeScript  
- **Estilos**: Tailwind CSS + animaciones  
- **UI**: Radix UI + componentes reutilizables  
- **Pagos (modo demo)**: Stripe y Mercado Pago  
- **Estado/Contexto**: Context API (`AuthContext`, `NotificationsContext`, etc.)

---

## ▶️ Scripts principales

- `npm run dev` — levanta el entorno de desarrollo  
- `npm run build` — genera el build de producción  
- `npm run preview` — sirve el build de producción localmente  
- `npm run lint` — ejecuta ESLint sobre el proyecto

---

## 🚀 Cómo correr el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. (Opcional) Configurar variables de entorno copiando el ejemplo:

```bash
cp .env.example .env
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador la URL que muestra Vite (por defecto `http://localhost:5173`).

---

## 🌐 Vistas principales

- **Landing / Home pública**  
- **Login / Registro** para empresa e influencer  
- **BrandDashboard** con campañas, pagos y comisiones  
- **InfluencerDashboard** con ingresos y campañas activas  
- **AdminDashboard** para visión general de la plataforma  

La navegación entre vistas se controla desde `AuthContext` y `App.tsx`.

