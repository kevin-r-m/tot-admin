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
    competitorA: Competitor;
    competitorB: Competitor;
    votesA: number;
    votesB: number;
    winner?: Competitor;
    date: string;
    isComplete: boolean;
};
