import { apiResponse } from '../shared/types';
import type { GifID } from '@giphy/js-types';

async function handleAPIRequest(resource: string, options: RequestInit) {
    const res = await fetch(resource, options);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
}

export function getCompetitors(): Promise<apiResponse> {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
    };
    return handleAPIRequest(`${import.meta.env.VITE_API_URL}/api/competitors`, options);
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

export function createCompetitor(name: string, description: string) {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ name, description, image: '', totalVotes: 0, wins: 0, losses: 0 }),
    };
    return handleAPIRequest(`${import.meta.env.VITE_API_URL}/api/competitor`, options);
}
