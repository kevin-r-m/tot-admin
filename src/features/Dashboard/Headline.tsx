import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { useCompetitorsQuery, useCompetitionsQuery } from '@/shared/actions';

export default function Headline() {
    const { data: competitions = [] } = useCompetitionsQuery();
    const { data: competitors = [] } = useCompetitorsQuery();

    return (
        <Grid width="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Dashboard</Typography>
            <Grid display="flex" justifyContent="space-between" alignItems="center" gap={4}>
                <Box>
                    <Typography variant="h4">{competitors.length}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Competitors
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h4">{competitions.length}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Competitions
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
