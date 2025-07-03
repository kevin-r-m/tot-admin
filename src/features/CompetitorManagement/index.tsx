import { useState } from 'react';
import { useCompetitorsQuery } from '@/api/competitors';

import { Grid2 as Grid } from '@mui/material';
import CompetitorActions from './CompetitorActions';
import CompetitorList from './CompetitorList';
import CompetitorDialog from './CompetitorDialog';

import type { Competitor } from '@/shared/types';

export default function CompetitorManagement() {
    const { data = [], isLoading } = useCompetitorsQuery();
    const [activeCompetitor, setActiveCompetitor] = useState<Competitor | null>(null);
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    function updateCompetitors(updatedCompetitor: Competitor) {
        setCompetitors((prevCompetitors) =>
            prevCompetitors.map((competitor) =>
                competitor._id === updatedCompetitor._id ? { ...competitor, ...updatedCompetitor } : competitor,
            ),
        );
    }

    return (
        <Grid container gap={4} direction={'column'} sx={{ marginTop: 4 }}>
            <CompetitorActions competitor={activeCompetitor} updateCompetitors={updateCompetitors} />
            <CompetitorList
                competitors={data}
                setActiveCompetitor={setActiveCompetitor}
                setDialogOpen={setDialogOpen}
                isLoading={isLoading}
            />
            <CompetitorDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Grid>
    );
}
