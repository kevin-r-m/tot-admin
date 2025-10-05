import { useCompetitionsQuery } from '@/shared/actions';
import { Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

export default function VotesChart() {
    const { data: competitions = [] } = useCompetitionsQuery();

    function getTotalVotesByMonth(): number[] {
        const now = new Date();

        const months = Array.from({ length: 10 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
            return d.toLocaleString('default', { month: 'short', year: 'numeric' });
        });

        const votesByMonth = competitions.reduce<Record<string, number>>((acc, comp) => {
            const key = new Date(comp.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
            acc[key] = (acc[key] ?? 0) + comp.totalVotes;
            return acc;
        }, {});

        return months.map((m) => votesByMonth[m] ?? 0);
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
            <Typography variant="h6">Total Votes Over Time</Typography>
            <LineChart
                height={300}
                series={[{ data: getTotalVotesByMonth(), label: 'Votes' }]}
                xAxis={[{ scaleType: 'point', data: getMonthsToDate() }]}
                yAxis={[{ width: 50 }]}
            />
        </Paper>
    );
}

function getMonthsToDate() {
    const months = [];
    const now = new Date();
    for (let i = 0; i < now.getMonth() + 1; i++) {
        months.push(new Date(now.getFullYear(), i, 1).toLocaleString('default', { month: 'short' }));
    }
    return months;
}
