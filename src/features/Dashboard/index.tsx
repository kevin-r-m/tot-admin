import CenteredLoadingSpinner from '@/components/UI/CenteredLoadingSpinner';
import { useCompetitorsQuery, useCompetitionsQuery } from '@/shared/actions';

export default function Dashboard() {
    const { isLoading: competitionsLoading } = useCompetitionsQuery();
    const { isLoading: competitorsLoading } = useCompetitorsQuery();
    const isLoading = competitionsLoading || competitorsLoading;

    if (isLoading) {
        return <CenteredLoadingSpinner />;
    }

    return <p>Dashboard</p>;
}
