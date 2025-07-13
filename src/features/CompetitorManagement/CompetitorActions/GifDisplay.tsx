import { Grid2 as Grid, Box, Typography, IconButton } from '@mui/material';
import { Gif } from '@giphy/react-components';

import type { IGif } from '@giphy/js-types';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useQueryClient } from '@tanstack/react-query';

interface GifDisplayProps {
    competitorName: string;
    activeGif: IGif | undefined;
    allGifs: IGif[];
}

export default function GifDisplay({ competitorName, activeGif, allGifs }: GifDisplayProps) {
    const queryClient = useQueryClient();

    function getActiveGifIndex() {
        if (!activeGif) {
            return -1;
        }
        return allGifs.findIndex((gif) => gif.id === activeGif.id);
    }

    function handleNextGif(goPrev: boolean) {
        const currentIndex = allGifs.findIndex((gif) => gif.id === activeGif?.id);
        if (currentIndex === allGifs.length - 1) {
            queryClient.setQueryData(['gif', competitorName], allGifs[0]);
            return;
        }
        if (currentIndex === 0 && goPrev) {
            queryClient.setQueryData(['gif', competitorName], allGifs[allGifs.length - 1]);
            return;
        }
        if (goPrev) {
            queryClient.setQueryData(['gif', competitorName], allGifs[currentIndex - 1]);
            return;
        }
        queryClient.setQueryData(['gif', competitorName], allGifs[currentIndex + 1]);
    }

    return (
        <Grid size={8} display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} gap={2}>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'260px'}
                height={'260px'}
                sx={{ border: '1px dashed black' }}
                borderRadius={1}
                bgcolor={'#f5f5f5'}
            >
                {activeGif ? (
                    <Gif gif={activeGif} width={250} height={250} hideAttribution noLink />
                ) : (
                    <Typography variant="body1">No active gif</Typography>
                )}
            </Box>
            <Grid container spacing={2} columns={3} alignItems="center">
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
            </Grid>
        </Grid>
    );
}
