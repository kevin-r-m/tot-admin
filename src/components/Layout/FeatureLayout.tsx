import { Grid2 as Grid } from '@mui/material';

interface Props {
    children: React.ReactNode;
}

export default function FeatureLayout({ children }: Props) {
    return (
        <Grid container spacing={4} width="100%">
            {children}
        </Grid>
    );
}
