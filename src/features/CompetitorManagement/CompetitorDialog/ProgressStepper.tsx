import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { CircularProgress, DialogContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Check } from '@mui/icons-material';

const steps = ['Gathering potential competitors', 'Checking competitors against database'];

export default function ProgressStepper({ activeStep }: { activeStep: number }) {
    return (
        <DialogContent>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel
                                icon={
                                    index < activeStep ? (
                                        <Check sx={{ bgColor: 'primary.main', borderRadius: '50%' }} />
                                    ) : index === activeStep ? (
                                        <CircularProgress size={20} />
                                    ) : undefined
                                }
                            >
                                <Typography variant="body2">{label}</Typography>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length && (
                <Typography sx={{ mt: 4 }} justifyContent={'center'} display="flex" alignItems="center" gap={1}>
                    <CheckCircleOutlineIcon color="success" fontSize="small" />
                    All competitors checked successfully!
                </Typography>
            )}
        </DialogContent>
    );
}
