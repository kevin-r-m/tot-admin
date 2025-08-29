import { apiResponse } from '../shared/types';
import type { GifID } from '@giphy/js-types';

export async function getCompetitors() {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
    };
    const response = await handleAPIRequest<apiResponse>(`${import.meta.env.VITE_API_URL}/api/competitors`, options);
    return response.data;
}

export function createCompetitor(name: string, description: string) {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ name, description, image: '', totalVotes: 0, wins: 0, losses: 0 }),
    };
    return handleAPIRequest<{ id: string }>(`${import.meta.env.VITE_API_URL}/api/competitor`, options);
}

export function updateCompetitorImage(id: string, image: GifID) {
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ id, image }),
    };
    return handleAPIRequest(`${import.meta.env.VITE_API_URL}/api/competitor/image`, options);
}

async function handleAPIRequest<T>(resource: string, options: RequestInit): Promise<T> {
    const res = await fetch(resource, options);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json() as Promise<T>;
}
