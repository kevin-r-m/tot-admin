import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddCompetitor() {
  return (
    <Button
      startIcon={<AddCircleIcon />}
      variant='contained'
      // onClick={openAddDialog}
      sx={{ marginBottom: 1 }}>
      Add new competitor
    </Button>
  );
}
