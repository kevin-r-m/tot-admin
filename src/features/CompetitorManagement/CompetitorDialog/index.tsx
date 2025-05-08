import { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from '@mui/material';
import { createCompetitor } from '@/api/competitors';
import type { Competitor } from '@/shared/types';
import { useStreamedDescription } from './useStreamedDescription';
import AIButton from './AIButton';

export interface CompetitorDialogProps {
    open: boolean;
    onClose: () => void;
    addCompetitorToList: (competitors: Competitor) => void;
}

export default function CompetitorDialog({ onClose, open, addCompetitorToList }: CompetitorDialogProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {
        description: streamedDescription,
        streamLoading,
        streamDescription,
        resetStream,
    } = useStreamedDescription();

    function handleClose() {
        setName('');
        setDescription('');
        resetStream();
        onClose();
    }

    function handleAIDescription() {
        resetStream();
        streamDescription(name);
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
                    value={streamedDescription || description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={streamLoading}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <AIButton
                                    isLoading={streamLoading}
                                    disabled={!name || streamLoading}
                                    onClick={handleAIDescription}
                                />
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
