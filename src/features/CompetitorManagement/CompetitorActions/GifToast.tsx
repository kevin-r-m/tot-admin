import { Snackbar, Slide } from '@mui/material';
import Alert from '@mui/material/Alert';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function GifToast(props: Props) {
    return (
        <Snackbar
            open={props.open}
            autoHideDuration={3000}
            onClose={() => props.setOpen(false)}
            slots={{ transition: Slide }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={() => props.setOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                Gif has been successfully set for competitor!
            </Alert>
        </Snackbar>
    );
}
