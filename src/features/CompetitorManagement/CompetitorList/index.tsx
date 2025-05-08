import { Paper } from '@mui/material';
import type { Competitor } from '@/shared/types';

import CompetitorTable from './CompetitorTable';
import AddCompetitor from './AddCompetitor';

interface CompetitorListProps {
    competitors: Competitor[];
    setActiveCompetitor: (competitor: Competitor) => void;
    setDialogOpen: (open: boolean) => void;
}

export default function CompetitorList({ competitors, setActiveCompetitor, setDialogOpen }: CompetitorListProps) {
    return (
        <Paper
            sx={{
                height: '100%',
                width: '100%',
                padding: 2,
                flex: 0.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
            }}
        >
            <AddCompetitor setDialogOpen={setDialogOpen} />
            <CompetitorTable competitors={competitors} setActiveCompetitor={setActiveCompetitor} />
        </Paper>
    );
}
