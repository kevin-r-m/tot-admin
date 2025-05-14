import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface AddCompetitorProps {
    setDialogOpen: (open: boolean) => void;
}

export default function AddCompetitor({ setDialogOpen }: AddCompetitorProps) {
    return (
        <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={() => setDialogOpen(true)}
            sx={{ marginBottom: 1 }}
        >
            Add new competitor
        </Button>
    );
}
