import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiResponse, Competitor } from '../shared/types';
import type { GifID } from '@giphy/js-types';

export function useCompetitorsQuery() {
    return useQuery({
        queryKey: ['competitors'],
        queryFn: () => getCompetitors(),
        staleTime: Infinity,
        refetchOnWindowFocus: true,
    });
}

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

export function useUpdateCompetitorImageMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateCompetitorImage'],
        mutationFn: ({ id, image }: { id: string; image: GifID }) => updateCompetitorImage(id, image),
        onSuccess: (_, { id, image }) => {
            queryClient.setQueryData(['competitors'], (oldData: Competitor[]) =>
                oldData.map((competitor) => (competitor._id === id ? { ...competitor, image } : competitor)),
            );
        },
    });
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

export function useCreateCompetitorMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createCompetitor'],
        mutationFn: ({ name, description }: { name: string; description: string }) =>
            createCompetitor(name, description),
        onSuccess: (data, { name, description }) => {
            queryClient.setQueryData(['competitors'], (oldData: Competitor[]) => [
                { _id: data.id, name, description, wins: 0, losses: 0, totalVotes: 0 },
                ...oldData,
            ]);
        },
    });
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

async function handleAPIRequest<T>(resource: string, options: RequestInit): Promise<T> {
    const res = await fetch(resource, options);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json() as Promise<T>;
}
