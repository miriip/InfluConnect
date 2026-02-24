# INFLUCONNECT — Sistema de Pagos
## Documentación Técnica y Guía de Pruebas

---

## 🌐 URL de la Plataforma

**https://iozcwf6w2edyq.ok.kimi.link**

---

## ✅ Estado de Implementación

| Funcionalidad | Estado | Método |
|---------------|--------|--------|
| Pagos con Tarjeta (Stripe) | ✅ Implementado | Demo Mode |
| Mercado Pago (Argentina) | ✅ Implementado | Demo Mode |
| Transparencia de Comisiones | ✅ Implementado | UI Completa |
| Flujo de Pago Completo | ✅ Implementado | End-to-end |
| Modo Sandbox | ✅ Implementado | Simulación |

---

## 💳 Métodos de Pago Implementados

### 1. Stripe (Tarjetas de Crédito/Débito)

**Estado:** Modo Demo (listo para conectar con claves reales)

**Tarjetas de Prueba:**
| Marca | Número | CVC | Expiración | Resultado |
|-------|--------|-----|------------|-----------|
| Visa | 4242 4242 4242 4242 | 123 | 12/30 | ✅ Éxito |
| Visa Débito | 4000 0566 5566 5556 | 123 | 12/30 | ✅ Éxito |
| Mastercard | 5555 5555 5555 4444 | 123 | 12/30 | ✅ Éxito |
| Amex | 3782 822463 10005 | 1234 | 12/30 | ✅ Éxito |

**Para activar en producción:**
1. Crear cuenta en https://stripe.com
2. Obtener clave pública (pk_test_...)
3. Configurar en archivo `.env`:
```
VITE_STRIPE_PUBLIC_KEY=pk_test_tu_clave_aqui
```

---

### 2. Mercado Pago (Argentina)

**Estado:** Modo Demo (listo para conectar con claves reales)

**Métodos disponibles:**
- ✅ Tarjetas de crédito/débito locales
- ✅ Saldo Mercado Pago
- ✅ Cuotas
- ✅ Pago Fácil / Rapipago

**Usuario de prueba:**
- Email: `test_user_123@testuser.com`
- Password: `testpass123`

**Para activar en producción:**
1. Crear cuenta en https://www.mercadopago.com.ar/developers
2. Obtener Public Key (TEST-...)
3. Configurar en archivo `.env`:
```
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-tu_clave_aqui
```

---

## 🔄 Flujo de Pago

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE PAGO COMPLETO                        │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────────┐
  │   EMPRESA    │
  │  Selecciona  │
  │   campaña    │
  └──────┬───────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  MODAL DE CONFIRMACIÓN                │
│  • Resumen de campaña                  │
│  • Desglose de comisiones              │
│  • Total a pagar                       │
  └──────┬────────────────────────────────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  SELECCIÓN DE MÉTODO                  │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │   Stripe    │  │  Mercado Pago   │  │
│  │  (Tarjeta)  │  │   (Argentina)   │  │
│  └─────────────┘  └─────────────────┘  │
  └──────┬────────────────────────────────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  PROCESAMIENTO DE PAGO                │
│  • Validación de datos                 │
│  • Procesamiento seguro                │
│  • Confirmación                        │
  └──────┬────────────────────────────────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  RESULTADO                            │
│  • Campaña marcada como "Pagada"       │
│  • Notificación a influencer           │
│  • Contrato generado                   │
│  • Comisión calculada                  │
  └────────────────────────────────────────┘
```

---

## 💰 Transparencia de Comisiones

### Modelo de Comisiones

```
┌─────────────────────────────────────────────────────────────────┐
│                    DESGLOSE DE COMISIÓN                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MONTO BASE ACORDADO                              $1,000.00    │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Comisión del Influencer (10%)                     -$100.00    │
│  Comisión de la Empresa (5%)                        -$50.00    │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  TOTAL COMISIÓN PLATAFORMA (15%)                   $150.00     │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  INFLUENCER RECIBE:                          $900.00   │   │
│  │  EMPRESA PAGA:                             $1,050.00   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  * La comisión cubre:                                           │
│    ✓ Verificación de identidad y seguridad                      │
│    ✓ Gestión de pagos con protección escrow                     │
│    ✓ Generación de contratos y documentación                    │
│    ✓ Soporte y resolución de disputas                           │
│    ✓ Plataforma tecnológica y mantenimiento                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Ubicaciones donde se muestra

