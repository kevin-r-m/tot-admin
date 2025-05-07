import { Snackbar, Grow } from '@mui/material';
import type { GrowProps } from '@mui/material/Grow';

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
      message={'Gif has been successfully set for competitor!'}
      slots={{ transition: GrowTransition }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    />
  );
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}
