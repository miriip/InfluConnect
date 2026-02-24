# INFLUCONNECT — Funcionalidades Adicionales
## Contratos PDF Automáticos + Transparencia de Comisiones

---

# 1. GENERACIÓN AUTOMÁTICA DE CONTRATO PDF

## 1.1 Descripción General

El sistema generará automáticamente un contrato profesional en formato PDF cuando una empresa y un influencer lleguen a un acuerdo y confirmen una campaña. Este documento servirá como respaldo legal y referencia clara de los términos acordados.

## 1.2 Contenido del Contrato

### Datos del Acuerdo
| Campo | Descripción | Fuente de Datos |
|-------|-------------|-----------------|
| **ID del Contrato** | Número único de referencia | Generado automáticamente (CTR-2026-XXXXX) |
| **Fecha de Generación** | Fecha y hora de creación | Timestamp del sistema |
| **Fecha de Aceptación** | Cuando ambas partes confirmaron | Campo `acceptedAt` en DB |
| **Estado** | "Acuerdo Confirmado" | Estado de la campaña |

### Partes Involucradas
| Campo | Influencer | Empresa |
|-------|------------|---------|
| **Nombre/Razón Social** | `influencerProfile.displayName` | `brandProfile.companyName` |
| **Email** | `user.email` | `user.email` |
| **Ubicación** | `influencerProfile.location` | `brandProfile.location` |
| **Perfil Verificado** | Badge si aplica | Badge si aplica |

### Detalles Financieros
| Concepto | Monto | Ejemplo |
|----------|-------|---------|
| **Monto Base Acordado** | Precio negociado | $1,000.00 USD |
| **Comisión Plataforma** | % configurado × monto base | 15% = $150.00 USD |
| **Total a Pagar (Empresa)** | Monto base + comisión | $1,150.00 USD |
| **Total a Recibir (Influencer)** | Monto base - comisión influencer | $900.00 USD |
| **Divisa** | USD/EUR/MXN | USD |

### Entregables Acordados
```
┌─────────────────────────────────────────────────────────────┐
│  ENTREGABLES                                                │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  Tipo        │  Cantidad    │  Plataforma  │  Fecha Límite  │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  Reel        │  1           │  Instagram   │  15/03/2026    │
│  Stories     │  3           │  Instagram   │  15/03/2026    │
│  Post Feed   │  1           │  Instagram   │  20/03/2026    │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

### Términos y Condiciones del Acuerdo
- **Duración de la campaña**: Fecha inicio → Fecha fin
- **Exclusividad**: Sí/No (según negociación)
- **Derechos de uso**: Alcance de la licencia de contenido
- **Revisión previa**: Si la empresa requiere aprobación antes de publicar
- **Cancelación**: Términos de cancelación y penalizaciones

### Firmas Digitales (Sección)
```
┌─────────────────────────────┐    ┌─────────────────────────────┐
│     FIRMA DEL INFLUENCER    │    │      FIRMA DE LA EMPRESA    │
│                             │    │                             │
│  _______________________    │    │   _______________________   │
│  Nombre: [Influencer]       │    │   Nombre: [Empresa]         │
│  Fecha: [DD/MM/AAAA]        │    │   Fecha: [DD/MM/AAAA]       │
│  IP: [XXX.XXX.XXX.XXX]      │    │   IP: [XXX.XXX.XXX.XXX]     │
└─────────────────────────────┘    └─────────────────────────────┘
```

## 1.3 Diseño Visual del Contrato PDF

### Especificaciones de Diseño
- **Formato**: A4 (210mm × 297mm)
- **Orientación**: Vertical
- **Márgenes**: 25mm todos los lados
- **Tipografía**: 
  - Títulos: Inter Bold 18pt
  - Subtítulos: Inter SemiBold 14pt
  - Body: Inter Regular 11pt
  - Tablas: Inter Regular 10pt
- **Colores**:
  - Fondo: Blanco `#FFFFFF`
  - Texto principal: `#1A1A1A`
  - Acentos: Dorado `#D4AF37`
  - Líneas separadoras: `#E5E5E5`

