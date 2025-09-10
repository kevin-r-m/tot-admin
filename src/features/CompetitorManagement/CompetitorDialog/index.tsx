import { useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import Form from './Form';
import Selector from './Selector';
import GeneratedCompetitors from './GeneratedCompetitors';
import { generateCompetitors } from '@/api/agent';
import ProgressStepper from './ProgressStepper';

export interface CompetitorDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function CompetitorDialog({ open, onClose }: CompetitorDialogProps) {
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
                <Form handleClose={handleClose} formFields={formFields} setFormFields={setFormFields} />
            )}
            {view === 'auto' && <GeneratedCompetitors handleClose={handleClose} rows={rows} />}
            {view === 'progress' && <ProgressStepper activeStep={activeStep} />}
            {view === null && <Selector setView={setView} handleGenerateList={handleGenerateList} />}
        </Dialog>
    );
}
