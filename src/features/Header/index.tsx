import { AppBar, Avatar, Container, Grid2 as Grid, Typography } from '@mui/material';

export default function Header() {
    return (
        <AppBar position="static">
            <Container>
                <Grid container justifyContent={'space-between'} alignItems={'center'} paddingY={2}>
                    <Typography variant="h4">This or That Admin</Typography>
                    <Avatar sx={{ bgcolor: '#006f49' }}>KM</Avatar>
                </Grid>
            </Container>
        </AppBar>
    );
}
