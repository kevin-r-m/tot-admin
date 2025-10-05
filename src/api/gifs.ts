import { GiphyFetch } from '@giphy/js-fetch-api';
import { GIPHY_PUBLIC_KEY } from '@/shared/constants';
import type { GifID } from '@giphy/js-types';

const gf = new GiphyFetch(GIPHY_PUBLIC_KEY);

export async function getGifById(gifId: GifID) {
    const stringifiedId = gifId.toString();
    const response = await gf.gif(stringifiedId);
    return response.data;
}

export async function getGifsByTerm(term: string) {
    const response = await gf.search(term, {
        sort: 'relevant',
        lang: 'en',
        limit: 10,
        type: 'gifs',
    });
    return response.data;
}

export function getCompetitionGifs(competitorOneImage: GifID, competitorTwoImage: GifID) {
    return Promise.all([getGifById(competitorOneImage), getGifById(competitorTwoImage)]);
}
