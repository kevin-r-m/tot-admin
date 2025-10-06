import { useCompetitorsQuery } from '@/shared/actions';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function MostVoted() {
    const { data: competitors = [] } = useCompetitorsQuery();

    const mostVotedForCompetitors = competitors
        .filter((c) => c.totalVotes && c.totalVotes > 0)
        .sort((a, b) => b.totalVotes! - a.totalVotes!)
        .slice(0, 10);

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Most Voted For Competitors</Typography>
            <Table aria-label="most voted competitors" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold">
                                Total Votes
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold">
                                Total Wins
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mostVotedForCompetitors.map((row) => (
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
