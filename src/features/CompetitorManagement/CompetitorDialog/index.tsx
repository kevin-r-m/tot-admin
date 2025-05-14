import { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from '@mui/material';
import AIButton from './AIButton';

import { createCompetitor } from '@/api/competitors';
import { streamAIDescription } from './actions';
import type { Competitor } from '@/shared/types';

import { Add } from '@mui/icons-material';

export interface CompetitorDialogProps {
    open: boolean;
    onClose: () => void;
    addCompetitorToList: (competitors: Competitor) => void;
}

export default function CompetitorDialog({ open, onClose, addCompetitorToList }: CompetitorDialogProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    function handleClose() {
        setName('');
        setDescription('');
        onClose();
    }

    async function handleAIDescription() {
        setLoading(true);
        setDescription('');
        await streamAIDescription(name, (chunk) => {
            setDescription((curr) => curr + chunk);
        });
        setLoading(false);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        const created = await createCompetitor(name, description);
        if (created.success) {
            addCompetitorToList({ _id: created.id, name, description, wins: 0, losses: 0, totalVotes: 0 });
        }
        handleClose();
    }

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullWidth
            maxWidth="md"
            slotProps={{ paper: { component: 'form', onSubmit: handleSubmit } }}
        >
            <DialogTitle>Add competitor</DialogTitle>
            <DialogContent>
                <TextField
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
                    disabled={loading}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <AIButton
                                    isLoading={loading}
                                    disabled={!name || loading}
                                    onClick={handleAIDescription}
                                />
                            ),
                        },
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ gap: 2 }}>
                <Button onClick={handleClose} variant="outlined" color="error">
                    Cancel
                </Button>
                <Button startIcon={<Add />} type="submit" variant="contained" color="success">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
