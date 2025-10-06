import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
    setDialogOpen: (open: boolean) => void;
}

export default function AddCompetitor(props: Props) {
    return (
        <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={() => props.setDialogOpen(true)}
            sx={{ marginBottom: 1 }}
        >
            Add new competitor
        </Button>
    );
}
