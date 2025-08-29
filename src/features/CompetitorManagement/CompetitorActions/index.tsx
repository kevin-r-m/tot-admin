import { Box, Grid2 as Grid, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import GifToast from './GifToast';
import { useGifQuery, useGifsByTermQuery } from '../actions';
import type { Competitor } from '@/shared/types';
import PickACompetitor from './PickCompetitor';
import { GifSearch } from './GifSearch';
import GifDisplay from './GifDisplay';
import UpdateGif from './UpdateGif';

interface CompetitorActionProps {
    competitor: Competitor | null;
}

export default function CompetitorActions({ competitor }: CompetitorActionProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const { data: gif } = useGifQuery(competitor?.image || '', competitor?.name || '');
    const { data: gifs = [] } = useGifsByTermQuery(searchTerm || '');

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
            }}
        >
            <Grid container columns={16}>
                <Grid display="flex" flexDirection={'column'} justifyContent={'space-between'} size={9}>
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            {competitor.name}
                        </Typography>
                        <Typography variant="body1">{competitor.description}</Typography>
                    </Box>
                    <GifSearch setSearchTerm={setSearchTerm} competitorName={competitor.name} />
                </Grid>
                <Grid container spacing={2} alignItems="center" flexDirection={'column'} size={7}>
                    <GifDisplay competitorName={competitor.name} activeGif={gif} allGifs={gifs} />
                    <UpdateGif
                        disabled={!gif || competitor?.image === gif.id}
                        competitor={competitor}
                        activeGif={gif}
                        setOpen={setOpen}
                    />
                </Grid>
            </Grid>
            <GifToast open={open} setOpen={setOpen} />
        </Paper>
    );
}
