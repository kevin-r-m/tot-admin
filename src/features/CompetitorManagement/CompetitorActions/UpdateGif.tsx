import { Button } from '@mui/material';
import { useUpdateCompetitorImageMutation } from '@/features/CompetitorManagement/actions';

import type { Competitor } from '@/shared/types';
import type { IGif } from '@giphy/js-types';

interface Props {
    disabled: boolean;
    competitor: Competitor | null;
    activeGif: IGif | undefined;
    setOpen: (open: boolean) => void;
}

export default function UpdateGif(props: Props) {
    const { mutate: updateImage } = useUpdateCompetitorImageMutation();

    function handleSetGif() {
        if (!props.competitor || !props.activeGif) {
            return;
        }
        try {
            updateImage({ id: props.competitor._id!, image: props.activeGif.id });
            props.setOpen(true);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Button variant="contained" disabled={props.disabled} onClick={handleSetGif}>
            Update competitor's gif
        </Button>
    );
}
