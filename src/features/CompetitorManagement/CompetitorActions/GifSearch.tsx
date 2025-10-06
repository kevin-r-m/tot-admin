import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    competitorName: string | null;
    setSearchTerm: (term: string) => void;
}

export function GifSearch(props: Props) {
    async function handleGifSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search')?.toString();
        if (!searchTerm) {
            return;
        }
        props.setSearchTerm(searchTerm);
    }

    return (
        <form onSubmit={handleGifSearch}>
            <Box display={'flex'} alignItems={'center'} gap={2}>
                <TextField
                    key={props.competitorName}
                    name="search"
                    label="Search for gifs"
                    fullWidth
                    required
                    defaultValue={props.competitorName}
                />
                <IconButton
                    type="submit"
                    aria-label={'Search'}
                    color="primary"
                    disabled={!props.competitorName}
                    title={'Search for new set of gifs'}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
        </form>
    );
}
