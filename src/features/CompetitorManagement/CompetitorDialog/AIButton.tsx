import { IconButton, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface Props {
    disabled: boolean;
    isLoading: boolean;
    onClick: () => void;
}

export default function AIButton(props: Props) {
    return (
        <IconButton title="Auto-generate" disabled={props.disabled} onClick={props.onClick}>
            {props.isLoading ? (
                <CircularProgress size={20} />
            ) : (
                <AutoAwesomeIcon color={props.disabled ? 'disabled' : 'primary'} />
            )}
        </IconButton>
    );
}
