import { Container, Grid2 as Grid } from '@mui/material';

interface Props {
    children: React.ReactNode;
}

export default function RouteLayout({ children }: Props) {
    return (
        <Container>
            <Grid container spacing={2}>
                {children}
            </Grid>
        </Container>
    );
}
