import { Box, Button, DialogContent, Divider } from '@mui/material';

interface SelectorProps {
    setView: (view: 'auto' | 'manual') => void;
}

export default function Selector({ setView }: SelectorProps) {
    return (
        <DialogContent>
            <Box display="flex" alignItems="center" justifyContent={'center'} gap={4}>
                <Button variant="contained" color="primary" onClick={() => setView('auto')}>
                    Auto-Generate List
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button variant="outlined" color="secondary" onClick={() => setView('manual')}>
                    Manually Enter
                </Button>
            </Box>
        </DialogContent>
    );
}
