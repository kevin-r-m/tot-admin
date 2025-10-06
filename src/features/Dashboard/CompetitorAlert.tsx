import { useCompetitorsQuery } from '@/shared/actions';
import { Alert, Link, Typography } from '@mui/material';

export default function CompetitorAlert() {
    const { data: competitors = [] } = useCompetitorsQuery();
    const competitorsMissingGifs = competitors.filter((c) => !c.image);

    if (competitorsMissingGifs.length === 0) return null;

    return (
        <Alert severity="warning">
            <Typography variant="body2" gutterBottom>
                {competitorsMissingGifs.length} competitors are missing gif assignments -- this may cause issues with
                competition creation.
            </Typography>
            <Typography variant="body2">
                Please <Link href="/competitors">review now</Link>.
            </Typography>
        </Alert>
    );
}
