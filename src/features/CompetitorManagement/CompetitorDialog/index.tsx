import { useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';

import type { Competitor } from '@/shared/types';
import Form from './Form';
import Selector from './Selector';
import GeneratedCompetitorList from './GeneratedCompetitorList';

export interface CompetitorDialogProps {
    open: boolean;
    onClose: () => void;
    addCompetitorToList: (competitors: Competitor) => void;
}

export default function CompetitorDialog({ open, onClose, addCompetitorToList }: CompetitorDialogProps) {
    const [view, setView] = useState<'auto' | 'manual' | null>(null);
    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
    });

    function handleClose() {
        setFormFields({ name: '', description: '' });
        onClose();
        setTimeout(() => {
            setView(null);
        }, 250);
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
            <DialogTitle>Add competitor</DialogTitle>
            {view === 'manual' && (
                <Form
                    addCompetitorToList={addCompetitorToList}
                    handleClose={handleClose}
                    formFields={formFields}
                    setFormFields={setFormFields}
                />
            )}
            {view === 'auto' && <GeneratedCompetitorList />}
            {view === null && <Selector setView={setView} />}
        </Dialog>
    );
}
