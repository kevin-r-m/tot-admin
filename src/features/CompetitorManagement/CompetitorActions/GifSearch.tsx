import { useState } from 'react';

import { Box, IconButton, TextField } from '@mui/material';

import { getGifsByTerm } from './actions';
import { IGif } from '@giphy/js-types';

import SearchIcon from '@mui/icons-material/Search';
import { useQueryClient } from '@tanstack/react-query';

interface GifSearchProps {
    competitorName: string | null;
    setGifs: (gifs: IGif[]) => void;
}

export function GifSearch({ competitorName = '', setGifs }: GifSearchProps) {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    async function handleGifSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search')?.toString();
        if (!searchTerm) {
            return;
        }
        setLoading(true);
        const { data: gifs } = await getGifsByTerm(searchTerm);
        setGifs(gifs);
        setLoading(false);
        queryClient.setQueryData(['gif', competitorName], gifs[0]);
    }

    return (
        <form onSubmit={handleGifSearch}>
            <Box display={'flex'} alignItems={'center'} gap={2}>
                <TextField
                    key={competitorName}
                    name="search"
                    label="Search for gifs"
                    fullWidth
                    required
                    defaultValue={competitorName}
                />
                <IconButton
                    type="submit"
                    aria-label={'Search'}
                    color="primary"
                    disabled={!competitorName}
                    title={'Search for new set of gifs'}
                    loading={loading}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
        </form>
    );
}
