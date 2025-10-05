import { Competitor } from '@/shared/types';
import type { GifID } from '@giphy/js-types';

export async function getCompetitors(): Promise<Competitor[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/competitors`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
    });
    const data = await response.json();
    return data.data;
}

export async function createCompetitor(name: string, description: string) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/competitor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ name, description, image: '', totalVotes: 0, wins: 0, losses: 0 }),
    });
    return response.json();
}

export async function updateCompetitorImage(id: string, image: GifID) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/competitor/image`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ id, image }),
    });
    return response.json();
}

export async function createCompetitorsBulk(competitors: Competitor[]): Promise<Competitor[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/competitor/bulk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(competitors),
    });
    const data = await response.json();
    return data.data;
}
