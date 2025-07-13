import { GiphyFetch } from '@giphy/js-fetch-api';
import { GIPHY_PUBLIC_KEY } from '@/shared/constants';
import type { GifID } from '@giphy/js-types';

const gf = new GiphyFetch(GIPHY_PUBLIC_KEY);

export function getGifById(gifId: GifID) {
    const stringifiedId = gifId.toString();
    return gf.gif(stringifiedId);
}

export function getGifsByTerm(term: string) {
    return gf.search(term, {
        sort: 'relevant',
        lang: 'en',
        limit: 10,
        type: 'gifs',
    });
}
