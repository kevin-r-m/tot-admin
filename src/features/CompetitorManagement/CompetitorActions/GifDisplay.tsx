import { Grid2 as Grid, Box, Typography, IconButton } from '@mui/material';
import { Gif } from '@giphy/react-components';

import type { IGif } from '@giphy/js-types';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    competitorName: string;
    activeGif: IGif | undefined;
    allGifs: IGif[];
}

export default function GifDisplay(props: Props) {
    const queryClient = useQueryClient();

    function getActiveGifIndex() {
        if (!props.activeGif) {
            return -1;
        }
        return props.allGifs.findIndex((gif) => gif.id === props.activeGif?.id);
    }

    function handleNextGif(goPrev: boolean) {
        const currentIndex = props.allGifs.findIndex((gif) => gif.id === props.activeGif?.id);
        if (currentIndex === props.allGifs.length - 1) {
            queryClient.setQueryData(['gif', props.competitorName], props.allGifs[0]);
            return;
        }
        if (currentIndex === 0 && goPrev) {
            queryClient.setQueryData(['gif', props.competitorName], props.allGifs[props.allGifs.length - 1]);
            return;
        }
        if (goPrev) {
            queryClient.setQueryData(['gif', props.competitorName], props.allGifs[currentIndex - 1]);
            return;
        }
        queryClient.setQueryData(['gif', props.competitorName], props.allGifs[currentIndex + 1]);
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
                {props.activeGif ? (
                    <Gif gif={props.activeGif} width={250} height={250} hideAttribution noLink />
                ) : (
                    <Typography variant="body1">No active gif</Typography>
                )}
            </Box>
            <Grid container spacing={2} columns={3} alignItems="center">
                <IconButton
                    color="primary"
                    disabled={!props.activeGif || props.allGifs.length === 0}
                    onClick={() => handleNextGif(true)}
                >
                    <ArrowCircleLeftIcon />
                </IconButton>
                <Typography variant="body1" sx={{ margin: '0 16px' }}>
                    {props.allGifs?.length > 0 ? getActiveGifIndex() + 1 : 1} / {props.allGifs?.length || 1}
                </Typography>
                <IconButton
                    color="primary"
                    disabled={!props.activeGif || props.allGifs.length === 0}
                    onClick={() => handleNextGif(false)}
                >
                    <ArrowCircleRightIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
