import { useCompetitorsQuery } from '@/shared/actions';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export default function RecentlyCreated() {
    const { data: competitors = [] } = useCompetitorsQuery();

    const recentlyCreatedCompetitors = competitors
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 8);

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Recently Created Competitors</Typography>
            <TableContainer>
                <Table stickyHeader aria-label="recently created competitors" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" fontWeight="bold">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body2" fontWeight="bold">
                                    Created At
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentlyCreatedCompetitors.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
