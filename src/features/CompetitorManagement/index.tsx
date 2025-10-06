import { useState } from 'react';
import { useCompetitorsQuery } from '@/shared/actions';

import { Grid2 as Grid } from '@mui/material';
import CompetitorActions from './CompetitorActions';
import CompetitorList from './CompetitorList';
import CompetitorDialog from './CompetitorDialog';
import CenteredLoadingSpinner from '@/components/UI/CenteredLoadingSpinner';

import type { Competitor } from '@/shared/types';

export default function CompetitorManagement() {
    const { isLoading } = useCompetitorsQuery();
    const [activeCompetitor, setActiveCompetitor] = useState<Competitor | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    if (isLoading) {
        return <CenteredLoadingSpinner />;
    }

    return (
        <Grid container gap={4} direction={'column'} sx={{ marginTop: 4 }} width="100%">
            <CompetitorActions competitor={activeCompetitor} />
            <CompetitorList setActiveCompetitor={setActiveCompetitor} setDialogOpen={setDialogOpen} />
            <CompetitorDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Grid>
    );
}