### Estructura de Páginas

**Página 1 (Portada)**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [LOGO INFLUCONNECT]                      │
│                                                             │
│              CONTRATO DE COLABORACIÓN                       │
│                    COMERCIAL                                │
│                                                             │
│                    N° CTR-2026-00001                        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│              PARTE A: [Nombre Influencer]                   │
│              PARTE B: [Nombre Empresa]                      │
│                                                             │
│              Fecha: [DD de Mes de AAAA]                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Página 2 (Detalles del Acuerdo)**
- Sección 1: Información de las Partes
- Sección 2: Alcance del Trabajo (Entregables)
- Sección 3: Compensación y Pagos

**Página 3 (Términos Legales)**
- Sección 4: Términos y Condiciones
- Sección 5: Propiedad Intelectual
- Sección 6: Confidencialidad

**Página 4 (Firmas)**
- Sección 7: Firmas Digitales
- Código QR de verificación
- Hash de autenticidad del documento

## 1.4 Flujo de Generación del Contrato

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE GENERACIÓN DE CONTRATO                  │
└─────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐
  │  EMPRESA     │
  │  Envía       │
  │  Propuesta   │
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  INFLUENCER  │
  │  Negocia/    │
  │  Acepta      │
  └──────┬───────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  SISTEMA: CONFIRMACIÓN FINAL          │
│  • Mostrar resumen de acuerdo          │
│  • Mostrar breakdown de comisiones     │
│  • Botón "Confirmar y Generar Contrato"│
  └──────┬────────────────────────────────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  GENERACIÓN AUTOMÁTICA DEL CONTRATO   │
│  • Recopilar datos de ambas partes     │
│  • Calcular montos y comisiones        │
│  • Renderizar template PDF             │
│  • Generar ID único                    │
│  • Guardar en storage                  │
│  • Crear registro en DB                │
  └──────┬────────────────────────────────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  NOTIFICACIONES                       │
│  • Email a influencer con PDF adjunto  │
│  • Email a empresa con PDF adjunto     │
│  • Notificación in-app                 │
  └──────┬────────────────────────────────┘
         │
         ▼
  ┌────────────────────────────────────────┐
  │  EN LOS DASHBOARDS                    │
│  • Campaña aparece como "Activa"       │
│  • Botón "Descargar Contrato" visible  │
│  • Contrato accesible en historial     │
  └────────────────────────────────────────┘
```

## 1.5 Implementación Técnica

### Librerías Recomendadas

**Opción 1: Puppeteer + HTML Template (Recomendado)**
```javascript
// Stack: Puppeteer + Handlebars
// Pros: Control total del diseño, CSS moderno
// Cons: Requiere servidor con Chrome

const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

async function generateContract(data) {
  const template = handlebars.compile(contractTemplate);
  const html = template(data);
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '25mm', right: '25mm', bottom: '25mm', left: '25mm' }
  });
  
  await browser.close();
  return pdf;
}
```

**Opción 2: PDFKit (Node.js)**
```javascript
// Stack: PDFKit
// Pros: No dependencias externas, rápido
// Cons: Diseño más limitado, más código

const PDFDocument = require('pdfkit');

function generateContract(data) {
  const doc = new PDFDocument();
  
  // Header
  doc.fontSize(18).text('CONTRATO DE COLABORACIÓN', 50, 50);
  doc.fontSize(12).text(`N° ${data.contractId}`, 50, 80);
  
  // Contenido...
  
  return doc;
}
```

**Opción 3: React-PDF (Renderer)**
```javascript
// Stack: @react-pdf/renderer
// Pros: Componentes React, reutilizable
// Cons: Limitaciones de CSS

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ContractPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>CONTRATO DE COLABORACIÓN</Text>
        <Text>N° {data.contractId}</Text>
      </View>
      {/* ... */}
    </Page>
  </Document>
);
```

### Recomendación para InfluConnect
**Usar Puppeteer + Handlebars** por:
- Mayor flexibilidad de diseño
- Posibilidad de reutilizar templates HTML para emails
- Fácil mantenimiento y actualización de diseño
- Calidad profesional de salida

### Estructura de Almacenamiento
```
S3/Cloudinary Bucket:
└── contracts/
    └── {year}/
        └── {month}/
            └── CTR-{campaignId}-{timestamp}.pdf

