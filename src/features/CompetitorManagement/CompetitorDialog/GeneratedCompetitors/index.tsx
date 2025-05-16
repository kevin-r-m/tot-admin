import { useState } from 'react';

import { DialogContent, DialogActions, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import CompetitorTable from './CompetitorTable';
import type { Competitor } from '@/shared/types';
import { createCompetitorsBulk } from '../actions';

interface GeneratedCompetitorsProps {
    handleClose: () => void;
    rows: {
        competitorName: string;
        matchedCompetitor: string;
        description: string;
    }[];
    addCompetitorsToList: (competitors: Competitor[]) => void;
}
export default function GeneratedCompetitors({ handleClose, rows, addCompetitorsToList }: GeneratedCompetitorsProps) {
    const [idsToAdd, setIdsToAdd] = useState(rows.map((row) => row.competitorName));
    const [loading, setLoading] = useState(false);

    async function handleAdd() {
        setLoading(true);
        const rowsToAdd = rows.filter((row) => idsToAdd.includes(row.competitorName));
        const competitorsToAdd = rowsToAdd.map((row) => ({
            name: row.competitorName,
            description: row.description,
            wins: 0,
            losses: 0,
            totalVotes: 0,
        }));
        const created = await createCompetitorsBulk(competitorsToAdd);
        if (created.success) {
            addCompetitorsToList(created.data);
        }
        setLoading(false);
        handleClose();
    }

    return (
        <DialogContent>
            <CompetitorTable rows={rows} idsToAdd={idsToAdd} setIdsToAdd={setIdsToAdd} />
            <DialogActions sx={{ gap: 2 }}>
                <Button variant="outlined" color="error" onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    endIcon={<Add />}
                    type="submit"
                    variant="contained"
                    color="success"
                    onClick={handleAdd}
                    loading={loading}
                >
                    Add ({idsToAdd.length})
                </Button>
            </DialogActions>
        </DialogContent>
    );
}
