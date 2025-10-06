import { Grid2 as Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export default function QuickActions() {
    return (
        <Grid display="flex" flexDirection="row" width="100%" flexWrap={'wrap'} gap={2}>
            <Button variant="contained" startIcon={<AddIcon />}>
                Add Competitor
            </Button>
            <Button variant="contained" startIcon={<CreateNewFolderIcon />}>
                Add Competition
            </Button>
            <Button variant="contained" startIcon={<EditNoteIcon />}>
                Modify Current Competition
            </Button>
        </Grid>
    );
}
