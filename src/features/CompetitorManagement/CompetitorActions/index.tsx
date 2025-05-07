import { Box, Grid2, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import GifToast from './GifToast';

import { getGifById } from './actions';
import type { IGif } from '@giphy/js-types';
import type { Competitor } from '../types';

import PickACompetitor from './PickCompetitor';
import { GifSearch } from './GifSearch';
import GifDisplay from './GifDisplay';
import UpdateGif from './UpdateGif';

interface CompetitorActionProps {
  competitor: Competitor | null;
  updateCompetitors: (updatedCompetitor: Competitor) => void;
}

export default function CompetitorActions({
  competitor,
  updateCompetitors,
}: CompetitorActionProps) {
  const [open, setOpen] = useState(false);
  const [activeGif, setActiveGif] = useState<IGif | null>(null);
  const [allGifs, setAllGifs] = useState<IGif[]>([]);

  useEffect(() => {
    (async () => {
      if (competitor?.image) {
        const { data } = await getGifById(competitor.image);
        setActiveGif(data);
      }
      setAllGifs([]);
    })();
  }, [competitor]);

  if (!competitor) {
    return <PickACompetitor />;
  }

  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
        padding: 2,
        flex: 0.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
      }}>
      <Grid2 container columns={16}>
        <Grid2
          display='flex'
          flexDirection={'column'}
          justifyContent={'space-between'}
          size={9}>
          <Box>
            <Typography variant='h3' gutterBottom>
              {competitor.name}
            </Typography>
            <Typography variant='body1'>{competitor.description}</Typography>
          </Box>
          <GifSearch
            setGifs={setAllGifs}
            setActiveGif={setActiveGif}
            competitorName={competitor.name}
          />
        </Grid2>
        <Grid2
          container
          spacing={2}
          alignItems='center'
          flexDirection={'column'}
          size={7}>
          <GifDisplay
            competitor={competitor}
            activeGif={activeGif}
            setActiveGif={setActiveGif}
            allGifs={allGifs}
          />
          <UpdateGif
            disabled={!activeGif || competitor?.image === activeGif.id}
            competitor={competitor}
            activeGif={activeGif}
            updateCompetitors={updateCompetitors}
            setOpen={setOpen}
          />
        </Grid2>
      </Grid2>
      <GifToast open={open} setOpen={setOpen} />
    </Paper>
  );
}
