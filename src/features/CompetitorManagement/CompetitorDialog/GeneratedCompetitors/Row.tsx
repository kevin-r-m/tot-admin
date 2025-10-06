import { useState } from 'react';
import { Box, Collapse, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface Props {
    row: {
        competitorName: string;
        matchedCompetitor: string;
        description: string;
    };
    defaultOpen?: boolean;
    idsToAdd: string[];
    setIdsToAdd: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Row(props: Props) {
    const [open, setOpen] = useState(props.defaultOpen);

    function handleSwitchChange() {
        if (props.idsToAdd.includes(props.row.competitorName)) {
            props.setIdsToAdd((prev) => prev.filter((id) => id !== props.row.competitorName));
        } else {
            props.setIdsToAdd((prev) => [...prev, props.row.competitorName]);
        }
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell width={34}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} about="Expand row">
                        {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" width={200}>
                    {props.row.competitorName}
                </TableCell>
                <TableCell align="right" width={240}>
                    {props.row.matchedCompetitor || 'N/A'}
                </TableCell>
                <TableCell align="right">
                    <Switch onChange={handleSwitchChange} checked={props.idsToAdd.includes(props.row.competitorName)} />
                </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }} gutterBottom component="div">
                                New Competitor Description
                            </Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                {props.row.description}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
