export interface apiResponse {
    success: boolean;
    data: Competitor[];
}

export interface Competitor {
    _id: string;
    name: string;
    image?: string;
    description: string;
    wins: number;
    losses: number;
    totalVotes: number;
}
