import { Paper } from '@mui/material';
import { Competitor } from '../types';

import CompetitorTable from './CompetitorTable';
import AddCompetitor from './AddCompetitor';

interface CompetitorListProps {
  competitors: Competitor[];
  setActiveCompetitor: (competitor: Competitor) => void;
  //   openAddDialog: () => void;
}

export default function CompetitorList({
  competitors,
  setActiveCompetitor,
}: CompetitorListProps) {
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
      }}>
      <AddCompetitor />
      <CompetitorTable
        competitors={competitors}
        setActiveCompetitor={setActiveCompetitor}
      />
    </Paper>
  );
}
