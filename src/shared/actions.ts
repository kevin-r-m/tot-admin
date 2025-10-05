import { useQuery } from '@tanstack/react-query';
import { getCompetitions } from '@/api/competitions';
import { getCompetitors } from '@/api/competitors';

export function useCompetitionsQuery() {
    return useQuery({
        queryKey: ['competitions'],
        queryFn: getCompetitions,
        staleTime: Infinity,
    });
}

export function useCompetitorsQuery() {
    return useQuery({
        queryKey: ['competitors'],
        queryFn: getCompetitors,
        staleTime: Infinity,
        refetchOnWindowFocus: true,
    });
}
