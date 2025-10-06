import { useState } from 'react';
import { DialogActions, DialogContent, Button, TextField } from '@mui/material';
import { useCreateCompetitorMutation } from '@/features/CompetitorManagement/actions';
import AIButton from './AIButton';
import { streamAIDescription } from '@/api/agent';
import { Add } from '@mui/icons-material';

interface Props {
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

export default function Form(props: Props) {
    const [loading, setLoading] = useState(false);
    const { mutate: createCompetitor } = useCreateCompetitorMutation();

    async function handleAIDescription() {
        setLoading(true);
        props.setFormFields((curr) => ({ ...curr, description: '' }));
        await streamAIDescription(props.formFields.name, (chunk) => {
            props.setFormFields((curr) => ({
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

        createCompetitor({ name, description });

        props.handleClose();
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
                    onChange={(e) => props.setFormFields((curr) => ({ ...curr, name: e.target.value }))}
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
                    value={props.formFields.description}
                    onChange={(e) => props.setFormFields((curr) => ({ ...curr, description: e.target.value }))}
                    disabled={loading}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <AIButton
                                    isLoading={loading}
                                    disabled={!props.formFields.name || loading}
                                    onClick={handleAIDescription}
                                />
                            ),
                        },
                    }}
                />
                <DialogActions sx={{ gap: 2 }}>
                    <Button onClick={props.handleClose} variant="outlined" color="error">
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
