import { useEffect, useState } from 'react';
import { getCompetitors } from '../api/competitors.ts';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  CircularProgress,
  Container,
  Grid2,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import CompetitorAction from './CompetitorAction.tsx';
import DialogAddCompetitor from './DialogAddCompetitor.tsx';

interface Competitor {
  _id: string;
  name: string;
  image: string;
}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', flex: 0.3 },
  { field: 'name', headerName: 'Competitor Name', flex: 0.5 },
  { field: 'image', headerName: 'Image ID', flex: 1 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    flex: 0.2,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label='Edit'
          className='textPrimary'
          onClick={handleEditClick(id)}
          color='inherit'
        />,
      ];
    },
  },
];

const handleEditClick = (id: GridRowId) => () => {
  console.log(`Edit competitor with ID: ${id}`);
};

const paginationModel = { page: 0, pageSize: 5 };

function CompetitorList() {
  const [competitors, setCompetitors] = useState<object[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<Competitor | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCompetitors = async () => {
      const response = await getCompetitors();
      setCompetitors(response.data);
    };

    fetchCompetitors();
  }, []);

  function updateCompetitors(updatedCompetitor: Competitor) {
    const updatedCompetitors = competitors.map((competitor) => {
      if (competitor._id === updatedCompetitor._id) {
        return updatedCompetitor;
      }
      return competitor;
    });

    setCompetitors(updatedCompetitors);
  }

  if (!competitors.length) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Grid2 container gap={4} direction={'column'} sx={{ marginTop: 4 }}>
      <Paper sx={{ height: '100%', width: '100%', padding: 2, flex: 1 }}>
        {selectedCompetitor ? (
          <CompetitorAction
            competitor={selectedCompetitor}
            updateCompetitors={updateCompetitors}
          />
        ) : (
          <PickACompetitor />
        )}
      </Paper>
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
        <Button
          startIcon={<AddCircleIcon />}
          variant='contained'
          onClick={() => setOpen(true)}
          sx={{ marginBottom: 1 }}>
          Add new competitor
        </Button>
        <DataGrid
          rows={competitors}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, width: '100%', height: '100%' }}
          getRowId={(row) => row._id}
          onRowClick={(item) => {
            setSelectedCompetitor(item.row);
          }}
        />
      </Paper>
      <DialogAddCompetitor open={open} onClose={() => setOpen(false)} />
    </Grid2>
  );
}

export default CompetitorList;

function PickACompetitor() {
  return (
    <Box>
      <Typography variant='h4'>
        Pick a competitor below to see available actions
      </Typography>
    </Box>
  );
}