1. **Modal de Confirmación de Pago** — Antes de procesar
2. **Panel de Empresa** — En detalle de cada campaña
3. **Panel de Influencer** — En detalle de ingresos
4. **Calculadora** — Estimación de comisiones

---

## 🧪 Guía de Pruebas

### Prueba 1: Login como Empresa

1. Ir a https://iozcwf6w2edyq.ok.kimi.link
2. Click en "Login"
3. Usar login rápido: Click en "Empresa" o ingresar:
   - Email: `loreal@example.com`
   - Password: cualquiera
4. Verás el Dashboard de Empresa

### Prueba 2: Realizar un Pago

1. En el Dashboard de Empresa, ir a "Mis Campañas"
2. Buscar la campaña "Campaña Running 2026" (estado: Confirmada)
3. Click en "Pagar Ahora"
4. Seleccionar método de pago:
   - **Stripe:** Click en "Simular Pago"
   - **Mercado Pago:** Click en "Pagar"
5. Ver confirmación de pago exitoso

### Prueba 3: Ver Transparencia de Comisiones

1. En el modal de pago, revisar el "Desglose del Pago"
2. Verificar:
   - Compensación influencer
   - Comisión plataforma (15%)
   - Total a pagar

### Prueba 4: Login como Influencer

1. Cerrar sesión o ir a Login
2. Usar login rápido: Click en "Influencer" o ingresar:
   - Email: `maria@example.com`
   - Password: cualquiera
3. Ver Dashboard de Influencer con:
   - Campañas activas
   - Ingresos
   - Desglose de comisiones

---

## 🔧 Configuración para Producción

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_tu_clave_de_produccion

# Mercado Pago
VITE_MERCADOPAGO_PUBLIC_KEY=APP_US-tu_clave_de_produccion
```

### Backend Requerido (para producción)

Para pagos reales se necesita un backend que:

1. **Crear PaymentIntent (Stripe)**
```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 105000, // $1,050.00 en centavos
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
});
```

2. **Crear Preferencia (Mercado Pago)**
```javascript
const preference = await mercadopago.preferences.create({
  items: [{
    title: 'Campaña Influencer',
    unit_price: 1050,
    quantity: 1,
  }],
});
```

3. **Webhooks para confirmación de pagos**

---

## 📁 Estructura del Código

```
src/
├── components/
│   └── payments/
│       ├── StripePayment.tsx       # Componente Stripe
│       ├── MercadoPagoPayment.tsx  # Componente Mercado Pago
│       └── PaymentModal.tsx        # Modal de pago integrado
├── contexts/
│   └── AuthContext.tsx             # Autenticación
├── data/
│   └── mockData.ts                 # Datos de prueba
├── pages/
│   ├── LandingPage.tsx             # Landing
│   ├── LoginPage.tsx               # Login
│   ├── BrandDashboard.tsx          # Dashboard Empresa
│   ├── InfluencerDashboard.tsx     # Dashboard Influencer
│   ├── RegisterInfluencerPage.tsx  # Registro Influencer
│   └── RegisterBrandPage.tsx       # Registro Empresa
└── types/
    └── index.ts                    # Tipos TypeScript
```

---

## 🚀 Próximos Pasos para Producción

1. **Configurar claves reales** de Stripe y Mercado Pago
2. **Implementar backend** con endpoints de pago
3. **Configurar webhooks** para confirmaciones
4. **Agregar seguridad** (HTTPS, tokens, etc.)
5. **Implementar escrow** de pagos
6. **Generar contratos PDF** automáticos

---

## 📞 Soporte

Para dudas o problemas:
- Revisar consola del navegador (F12)
- Verificar que las claves de prueba estén configuradas
- Probar en modo incógnito

---

*InfluConnect — Sistema de Pagos v1.0*
*Febrero 2026*
