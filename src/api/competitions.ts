import { Competition } from '@/shared/types';

export async function getCompetitions(): Promise<Competition[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/competitions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
    });
    const data = await response.json();
    return data.data;
}
