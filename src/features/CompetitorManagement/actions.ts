import type { GifID } from '@giphy/js-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGifById, getGifsByTerm } from '@/api/gifs';
import { createCompetitor, createCompetitorsBulk, updateCompetitorImage } from '@/api/competitors';
import { Competitor } from '@/shared/types';

export function useGifQuery(gifId: GifID, name: string) {
    return useQuery({
        enabled: !!gifId,
        queryKey: ['gif', name],
        queryFn: () => getGifById(gifId),
        staleTime: Infinity,
    });
}

export function useGifsByTermQuery(term: string) {
    return useQuery({
        enabled: !!term,
        queryKey: ['gifs', term],
        queryFn: () => getGifsByTerm(term),
        staleTime: Infinity,
    });
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

export function useCreateCompetitorsBulkMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createCompetitorsBulk'],
        mutationFn: (competitors: Competitor[]) => createCompetitorsBulk(competitors),
        onSuccess: (data) => {
            queryClient.setQueryData(['competitors'], (oldData: Competitor[]) => [...data, ...oldData]);
        },
    });
}
