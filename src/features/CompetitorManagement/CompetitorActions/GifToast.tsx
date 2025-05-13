import { Snackbar, Slide } from '@mui/material';
import Alert from '@mui/material/Alert';

interface GifToastProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function GifToast({ open, setOpen }: GifToastProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            slots={{ transition: Slide }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={() => setOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                Gif has been successfully set for competitor!
            </Alert>
        </Snackbar>
    );
}
