import { useState } from 'react';
import { DialogActions, DialogContent, Button, TextField } from '@mui/material';
import AIButton from './AIButton';
import { createCompetitor } from '@/api/competitors';
import { streamAIDescription } from './actions';
import type { Competitor } from '@/shared/types';
import { Add } from '@mui/icons-material';

interface FormProps {
    addCompetitorsToList: (competitors: Competitor[]) => void;
    handleClose: () => void;
    formFields: {
        name: string;
        description: string;
    };
    setFormFields: React.Dispatch<
        React.SetStateAction<{
            name: string;
            description: string;
        }>
    >;
}

export default function CompetitorForm({ addCompetitorsToList, handleClose, formFields, setFormFields }: FormProps) {
    const [loading, setLoading] = useState(false);

    async function handleAIDescription() {
        setLoading(true);
        setFormFields((curr) => ({ ...curr, description: '' }));
        await streamAIDescription(formFields.name, (chunk) => {
            setFormFields((curr) => ({
                ...curr,
                description: curr.description + chunk,
            }));
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
            addCompetitorsToList([{ _id: created.id, name, description, wins: 0, losses: 0, totalVotes: 0 }]);
        }
        handleClose();
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    required
                    onChange={(e) => setFormFields((curr) => ({ ...curr, name: e.target.value }))}
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
                    value={formFields.description}
                    onChange={(e) => setFormFields((curr) => ({ ...curr, description: e.target.value }))}
                    disabled={loading}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <AIButton
                                    isLoading={loading}
                                    disabled={!formFields.name || loading}
                                    onClick={handleAIDescription}
                                />
                            ),
                        },
                    }}
                />
                <DialogActions sx={{ gap: 2 }}>
                    <Button onClick={handleClose} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button endIcon={<Add />} type="submit" variant="contained" color="success">
                        Add
                    </Button>
                </DialogActions>
            </DialogContent>
        </form>
    );
}