Base de Datos:
Contract {
  id: String
  campaignId: String
  influencerId: String
  brandId: String
  fileUrl: String
  fileKey: String
  generatedAt: DateTime
  downloadedByInfluencer: Boolean
  downloadedByBrand: Boolean
  ipInfluencer: String
  ipBrand: String
  hash: String // Para verificación de integridad
}
```

### API Endpoints
```
POST /api/contracts/generate
  Body: { campaignId }
  Response: { contractId, downloadUrl }

GET /api/contracts/:id/download
  Auth: Influencer o Empresa de la campaña
  Response: PDF file

GET /api/contracts/:id/view
  Auth: Influencer o Empresa de la campaña
  Response: HTML preview

GET /api/campaigns/:id/contract
  Auth: Influencer o Empresa de la campaña
  Response: { contract: Contract }
```

---

# 2. TRANSPARENCIA DE COMISIONES

## 2.1 Principio Fundamental

> "Cada transacción debe mostrar claramente quién recibe qué, cuándo y por qué."

La transparencia total en las comisiones es un pilar de confianza de InfluConnect. Ninguna parte debe tener dudas sobre los montos involucrados.

## 2.2 Estructura de Comisiones

### Modelo Estándar
```
┌─────────────────────────────────────────────────────────────────┐
│                    BREAKDOWN DE COMISIÓN                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MONTO BASE ACORDADO                              $1,000.00    │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Comisión del Influencer (10%)                     -$100.00    │
│  Comisión de la Empresa (5%)                       -$50.00     │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  TOTAL COMISIÓN PLATAFORMA (15%)                   $150.00     │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  INFLUENCER RECIBE:                          $900.00   │   │
│  │  EMPRESA PAGA:                             $1,050.00   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  * La plataforma cobra esta comisión por:                       │
│    ✓ Verificación de identidad y seguridad                      │
│    ✓ Gestión de pagos con protección escrow                     │
│    ✓ Generación de contratos y documentación                    │
│    ✓ Soporte y resolución de disputas                           │
│    ✓ Plataforma tecnológica y mantenimiento                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Modelo Alternativo (Comisión única)
```
┌─────────────────────────────────────────────────────────────────┐
│                    BREAKDOWN DE COMISIÓN                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRESUPUESTO TOTAL DE LA EMPRESA                  $1,150.00    │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Comisión Plataforma (13% del total)              -$150.00     │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  INFLUENCER RECIBE NETO:                          $1,000.00    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.3 Ubicaciones donde Mostrar Comisiones

### A. Página de Confirmación de Campaña (Crítico)

**Ubicación**: Último paso antes de confirmar el acuerdo

```
┌─────────────────────────────────────────────────────────────────┐
│  CONFIRMACIÓN FINAL DEL ACUERDO                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📋 RESUMEN DEL ACUERDO                                         │
│  ─────────────────────────────────────────────────────────────  │
│  Influencer: @maria_beauty                                      │
│  Empresa: L'Oreal Argentina                                     │
│  Campaña: Lanzamiento Nueva Línea de Skincare                  │
│                                                                 │
│  💰 DETALLE FINANCIERO                                          │
│  ─────────────────────────────────────────────────────────────  │
│  Monto acordado con influencer:                   $1,000.00    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  COMISIÓN DE LA PLATAFORMA (15%)          $150.00      │   │
│  │                                                           │   │
│  │  • 10% cobrado al influencer:             $100.00      │   │
│  │  • 5% cobrado a la empresa:                $50.00      │   │
│  │                                                           │   │
│  │  Esta comisión cubre: verificación, pagos              │   │
│  │  seguros, contratos, soporte y plataforma.             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  TOTAL A PAGAR:                         $1,050.00      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ✅ Al confirmar, aceptas los términos y se generará un        │
│     contrato vinculante.                                       │
│                                                                 │
│     [  Confirmar y Generar Contrato  ]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### B. Panel del Influencer — Detalle de Ingreso

