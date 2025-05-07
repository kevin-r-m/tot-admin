import type { GifID } from '@giphy/js-types';

export interface Competitor {
  _id: string;
  name: string;
  image?: GifID;
  description: string;
}
