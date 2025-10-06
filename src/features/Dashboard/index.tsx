import CenteredLoadingSpinner from '@/components/UI/CenteredLoadingSpinner';
import { Grid2 as Grid } from '@mui/material';
import { useCompetitorsQuery, useCompetitionsQuery } from '@/shared/actions';
import VotesChart from './VotesChart';
import Headline from './Headline';
import MostVoted from './MostVoted';
import FeatureLayout from '@/components/Layout/FeatureLayout';
import CurrentCompetition from './CurrentCompetition';

export default function Dashboard() {
    const { isLoading: competitionsLoading } = useCompetitionsQuery();
    const { isLoading: competitorsLoading } = useCompetitorsQuery();
    const isLoading = competitionsLoading || competitorsLoading;

    if (isLoading) {
        return <CenteredLoadingSpinner />;
    }

    return (
        <FeatureLayout>
            <Headline />
            <CurrentCompetition />
            <Grid flexDirection="row" display="flex" gap={4} width="100%">
                <VotesChart />
                <MostVoted />
            </Grid>
        </FeatureLayout>
    );
}
