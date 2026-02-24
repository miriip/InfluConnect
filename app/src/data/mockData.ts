import type { Influencer, Brand, Campaign, User, OpenCampaign, CampaignApplication } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'maria@example.com',
    role: 'influencer',
    name: 'Maria Gonzalez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    email: 'loreal@example.com',
    role: 'brand',
    name: 'L\'Oreal Argentina',
  },
  {
    id: '3',
    email: 'admin@influconnect.com',
    role: 'admin',
    name: 'Admin',
  }
];

export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    userId: '1',
    name: 'Maria Gonzalez',
    handle: '@maria_beauty',
    bio: 'Beauty & Lifestyle influencer. Amante del skincare y maquillaje.',
    category: 'Belleza',
    location: 'Buenos Aires, Argentina',
    followers: 125000,
    engagement: 4.2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    socialLinks: {
      instagram: '@maria_beauty',
      tiktok: '@maria_beauty',
    },
    packages: [
      { id: 'p1', type: 'story', name: 'Story', description: '1 story de 24hs', price: 100, currency: 'USD' },
      { id: 'p2', type: 'post', name: 'Post Feed', description: '1 post permanente', price: 300, currency: 'USD' },
      { id: 'p3', type: 'reel', name: 'Reel', description: '1 reel de 30-60s', price: 500, currency: 'USD' },
      { id: 'p4', type: 'bundle', name: 'Pack Completo', description: '1 reel + 3 stories + 1 post', price: 1000, currency: 'USD' },
    ],
    isVerified: true,
    rating: 4.8,
    campaignsCompleted: 45,
  },
  {
    id: '2',
    userId: '4',
    name: 'Carlos Fitness',
    handle: '@carlos_fit',
    bio: 'Entrenador personal y creador de contenido fitness.',
    category: 'Fitness',
    location: 'Córdoba, Argentina',
    followers: 89000,
    engagement: 5.1,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    socialLinks: {
      instagram: '@carlos_fit',
      youtube: 'CarlosFitness',
    },
    packages: [
      { id: 'p5', type: 'story', name: 'Story', description: '1 story de 24hs', price: 80, currency: 'USD' },
      { id: 'p6', type: 'post', name: 'Post Feed', description: '1 post permanente', price: 250, currency: 'USD' },
      { id: 'p7', type: 'reel', name: 'Reel', description: '1 reel de 30-60s', price: 400, currency: 'USD' },
    ],
    isVerified: true,
    rating: 4.6,
    campaignsCompleted: 28,
  },
  {
    id: '3',
    userId: '5',
    name: 'Sofia Travel',
    handle: '@sofia_viajes',
    bio: 'Viajera apasionada. Mostrando los mejores destinos de Argentina y el mundo.',
    category: 'Viajes',
    location: 'Mendoza, Argentina',
    followers: 210000,
    engagement: 3.8,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    socialLinks: {
      instagram: '@sofia_viajes',
      tiktok: '@sofia_viajes',
    },
    packages: [
      { id: 'p8', type: 'story', name: 'Story', description: '1 story de 24hs', price: 150, currency: 'USD' },
      { id: 'p9', type: 'post', name: 'Post Feed', description: '1 post permanente', price: 450, currency: 'USD' },
      { id: 'p10', type: 'reel', name: 'Reel', description: '1 reel de 30-60s', price: 700, currency: 'USD' },
    ],
    isVerified: true,
    rating: 4.9,
    campaignsCompleted: 67,
  },
];

export const mockBrands: Brand[] = [
  {
    id: '1',
    userId: '2',
    companyName: 'L\'Oreal Argentina',
    industry: 'Belleza',
    location: 'Buenos Aires, Argentina',
    website: 'www.loreal.com.ar',
    description: 'Líder mundial en productos de belleza.',
    isVerified: true,
  },
  {
    id: '2',
    userId: '6',
    companyName: 'Nike Argentina',
    industry: 'Deportes',
    location: 'Buenos Aires, Argentina',
    website: 'www.nike.com.ar',
    description: 'Just Do It. Equipamiento deportivo de alto rendimiento.',
    isVerified: true,
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp1',
    brandId: '1',
    influencerId: '1',
    name: 'Lanzamiento Nueva Línea Skincare',
    description: 'Promoción de la nueva línea de productos para el cuidado de la piel.',
    status: 'paid',
    deliverables: [
      { id: 'd1', type: 'reel', quantity: 1, platform: 'Instagram', dueDate: '2026-03-15', status: 'pending' },
      { id: 'd2', type: 'story', quantity: 3, platform: 'Instagram', dueDate: '2026-03-15', status: 'pending' },
      { id: 'd3', type: 'post', quantity: 1, platform: 'Instagram', dueDate: '2026-03-20', status: 'pending' },
    ],
    baseAmount: 1000,
    platformFee: 150,
    brandFee: 50,
    influencerReceives: 900,
    brandPays: 1050,
    currency: 'USD',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    createdAt: '2026-02-15',
    updatedAt: '2026-02-15',
    paymentMethod: 'stripe',
    paymentStatus: 'completed',
  },
  {
    id: 'camp2',
    brandId: '2',
    influencerId: '2',
    name: 'Campaña Running 2026',
    description: 'Promoción de la nueva línea de zapatillas running.',
    status: 'confirmed',
    deliverables: [
      { id: 'd4', type: 'reel', quantity: 2, platform: 'Instagram', dueDate: '2026-04-01', status: 'pending' },
      { id: 'd5', type: 'story', quantity: 5, platform: 'Instagram', dueDate: '2026-04-01', status: 'pending' },
    ],
    baseAmount: 800,
    platformFee: 120,
    brandFee: 40,
    influencerReceives: 720,
    brandPays: 840,
    currency: 'USD',
    startDate: '2026-03-15',
    endDate: '2026-04-15',
    createdAt: '2026-02-20',
    updatedAt: '2026-02-20',
    paymentStatus: 'pending',
  },
];

