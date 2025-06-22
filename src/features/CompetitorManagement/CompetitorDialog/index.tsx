import { useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import type { Competitor } from '@/shared/types';
import Form from './Form';
import Selector from './Selector';
import GeneratedCompetitors from './GeneratedCompetitors';
import { generateCompetitors } from './actions';
import ProgressStepper from './ProgressStepper';

export interface CompetitorDialogProps {
    open: boolean;
    onClose: () => void;
    addCompetitorsToList: (competitors: Competitor[]) => void;
}

export default function CompetitorDialog({ open, onClose, addCompetitorsToList }: CompetitorDialogProps) {
    const [view, setView] = useState<'auto' | 'manual' | 'progress' | null>(null);
    const [rows, setRows] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
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

    async function handleGenerateList() {
        setView('progress');
        const response = await generateCompetitors((step: number) => {
            if (step === 2) {
                setTimeout(() => {
                    setActiveStep(step);
                }, 2000);
            } else {
                setActiveStep(step);
            }
        });
        setRows(response?.data);
        setTimeout(() => {
            setView('auto');
        }, 4000);
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
            <DialogTitle>Add Competitor</DialogTitle>
            {view === 'manual' && (
                <Form
                    addCompetitorsToList={addCompetitorsToList}
                    handleClose={handleClose}
                    formFields={formFields}
                    setFormFields={setFormFields}
                />
            )}
            {view === 'auto' && (
                <GeneratedCompetitors
                    handleClose={handleClose}
                    rows={rows}
                    addCompetitorsToList={addCompetitorsToList}
                />
            )}
            {view === 'progress' && <ProgressStepper activeStep={activeStep} />}
            {view === null && <Selector setView={setView} handleGenerateList={handleGenerateList} />}
        </Dialog>
    );
}
