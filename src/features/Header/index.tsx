import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

const pages = ['Competitors', 'Competitions'];

export default function Header() {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }} color="#fff">
                    <Typography variant="h6" component="a" href="/" color="inherit" sx={{ textDecoration: 'none' }}>
                        This or That Admin
                    </Typography>
                    <Box display="flex" gap={2}>
                        {pages.map((page) => (
                            <Typography
                                variant="body1"
                                component="a"
                                href={`/${page.toLowerCase()}`}
                                color="inherit"
                                sx={{ textDecoration: 'none' }}
                                key={page}
                            >
                                {page}
                            </Typography>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
