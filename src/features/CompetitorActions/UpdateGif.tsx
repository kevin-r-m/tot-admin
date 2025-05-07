import { Button } from '@mui/material';
import { updateCompetitorImage } from '../../api/competitors';

import type { Competitor } from './types';
import type { IGif } from '@giphy/js-types';

interface UpdateGifProps {
  disabled: boolean;
  competitor: Competitor | null;
  activeGif: IGif | null;
  updateCompetitors: (updatedCompetitor: Competitor) => void;
  setOpen: (open: boolean) => void;
}

export default function UpdateGif({
  disabled,
  competitor,
  activeGif,
  updateCompetitors,
  setOpen,
}: UpdateGifProps) {
  async function handleSetGif() {
    if (!competitor || !activeGif) {
      return;
    }
    try {
      await updateCompetitorImage(competitor._id, activeGif.id);
      updateCompetitors({ ...competitor, image: activeGif.id });
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button variant='contained' disabled={disabled} onClick={handleSetGif}>
      Update competitor's gif
    </Button>
  );
}
