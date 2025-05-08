import { useState, useEffect } from 'react';
import { getCompetitors } from '../../api/competitors';

import { Grid2 } from '@mui/material';
import CompetitorActions from './CompetitorActions';
import CompetitorList from './CompetitorList';

import { Competitor } from './types';
import CompetitorDialog from './CompetitorDialog';

export default function CompetitorManagement() {
    const [activeCompetitor, setActiveCompetitor] = useState<Competitor | null>(null);
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchCompetitors = async () => {
            const response = await getCompetitors();
            setCompetitors(response.data);
        };

        fetchCompetitors();
    }, []);

    function updateCompetitors(updatedCompetitor: Competitor) {
        setCompetitors((prevCompetitors) =>
            prevCompetitors.map((competitor) =>
                competitor._id === updatedCompetitor._id ? { ...competitor, ...updatedCompetitor } : competitor,
            ),
        );
    }

    function addCompetitorToState(newCompetitor: Competitor) {
        setCompetitors((prevCompetitors) => [newCompetitor, ...prevCompetitors]);
    }

    function handleDialogClose() {
        setDialogOpen(false);
    }

    return (
        <Grid2 container gap={4} direction={'column'} sx={{ marginTop: 4 }}>
            <CompetitorActions competitor={activeCompetitor} updateCompetitors={updateCompetitors} />
            <CompetitorList
                competitors={competitors}
                setActiveCompetitor={setActiveCompetitor}
                setDialogOpen={setDialogOpen}
            />
            <CompetitorDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                addCompetitorToState={addCompetitorToState}
            />
        </Grid2>
    );
}