**Ubicación**: Dashboard → Mis Campañas → [Campaña] → Detalle de Pago

```
┌─────────────────────────────────────────────────────────────────┐
│  DETALLE DE PAGO — Campaña #1234                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  💵 INGRESO ESPERADO                                            │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Monto acordado en propuesta:                     $1,000.00    │
│  Comisión de plataforma (10%):                     -$100.00    │
│  ─────────────────────────────────────────────────────────────  │
│  TOTAL A RECIBIR:                                 $900.00      │
│                                                                 │
│  📅 Fecha estimada de pago: 5 días hábiles después de          │
│     aprobación de entregables                                  │
│                                                                 │
│  ℹ️ ¿Por qué hay una comisión?                                  │
│     Esta comisión nos permite ofrecerte:                        │
│     • Verificación de empresas para tu seguridad               │
│     • Pagos garantizados con protección escrow                 │
│     • Contratos legales que protegen tu trabajo                │
│     • Soporte dedicado 24/7                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### C. Panel de la Empresa — Detalle del Pago

**Ubicación**: Dashboard → Mis Campañas → [Campaña] → Detalle de Pago

```
┌─────────────────────────────────────────────────────────────────┐
│  DETALLE DE PAGO — Campaña #1234                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  💳 PAGO REQUERIDO                                              │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Compensación acordada con influencer:            $1,000.00    │
│  Comisión de plataforma (5%):                       +$50.00    │
│  ─────────────────────────────────────────────────────────────  │
│  TOTAL A PAGAR:                                   $1,050.00    │
│                                                                 │
│  🔒 Este monto se retendrá en escrow hasta la confirmación     │
│     de entregables.                                            │
│                                                                 │
│  📋 DESGLOSE DE COMISIÓN                                        │
│  ─────────────────────────────────────────────────────────────  │
│  Tu comisión (5%):                                 $50.00      │
│  Comisión del influencer (10%):                   $100.00      │
│  ─────────────────────────────────────────────────────────────  │
│  Total comisión plataforma:                       $150.00      │
│                                                                 │
│  ℹ️ ¿Qué incluye esta comisión?                                 │
│     • Acceso a influencers verificados                         │
│     • Protección de pago con escrow                            │
│     • Generación de contratos legales                          │
│     • Soporte prioritario                                      │
│     • Reportes de campaña y métricas                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### D. Sección Pública — Pricing / Cómo Funciona

**Ubicación**: Página pública de precios

```
┌─────────────────────────────────────────────────────────────────┐
│  TRANSPARENCIA EN PRECIOS                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Sin costos fijos. Solo pagas cuando cierras un trato.         │
│                                                                 │
│  ┌─────────────────────────┐    ┌─────────────────────────┐    │
│  │    PARA INFLUENCERS     │    │     PARA EMPRESAS       │    │
│  │                         │    │                         │    │
│  │    Comisión: 10%        │    │     Comisión: 5%        │    │
│  │                         │    │                         │    │
│  │  Ejemplo:               │    │   Ejemplo:              │    │
│  │  Tu tarifa: $1,000      │    │   Presupuesto: $1,000   │    │
│  │  Comisión: -$100        │    │   Comisión: +$50        │    │
│  │  Tú recibes: $900       │    │   Total a pagar: $1,050 │    │
│  │                         │    │                         │    │
│  └─────────────────────────┘    └─────────────────────────┘    │
│                                                                 │
│  ¿Qué incluye la comisión?                                      │
│  ─────────────────────────────────────────────────────────────  │
│  ✓ Verificación de identidad    ✓ Contratos legales            │
│  ✓ Pagos protegidos con escrow  ✓ Soporte 24/7                 │
│  ✓ Plataforma tecnológica       ✓ Reportes de campaña          │
│                                                                 │
│  📊 Calculadora: [ $______ ] → [ Calcular ]                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### E. Calculadora Interactiva de Comisiones

**Ubicación**: Página Pricing + Widget en dashboards

```
┌─────────────────────────────────────────────────────────────────┐
│  CALCULADORA DE COMISIONES                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Ingresa el monto de tu campaña:                                │
│  [ $ 1,000  ] [ Calcular ]                                     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  RESULTADO:                                                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SI ERES INFLUENCER:                                    │   │
│  │  • Tu tarifa:                    $1,000.00             │   │
│  │  • Comisión (10%):                -$100.00             │   │
│  │  • TÚ RECIBES:                    $900.00              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SI ERES EMPRESA:                                       │   │
│  │  • Presupuesto influencer:       $1,000.00             │   │
│  │  • Comisión (5%):                  +$50.00             │   │
│  │  • TOTAL A PAGAR:               $1,050.00              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.4 Componentes UI Reutilizables

