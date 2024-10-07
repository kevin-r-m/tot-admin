import {
  Box,
  Grid2,
  Button,
  Snackbar,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import Grow, { GrowProps } from '@mui/material/Grow';
import { useState, useEffect } from 'react';
import { updateCompetitorImage } from '../api/competitors';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';

import { Gif } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import IGif from '@giphy/js-types';

type IGif = typeof IGif;

interface Competitor {
  _id: string;
  name: string;
  image?: string;
  description: string;
}

interface CompetitorActionProps {
  competitor: Competitor;
  updateCompetitors: (updatedCompetitor: Competitor) => void;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

function CompetitorAction({
  competitor,
  updateCompetitors,
}: CompetitorActionProps) {
  const [open, setOpen] = useState(false);
  const [activeGif, setActiveGif] = useState<IGif | null>(null);
  const [allGifs, setAllGifs] = useState<IGif[]>([]);
  const [searchTerm, setSearchTerm] = useState(competitor?.name || '');
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      if (!competitor) {
        return;
      }
      if (competitor.image) {
        const gf = new GiphyFetch('2KAC6HgjP9yqJXJ10FosNS2pgmp4hsr5');
        const { data } = await gf.gif(competitor.image);
        setActiveGif(data);
        return;
      }
    })();
    setActiveGif(null);
    setShowRefresh(false);
    setSearchTerm(competitor?.name || '');
  }, [competitor]);

  if (!competitor) {
    return null;
  }

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

  function handleClose(
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  function handleNextGif() {
    const currentIndex = allGifs.findIndex((gif) => gif.id === activeGif?.id);
    if (currentIndex === allGifs.length - 1) {
      setActiveGif(allGifs[0]);
      return;
    }
    setActiveGif(allGifs[currentIndex + 1]);
  }

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setShowRefresh(false);
  }

  async function handleGifSearch() {
    if (!searchTerm) {
      return;
    }
    const gf = new GiphyFetch('2KAC6HgjP9yqJXJ10FosNS2pgmp4hsr5');
    const { data: gifs } = await gf.search(searchTerm, {
      sort: 'relevant',
      lang: 'en',
      limit: 10,
      type: 'gifs',
    });
    setActiveGif(gifs[0]);
    setAllGifs(gifs);
    setShowRefresh(true);
  }

  return (
    <>
      <Grid2 container columns={16}>
        <Grid2
          display='flex'
          flexDirection={'column'}
          justifyContent={'space-between'}
          size={8}>
          <Box>
            <Typography variant='h3' gutterBottom>
              {competitor.name}
            </Typography>
            <Typography variant='body1'>{competitor.description}</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <TextField
              label='Search for gif'
              onChange={handleSearchTermChange}
              value={searchTerm}
              fullWidth
            />
            <IconButton
              aria-label={showRefresh ? 'Refresh' : 'Search'}
              color='primary'
              disabled={!searchTerm}
              onClick={showRefresh ? handleNextGif : handleGifSearch}
              title={
                showRefresh
                  ? 'Refresh for a new gif'
                  : 'Search for new set of gifs'
              }>
              <SearchOrRefreshIcon showRefresh={showRefresh} />
            </IconButton>
          </Box>
        </Grid2>
        <Grid2
          size={8}
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection={'column'}
          gap={2}>
          {activeGif ? (
            <Gif gif={activeGif} width={300} height={300} hideAttribution />
          ) : (
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              width={'300px'}
              height={'300px'}
              sx={{ border: '1px dashed black' }}>
              <Typography variant='body1'>No active gif</Typography>
            </Box>
          )}
          <Button
            onClick={handleSetGif}
            variant='contained'
            disabled={!activeGif}>
            Update competitor's gif
          </Button>
        </Grid2>
      </Grid2>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={'Gif has been successfully set for competitor!'}
        TransitionComponent={GrowTransition}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </>
  );
}

function SearchOrRefreshIcon({ showRefresh }: { showRefresh: boolean }) {
  if (showRefresh) {
    return <CachedIcon />;
  }
  return <SearchIcon />;
}

export default CompetitorAction;
