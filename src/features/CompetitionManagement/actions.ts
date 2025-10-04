import { useQuery } from '@tanstack/react-query';
import { getCompetitions } from '@/api/competitions';

export function useCompetitionsQuery() {
    return useQuery({
        queryKey: ['competitions'],
        queryFn: getCompetitions,
    });
}
