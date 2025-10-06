import CenteredLoadingSpinner from '@/components/UI/CenteredLoadingSpinner';
import { Grid2 as Grid } from '@mui/material';
import { useCompetitorsQuery, useCompetitionsQuery } from '@/shared/actions';
import VotesChart from './VotesChart';
import Headline from './Headline';
import MostVoted from './MostVoted';
import FeatureLayout from '@/components/Layout/FeatureLayout';
import CurrentCompetition from './CurrentCompetition';
import QuickActions from './QuickActions';

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
            <Grid display="flex" flexDirection="row" gap={3} width="100%">
                <CurrentCompetition />
                <Grid flexDirection="column" display="flex" gap={3} width="100%" flex={1}>
                    <QuickActions />
                    <VotesChart />
                    <MostVoted />
                </Grid>
            </Grid>
        </FeatureLayout>
    );
}
