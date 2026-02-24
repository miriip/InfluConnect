// Configuración global de frontend

// URL base de la API (para futura integración con backend real)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Modo demo: cuando es true, se usan mocks/localStorage en vez de API real
// Por defecto es DEMO, se desactiva poniendo VITE_DEMO_MODE="false"
export const IS_DEMO =
  (import.meta.env.VITE_DEMO_MODE ?? 'true').toLowerCase() !== 'false';

