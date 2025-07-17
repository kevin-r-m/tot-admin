import type { GifID } from '@giphy/js-types';
import { useQuery } from '@tanstack/react-query';
import { getGifById, getGifsByTerm } from '@/api/gifs';

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
