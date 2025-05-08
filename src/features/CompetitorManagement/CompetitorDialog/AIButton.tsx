import { IconButton, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface AIButtonProps {
    disabled: boolean;
    isLoading: boolean;
    onClick: () => void;
}

export default function AIButton({ disabled, isLoading, onClick }: AIButtonProps) {
    return (
        <IconButton title="Auto-generate" disabled={disabled} onClick={onClick}>
            {isLoading ? <CircularProgress size={20} /> : <AutoAwesomeIcon color={disabled ? 'disabled' : 'primary'} />}
        </IconButton>
    );
}
