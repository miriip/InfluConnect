import express from 'express';

const app = express();
app.use(express.json());

// Versión simplificada sin Prisma por ahora: devuelve lista vacía pero el servicio responde OK
app.get('/campaigns/open', (_req, res) => {
  res.json({ data: [] });
});

// Healthcheck del microservicio
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'campaigns' });
});

const port = process.env.PORT || 4101;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Campaigns service listening on http://localhost:${port}`);
});

