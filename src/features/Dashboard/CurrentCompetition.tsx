import { useCompetitionsQuery, useCompetitorsQuery } from '@/shared/actions';
import { Paper, Typography, Grid2 as Grid, Box, Divider, Tooltip, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCompetitionGifsQuery } from './actions';
import { Gif } from '@giphy/react-components';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts';

export default function CurrentCompetition() {
    const { data: competitions = [] } = useCompetitionsQuery();
    const { data: competitors = [] } = useCompetitorsQuery();
    const { data: competitionGifs = [] } = useCompetitionGifsQuery(
        competitions[0]?.competitorOne.image || '',
        competitions[0]?.competitorTwo.image || '',
    );

    function getCompetitorWins() {
        if (competitions.length === 0 || competitors.length === 0) return [0, 0];

        const competitorOneWins = competitors.find((c) => c._id === competitions[0].competitorOne.id)?.wins || 0;
        const competitorTwoWins = competitors.find((c) => c._id === competitions[0].competitorTwo.id)?.wins || 0;

        return [competitorOneWins, competitorTwoWins];
    }

    const competitorWins = getCompetitorWins();

    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%', flex: 0.5, overflowY: 'auto' }}>
            <Grid container flexDirection="column" gap={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Current Competition</Typography>
                    <Tooltip title={`Ends in ${getHoursUntilMidnight().toFixed(0)} hours`}>
                        <IconButton>
                            <AccessTimeIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Grid display="flex" alignItems="start" gap={2}>
                    <Grid display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <Typography variant="body2">{competitions[0].competitorOne.name}</Typography>
                        {competitionGifs[0] && (
                            <Gif gif={competitionGifs[0]} width={150} height={150} hideAttribution noLink />
                        )}
                    </Grid>
                    <Typography variant="body2">vs</Typography>
                    <Grid display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <Typography variant="body2">{competitions[0].competitorTwo.name}</Typography>
                        {competitionGifs[1] && (
                            <Gif gif={competitionGifs[1]} width={150} height={150} hideAttribution noLink />
                        )}
                    </Grid>
                </Grid>
                <Divider />
                <Box>
                    <Typography variant="subtitle1">Votes By Competitor</Typography>
                    <Typography variant="caption" color="text.secondary">
                        Total Votes: {competitions[0].totalVotes}
                    </Typography>
                </Box>
                <PieChart
                    series={[
                        {
                            innerRadius: 50,
                            outerRadius: 100,
                            cornerRadius: 5,
                            paddingAngle: 2,
                            startAngle: -45,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            data: [
                                {
                                    id: 0,
                                    value: competitions[0].competitorOne.votes,
                                    label: competitions[0].competitorOne.name,
                                },
                                {
                                    id: 1,
                                    value: competitions[0].competitorTwo.votes,
                                    label: competitions[0].competitorTwo.name,
                                },
                            ],
                        },
                    ]}
                    width={200}
                    height={200}
                />
                <Divider />
                <Box>
                    <Typography variant="subtitle1">Total Competitor Victories</Typography>
                    <Typography variant="caption" color="text.secondary">
                        Combined Victories: {competitorWins[0] + competitorWins[1]}
                    </Typography>
                </Box>
                <BarChart
                    borderRadius={5}
                    xAxis={[
                        {
                            data: [competitions[0].competitorOne.name, competitions[0].competitorTwo.name],
                            colorMap: {
                                type: 'ordinal',
                                colors: ['#4254FB', '#FFB422'],
                            },
                        },
                    ]}
                    series={[{ data: competitorWins }]}
                    height={200}
                />
            </Grid>
        </Paper>
    );
}

function getHoursUntilMidnight() {
    const now = new Date();
    const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    return (utcMidnight.getTime() - now.getTime()) / (1000 * 60 * 60);
}
