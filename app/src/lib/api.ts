import { API_BASE_URL } from './config';
import type { Campaign } from '@/types';

type ApiCampaign = Campaign;

export async function fetchOpenCampaigns(): Promise<ApiCampaign[]> {
  const res = await fetch(`${API_BASE_URL}/api/campaigns/open`);
  if (!res.ok) {
    throw new Error('Error al obtener campañas abiertas desde la API');
  }
  const body = await res.json();
  return body.data ?? [];
}

