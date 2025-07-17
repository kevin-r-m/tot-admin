import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface GifSearchProps {
    competitorName: string | null;
    setSearchTerm: (term: string) => void;
}

export function GifSearch({ competitorName = '', setSearchTerm }: GifSearchProps) {
    async function handleGifSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search')?.toString();
        if (!searchTerm) {
            return;
        }
        setSearchTerm(searchTerm);
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
                >
                    <SearchIcon />
                </IconButton>
            </Box>
        </form>
    );
}
