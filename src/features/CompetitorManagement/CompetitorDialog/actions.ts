import type { Competitor } from '@/shared/types';

export async function streamAIDescription(value: string, onData: (text: string) => void) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agent/streamDescription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ value }),
    });

    if (!response.ok || !response.body) {
        throw new Error('Streaming failed');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;

        const text = decoder.decode(chunk, { stream: true });
        onData(text);
    }
}

export async function generateCompetitors(onData: (step: number) => void) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agent/generateCompetitors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ value: 5 }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
        if (!reader) break;
        const { done, value: chunk } = await reader.read();
        if (done) break;

        const text = decoder.decode(chunk, { stream: true });
        const parsed = JSON.parse(text);
        onData(parsed.step);
        if (parsed.step === parsed.totalSteps) return parsed;
    }
}

export async function createCompetitorsBulk(competitors: Competitor[]) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/competitor/bulk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(competitors),
    });
    return response.json();
}
