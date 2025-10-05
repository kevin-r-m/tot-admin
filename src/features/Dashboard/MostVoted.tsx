import { useCompetitorsQuery } from '@/shared/actions';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function MostVoted() {
    const { data: competitors = [] } = useCompetitorsQuery();

    const tenMostVotedCompetitors = competitors
        .filter((c) => c.totalVotes && c.totalVotes > 0)
        .sort((a, b) => b.totalVotes! - a.totalVotes!)
        .slice(0, 10);

    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
            <Typography variant="h6">Most Voted Competitors</Typography>
            <Table aria-label="most voted competitors">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Total Votes</TableCell>
                        <TableCell align="right">Total Wins</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tenMostVotedCompetitors.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.totalVotes}</TableCell>
                            <TableCell align="right">{row.wins}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
