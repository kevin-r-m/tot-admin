import type { GifID } from '@giphy/js-types';

export type Competitor = {
    _id?: string;
    name: string;
    image?: GifID;
    description: string;
    wins: number;
    losses: number;
    totalVotes: number;
};

export type Competition = {
    _id?: string;
    competitorOne: { id: string; name: string; image: GifID; votes: number; winner: boolean };
    competitorTwo: { id: string; name: string; image: GifID; votes: number; winner: boolean };
    totalVotes: number;
    createdAt: string;
    updatedAt: string;
};
