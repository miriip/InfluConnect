// Tipos para InfluConnect

export interface User {
  id: string;
  email: string;
  role: 'influencer' | 'brand' | 'admin';
  name: string;
  avatar?: string;
}

export interface Influencer {
  id: string;
  userId: string;
  name: string;
  handle: string;
  bio: string;
  category: string;
  location: string;
  followers: number;
  engagement: number;
  avatar: string;
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  packages: Package[];
  isVerified: boolean;
  rating: number;
  campaignsCompleted: number;
}

export interface Brand {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  location: string;
  website?: string;
  logo?: string;
  description: string;
  isVerified: boolean;
}

export interface Package {
  id: string;
  type: 'story' | 'post' | 'reel' | 'video' | 'bundle';
  name: string;
  description: string;
  price: number;
  currency: string;
}

export interface Campaign {
  id: string;
  brandId: string;
  influencerId: string;
  name: string;
  description: string;
  status: 'draft' | 'pending' | 'negotiating' | 'confirmed' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
  deliverables: Deliverable[];
  baseAmount: number;
  platformFee: number;
  brandFee: number;
  influencerReceives: number;
  brandPays: number;
  currency: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod?: 'stripe' | 'mercadopago';
  paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  contractUrl?: string;
}

export interface Deliverable {
  id: string;
  type: 'story' | 'post' | 'reel' | 'video';
  quantity: number;
  platform: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
}

export interface PaymentIntent {
  id: string;
  campaignId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  provider: 'stripe' | 'mercadopago';
  clientSecret?: string;
  preferenceId?: string;
}

/** Campaña abierta por una empresa para que influencers se postulen */
export interface OpenCampaign {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  objective: string;
  budget: number;
  currency: string;
  deliverablesSummary: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  platform?: string;
}

/** Postulación de un influencer a una campaña abierta */
export interface CampaignApplication {
  id: string;
  openCampaignId: string;
  influencerId: string;
  influencerName: string;
  influencerHandle: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

/** Notificación in-app (sin mensajes directos externos) */
export interface AppNotification {
  id: string;
  userId: string;
  type: 'application_received' | 'application_accepted' | 'application_rejected';
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  data?: { applicationId?: string; campaignId?: string; influencerId?: string; brandId?: string };
}

export type View = 
  | 'landing' 
  | 'login' 
  | 'register-influencer' 
  | 'register-brand'
  | 'home'
  | 'influencer-dashboard'
  | 'brand-dashboard'
  | 'admin-dashboard'
  | 'settings'
  | 'campaign-detail'
  | 'payment'
  | 'how-it-works'
  | 'pricing';
