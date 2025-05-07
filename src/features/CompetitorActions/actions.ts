import { GiphyFetch } from '@giphy/js-fetch-api';
import { GIPHY_PUBLIC_KEY } from '../../constants';
import type { GifID } from '@giphy/js-types';

const gf = new GiphyFetch(GIPHY_PUBLIC_KEY);

export function getGifById(gifId: GifID) {
  const stringifiedId = gifId.toString();
  return gf.gif(stringifiedId);
}

export async function getGifsByTerm(term: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return gf.search(term, {
    sort: 'relevant',
    lang: 'en',
    limit: 10,
    type: 'gifs',
  });
}
