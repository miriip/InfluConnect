import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import type { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const CAMPAIGNS_SERVICE_URL =
  process.env.CAMPAIGNS_SERVICE_URL || 'http://localhost:4101';
const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || 'http://localhost:4100';

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gateway' });
});

// Proxy sencillo hacia el microservicio de campañas
app.get('/api/campaigns/open', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${CAMPAIGNS_SERVICE_URL}/campaigns/open`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error proxying /campaigns/open', error);
    res.status(502).json({ error: 'Error comunicando con campaigns service' });
  }
});

// Proxy auth: registro
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const body = await response.json();
    res.status(response.status).json(body);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error proxying /auth/register', error);
    res.status(502).json({ error: 'Error comunicando con auth service' });
  }
});

// Proxy auth: login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const body = await response.json();
    res.status(response.status).json(body);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error proxying /auth/login', error);
    res.status(502).json({ error: 'Error comunicando con auth service' });
  }
});

// TODO: aquí se enrutarán los demás microservicios:
// - /api/payments -> servicio de pagos
// - /api/contracts -> servicio de contratos
// - /api/notifications -> servicio de notificaciones

const port = process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Gateway listening on http://localhost:${port}`);
});

