import type { GifID } from '@giphy/js-types';

export interface apiResponse {
    success: boolean;
    data: Competitor[];
}

export interface Competitor {
    _id?: string;
    name: string;
    image?: GifID;
    description: string;
    wins: number;
    losses: number;
    totalVotes: number;
}
