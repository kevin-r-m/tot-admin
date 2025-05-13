import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface AddCompetitorProps {
    setDialogOpen: (open: boolean) => void;
}

export default function AddCompetitor({ setDialogOpen }: AddCompetitorProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleAddManually() {
        setDialogOpen(true);
        handleClose();
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                startIcon={<AddCircleIcon />}
                onClick={handleClick}
                sx={{ marginBottom: 1 }}
            >
                Add new competitor
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: { 'aria-labelledby': 'basic-button' },
                }}
            >
                <MenuItem onClick={handleClose}>Have AI help</MenuItem>
                <MenuItem onClick={handleAddManually}>Do it myself</MenuItem>
            </Menu>
        </div>
    );
}
