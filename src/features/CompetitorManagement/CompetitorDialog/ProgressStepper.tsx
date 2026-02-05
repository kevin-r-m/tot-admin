import { Stepper, Step, StepLabel, Typography, CircularProgress, DialogContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Check } from '@mui/icons-material';

const steps = ['Gathering potential competitors', 'Checking competitors against database'];

interface Props {
    activeStep: number;
}

export default function ProgressStepper(props: Props) {
    return (
        <DialogContent>
            <Stepper activeStep={props.activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel
                                icon={
                                    index < props.activeStep ? (
                                        <Check sx={{ bgColor: 'primary.main', borderRadius: '50%' }} />
                                    ) : index === props.activeStep ? (
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
            {props.activeStep === steps.length && (
                <Typography sx={{ mt: 4 }} justifyContent={'center'} display="flex" alignItems="center" gap={1}>
                    <CheckCircleOutlineIcon color="success" fontSize="small" />
                    All competitors checked successfully!
                </Typography>
            )}
        </DialogContent>
    );
}
