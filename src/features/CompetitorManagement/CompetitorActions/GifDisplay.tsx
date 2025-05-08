import { Grid2, Box, Typography, IconButton } from '@mui/material';
import { Gif } from '@giphy/react-components';

import type { IGif } from '@giphy/js-types';
import { Competitor } from '../types';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

interface GifDisplayProps {
    competitor: Competitor | null;
    activeGif: IGif | null;
    setActiveGif: (gif: IGif | null) => void;
    allGifs: IGif[];
}

export default function GifDisplay({ activeGif, setActiveGif, allGifs }: GifDisplayProps) {
    function getActiveGifIndex() {
        if (!activeGif) {
            return -1;
        }
        return allGifs.findIndex((gif) => gif.id === activeGif.id);
    }

    function handleNextGif(goPrev: boolean) {
        const currentIndex = allGifs.findIndex((gif) => gif.id === activeGif?.id);
        if (currentIndex === allGifs.length - 1) {
            setActiveGif(allGifs[0]);
            return;
        }
        if (currentIndex === 0 && goPrev) {
            setActiveGif(allGifs[allGifs.length - 1]);
            return;
        }
        if (goPrev) {
            setActiveGif(allGifs[currentIndex - 1]);
            return;
        }
        setActiveGif(allGifs[currentIndex + 1]);
    }

    return (
        <Grid2 size={8} display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} gap={2}>
            {activeGif ? (
                <Gif gif={activeGif} width={300} height={300} hideAttribution noLink />
            ) : (
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'300px'}
                    height={'300px'}
                    sx={{ border: '1px dashed black' }}
                >
                    <Typography variant="body1">No active gif</Typography>
                </Box>
            )}
            <Grid2 container spacing={2} columns={3} alignItems="center">
                <IconButton
                    color="primary"
                    disabled={!activeGif || allGifs.length === 0}
                    onClick={() => handleNextGif(true)}
                >
                    <ArrowCircleLeftIcon />
                </IconButton>
                <Typography variant="body1" sx={{ margin: '0 16px' }}>
                    {allGifs?.length > 0 ? getActiveGifIndex() + 1 : 1} / {allGifs?.length || 1}
                </Typography>
                <IconButton
                    color="primary"
                    disabled={!activeGif || allGifs.length === 0}
                    onClick={() => handleNextGif(false)}
                >
                    <ArrowCircleRightIcon />
                </IconButton>
            </Grid2>
        </Grid2>
    );
}
