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
import { getAIDescription } from '../actions';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { createCompetitor } from '../../../api/competitors';
import { Competitor } from '../../../shared/types';

export interface CompetitorDialogProps {
    open: boolean;
    onClose: () => void;
    addCompetitorToState: (competitors: Competitor) => void;
}

export default function CompetitorDialog({ onClose, open, addCompetitorToState }: CompetitorDialogProps) {
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

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const created = await createCompetitor(name, description);
        if (created.success) {
            addCompetitorToState({ _id: created.id, name, description, wins: 0, losses: 0, totalVotes: 0 });
        }
        handleClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add competitor</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        name="description"
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
            </form>
        </Dialog>
    );
}
