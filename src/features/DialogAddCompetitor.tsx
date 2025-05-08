import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
    TextField,
    IconButton,
    CircularProgress,
} from '@mui/material';
import { getAIDescription } from './CompetitorManagement/actions';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

function DialogAddCompetitor({ onClose, open }: SimpleDialogProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleClose() {
        setName('');
        setDescription('');
        onClose();
    }

    async function handleAIDescription() {
        setIsLoading(true);
        const response = await getAIDescription(name);
        if (response) {
            setDescription(response);
        }
        setIsLoading(false);
    }

    return (
        <Dialog onClose={handleClose} open={open} slotProps={{ paper: { content: 'form' } }}>
            <DialogTitle>Add competitor</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    rows={6}
                    multiline
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton
                                    title="Auto-generate"
                                    disabled={!name || isLoading}
                                    onClick={handleAIDescription}
                                >
                                    {isLoading ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <AutoAwesomeIcon color={name ? 'primary' : 'disabled'} />
                                    )}
                                </IconButton>
                            ),
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogAddCompetitor;
