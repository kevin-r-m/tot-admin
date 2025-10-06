import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Row } from './Row';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
}));

interface Props {
    rows: {
        competitorName: string;
        matchedCompetitor: string;
        description: string;
    }[];
    idsToAdd: string[];
    setIdsToAdd: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CompetitorTable(props: Props) {
    return (
        <Paper sx={{ marginBottom: 2 }}>
            <TableContainer sx={{ maxHeight: 540, paddingRight: 2 }}>
                <Table stickyHeader aria-label="collapsible table">
                    <caption style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', zIndex: 1 }}>
                        Potential duplicates are found via fuzzy match against our database.
                        <br />
                        For any you do not want to add, unset <em>Add</em>.
                    </caption>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>New Competitor</StyledTableCell>
                            <StyledTableCell align="right">Potential Duplicate</StyledTableCell>
                            <StyledTableCell align="right">Add</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row, index) => (
                            <Row
                                key={row.competitorName}
                                row={row}
                                defaultOpen={index === 0}
                                idsToAdd={props.idsToAdd}
                                setIdsToAdd={props.setIdsToAdd}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
