import { Grid2 as Grid, CircularProgress } from '@mui/material';

export default function CenteredLoadingSpinner() {
    return (
        <Grid container justifyContent="center" alignItems="center" width={'100%'} padding={4}>
            <CircularProgress />
        </Grid>
    );
}