/** Campañas abiertas (empresas buscan influencers) - persistidas en localStorage */
export const INITIAL_OPEN_CAMPAIGNS: OpenCampaign[] = [
  {
    id: 'open1',
    brandId: '1',
    brandName: 'L\'Oreal Argentina',
    name: 'Lanzamiento Línea Skincare 2026',
    objective: 'Dar a conocer la nueva línea de cuidado facial y generar engagement.',
    budget: 1200,
    currency: 'USD',
    deliverablesSummary: '1 reel + 3 stories + 1 post en Instagram',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    createdAt: new Date().toISOString(),
    platform: 'Instagram',
  },
  {
    id: 'open2',
    brandId: '2',
    brandName: 'Nike Argentina',
    name: 'Running Urbano - Primavera',
    objective: 'Promocionar zapatillas running con foco en runners urbanos.',
    budget: 900,
    currency: 'USD',
    deliverablesSummary: '2 reels + 5 stories',
    startDate: '2026-04-15',
    endDate: '2026-05-15',
    createdAt: new Date().toISOString(),
    platform: 'Instagram',
  },
];

const STORAGE_OPEN_CAMPAIGNS = 'influconnect_open_campaigns';
const STORAGE_APPLICATIONS = 'influconnect_applications';
const STORAGE_NOTIFICATIONS = 'influconnect_notifications';

export function getOpenCampaigns(): OpenCampaign[] {
  try {
    const raw = localStorage.getItem(STORAGE_OPEN_CAMPAIGNS);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(STORAGE_OPEN_CAMPAIGNS, JSON.stringify(INITIAL_OPEN_CAMPAIGNS));
    return INITIAL_OPEN_CAMPAIGNS;
  } catch {
    return INITIAL_OPEN_CAMPAIGNS;
  }
}

export function saveOpenCampaigns(campaigns: OpenCampaign[]): void {
  localStorage.setItem(STORAGE_OPEN_CAMPAIGNS, JSON.stringify(campaigns));
}

export function getApplications(): CampaignApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_APPLICATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveApplications(apps: CampaignApplication[]): void {
  localStorage.setItem(STORAGE_APPLICATIONS, JSON.stringify(apps));
}

export function getBrandUserId(brandId: string): string | undefined {
  return mockBrands.find((b) => b.id === brandId)?.userId;
}

// Configuración de Stripe (solo clave pública para frontend)
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_REPLACE_ME', // usar VITE_STRIPE_PUBLIC_KEY desde .env en un proyecto real
};

// Configuración de Mercado Pago (solo clave pública para frontend)
export const MERCADOPAGO_CONFIG = {
  publicKey: 'TEST_REPLACE_ME', // usar VITE_MERCADOPAGO_PUBLIC_KEY desde .env en un proyecto real
};

// Tarjetas de prueba para Stripe
export const STRIPE_TEST_CARDS = [
  { brand: 'Visa', number: '4242 4242 4242 4242', cvc: '123', expiry: '12/30', description: 'Pago exitoso' },
  { brand: 'Visa (debit)', number: '4000 0566 5566 5556', cvc: '123', expiry: '12/30', description: 'Pago exitoso (débito)' },
  { brand: 'Mastercard', number: '5555 5555 5555 4444', cvc: '123', expiry: '12/30', description: 'Pago exitoso' },
  { brand: 'Amex', number: '3782 822463 10005', cvc: '1234', expiry: '12/30', description: 'Pago exitoso' },
];

// Usuarios de prueba para Mercado Pago
export const MERCADOPAGO_TEST_USERS = {
  buyer: {
    email: 'test_user_123@testuser.com',
    password: 'testpass123',
  },
  seller: {
    email: 'test_user_456@testuser.com',
    password: 'testpass456',
  },
};
