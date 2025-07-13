import { Button } from '@mui/material';
import { useUpdateCompetitorImageMutation } from '@/api/competitors';

import type { Competitor } from '@/shared/types';
import type { IGif } from '@giphy/js-types';

interface UpdateGifProps {
    disabled: boolean;
    competitor: Competitor | null;
    activeGif: IGif | undefined;
    setOpen: (open: boolean) => void;
}

export default function UpdateGif({ disabled, competitor, activeGif, setOpen }: UpdateGifProps) {
    const { mutate: updateImage } = useUpdateCompetitorImageMutation();

    function handleSetGif() {
        if (!competitor || !activeGif) {
            return;
        }
        try {
            updateImage({ id: competitor._id!, image: activeGif.id });
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Button variant="contained" disabled={disabled} onClick={handleSetGif}>
            Update competitor's gif
        </Button>
    );
}
