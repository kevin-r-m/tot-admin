import { useState } from 'react';
import { useCreateCompetitorsBulkMutation } from '@/features/CompetitorManagement/actions';
import { DialogContent, DialogActions, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import CompetitorTable from './CompetitorTable';

interface Props {
    handleClose: () => void;
    rows: {
        competitorName: string;
        matchedCompetitor: string;
        description: string;
    }[];
}
export default function GeneratedCompetitors(props: Props) {
    const { mutate: createCompetitorsBulk, isPending } = useCreateCompetitorsBulkMutation();
    const [idsToAdd, setIdsToAdd] = useState(props.rows.map((row) => row.competitorName));

    async function handleAdd() {
        const rowsToAdd = props.rows.filter((row) => idsToAdd.includes(row.competitorName));
        const competitorsToAdd = rowsToAdd.map((row) => ({
            name: row.competitorName,
            description: row.description,
            wins: 0,
            losses: 0,
            totalVotes: 0,
            updatedAt: '',
        }));
        createCompetitorsBulk(competitorsToAdd);
        props.handleClose();
    }

    return (
        <DialogContent>
            <CompetitorTable rows={props.rows} idsToAdd={idsToAdd} setIdsToAdd={setIdsToAdd} />
            <DialogActions sx={{ gap: 2 }}>
                <Button variant="outlined" color="error" onClick={props.handleClose} disabled={isPending}>
                    Cancel
                </Button>
                <Button
                    endIcon={<Add />}
                    type="submit"
                    variant="contained"
                    color="success"
                    onClick={handleAdd}
                    loading={isPending}
                >
                    Add ({idsToAdd.length})
                </Button>
            </DialogActions>
        </DialogContent>
    );
}