### Componente: `CommissionBreakdown`

```typescript
interface CommissionBreakdownProps {
  baseAmount: number;
  influencerCommissionRate: number;
  brandCommissionRate: number;
  currency: string;
  showTooltip?: boolean;
  variant: 'influencer' | 'brand' | 'neutral';
}

// Uso:
<CommissionBreakdown
  baseAmount={1000}
  influencerCommissionRate={0.10}
  brandCommissionRate={0.05}
  currency="USD"
  variant="neutral"
  showTooltip={true}
/>
```

### Componente: `CommissionCalculator`

```typescript
interface CommissionCalculatorProps {
  defaultAmount?: number;
  onCalculate?: (result: CalculationResult) => void;
}

interface CalculationResult {
  baseAmount: number;
  influencerReceives: number;
  influencerCommission: number;
  brandPays: number;
  brandCommission: number;
  platformTotal: number;
}
```

## 2.5 Mensajes de Transparencia

### Tooltips y Microcopy

**En botones de pago:**
```
💡 "Se aplicará una comisión del 5% por procesamiento seguro"
```

**En resúmenes:**
```
📊 "Desglose transparente de todos los cargos"
```

**En facturas:**
```
✓ "Sin cargos ocultos. Lo que ves es lo que pagas/recibes."
```

**En emails de confirmación:**
```
"Adjunto encontrarás el desglose completo de tu transacción, 
incluyendo la comisión de plataforma que cubre verificación, 
pagos seguros y soporte."
```

---

# 3. IMPACTO EN LA EXPERIENCIA DE USUARIO

## 3.1 Antes vs Después

### Antes (Sin Transparencia)
- ❌ Usuario confundido sobre cuánto recibirá/pagará
- ❌ Sorpresas al momento del pago
- ❌ Desconfianza en la plataforma
- ❌ Disputas por malentendidos de montos

### Después (Con Transparencia Total)
- ✅ Claridad desde el primer momento
- ✅ Confianza en cada transacción
- ✅ Profesionalismo percibido
- ✅ Menos disputas y soporte

## 3.2 Métricas de Éxito

| Métrica | Meta |
|---------|------|
| Tasa de conversión en confirmación | >80% |
| Tickets de soporte sobre comisiones | <5% del total |
| Satisfacción con transparencia | >4.5/5 |
| Disputas por malentendidos de pago | <2% |

---

# 4. IMPLEMENTACIÓN EN EL ROADMAP

## Fase 1: MVP (Incluir desde el inicio)
- [x] Mostrar comisión en página de confirmación
- [x] Mostrar comisión en detalle de campaña (ambos dashboards)
- [x] Generación automática de contrato PDF básico
- [x] Botón de descarga de contrato

## Fase 2: Mejoras (Mes 4-5)
- [ ] Calculadora interactiva de comisiones
- [ ] Tooltips explicativos en toda la plataforma
- [ ] Contrato PDF con diseño premium
- [ ] Historial de contratos con filtros

## Fase 3: Avanzado (Mes 6+)
- [ ] Firmas digitales en contratos
- [ ] Contratos personalizables por tipo de campaña
- [ ] Notarización digital opcional
- [ ] Blockchain para verificación de contratos

---

*Documento de funcionalidades adicionales — InfluConnect*
*Versión 1.0 — Febrero 2026*
