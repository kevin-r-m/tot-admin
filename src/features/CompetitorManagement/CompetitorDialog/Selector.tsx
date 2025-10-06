import { Box, Button, DialogContent, Divider } from '@mui/material';

interface Props {
    setView: (view: 'auto' | 'manual') => void;
    handleGenerateList: () => void;
}

export default function Selector(props: Props) {
    return (
        <DialogContent>
            <Box display="flex" alignItems="center" justifyContent={'center'} gap={4}>
                <Button variant="contained" color="primary" onClick={props.handleGenerateList}>
                    Auto-Generate List
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button variant="outlined" color="secondary" onClick={() => props.setView('manual')}>
                    Manually Enter
                </Button>
            </Box>
        </DialogContent>
    );
}
