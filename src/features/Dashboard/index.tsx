import CenteredLoadingSpinner from '@/components/UI/CenteredLoadingSpinner';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { useCompetitorsQuery, useCompetitionsQuery } from '@/shared/actions';

export default function Dashboard() {
    const { data: competitions = [], isLoading: competitionsLoading } = useCompetitionsQuery();
    const { data: competitors = [], isLoading: competitorsLoading } = useCompetitorsQuery();
    const isLoading = competitionsLoading || competitorsLoading;

    if (isLoading) {
        return <CenteredLoadingSpinner />;
    }

    return (
        <Grid container spacing={2} width="100%">
            <Grid width="100%" display="flex" justifyContent="space-between" alignItems="top">
                <Typography variant="h4">Dashboard</Typography>
                <Grid display="flex" justifyContent="space-between" alignItems="center" gap={4}>
                    <Box>
                        <Typography variant="h4">{competitions.length}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Competitions
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h4">{competitors.length}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Competitors
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
