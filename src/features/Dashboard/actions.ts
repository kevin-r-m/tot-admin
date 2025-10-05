import { getCompetitionGifs } from '@/api/gifs';
import { useQuery } from '@tanstack/react-query';
import type { GifID } from '@giphy/js-types';

export function useCompetitionGifsQuery(competitorOneImage: GifID, competitorTwoImage: GifID) {
    return useQuery({
        queryKey: ['competitionGifs', competitorOneImage, competitorTwoImage],
        queryFn: () => getCompetitionGifs(competitorOneImage, competitorTwoImage),
        enabled: !!competitorOneImage && !!competitorTwoImage,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
}
