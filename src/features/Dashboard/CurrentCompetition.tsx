import { useCompetitionsQuery } from '@/shared/actions';
import { Paper, Typography, Grid2 as Grid, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCompetitionGifsQuery } from './actions';
import { Gif } from '@giphy/react-components';

export default function CurrentCompetition() {
    const { data: competitions = [] } = useCompetitionsQuery();
    const { data: competitionGifs = [] } = useCompetitionGifsQuery(
        competitions[0]?.competitorOne.image || '',
        competitions[0]?.competitorTwo.image || '',
    );

    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
            <Box marginBottom={2}>
                <Typography variant="h6">Current Competition</Typography>
                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon fontSize="small" /> {`Ends in ${getHoursUntilMidnight().toFixed(0)} hours`}
                </Typography>
            </Box>
            <Grid display={'flex'} alignItems="center" gap={2}>
                <Grid>
                    {competitionGifs[0] && (
                        <Gif gif={competitionGifs[0]} width={100} height={100} hideAttribution noLink />
                    )}
                    <Typography variant="body1">{competitions[0].competitorOne.name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Competitor One
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="body1">{competitions[0].competitorTwo.name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Competitor Two
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

function getHoursUntilMidnight() {
    const now = new Date();
    const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    return (utcMidnight.getTime() - now.getTime()) / (1000 * 60 * 60);
}
