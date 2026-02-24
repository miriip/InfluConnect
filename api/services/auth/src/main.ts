import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.AUTH_JWT_SECRET || 'dev_secret_change_me';

type Role = 'influencer' | 'brand' | 'admin';

type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
};

// Por ahora, almacenamiento en memoria (se puede reemplazar luego por Prisma/Postgres)
const users: StoredUser[] = [];

function signToken(payload: { id: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body as {
      email?: string;
      password?: string;
      name?: string;
      role?: 'influencer' | 'brand';
    };

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'Email, password, name y role son requeridos.' });
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'Este email ya está registrado.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user: StoredUser = {
      id: Date.now().toString(),
      email,
      passwordHash,
      name,
      role,
    };

    users.push(user);

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error en /auth/register', error);
    return res.status(500).json({ error: 'Error interno al registrar usuario.' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son requeridos.' });
    }

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error en /auth/login', error);
    return res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'auth' });
});

const port = process.env.PORT || 4100;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth service listening on http://localhost:${port}`);
});

