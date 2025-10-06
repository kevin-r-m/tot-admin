import { Paper } from '@mui/material';
import type { Competitor } from '@/shared/types';

import CompetitorTable from './CompetitorTable';
import AddCompetitor from './AddCompetitor';

interface Props {
    setActiveCompetitor: (competitor: Competitor) => void;
    setDialogOpen: (open: boolean) => void;
}

export default function CompetitorList(props: Props) {
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
            <AddCompetitor setDialogOpen={props.setDialogOpen} />
            <CompetitorTable setActiveCompetitor={props.setActiveCompetitor} />
        </Paper>
    );
}
