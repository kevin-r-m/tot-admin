import { apiResponse } from '../types/api';
import type { GifID } from '@giphy/js-types';

async function handleAPIRequest(resource: string, options: RequestInit) {
  const res = await fetch(resource, options);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}

export async function getCompetitors(): Promise<apiResponse> {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
  };
  return handleAPIRequest(
    `${import.meta.env.VITE_API_URL}/api/competitors`,
    options
  );
}

export async function updateCompetitorImage(id: string, image: GifID) {
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ id, image }),
  };
  return handleAPIRequest(
    `${import.meta.env.VITE_API_URL}/api/competitor/image`,
    options
  );
}
