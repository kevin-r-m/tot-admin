import FeatureLayout from '@/components/Layout/FeatureLayout';
import CompetitionTable from './CompetitionTable';
import { useCompetitionsQuery } from '@/shared/actions';
import CenteredLoadingSpinner from '@/components/UI/CenteredLoadingSpinner';

export default function CompetitionManagement() {
    const { isLoading } = useCompetitionsQuery();

    if (isLoading) {
        return <CenteredLoadingSpinner />;
    }

    return (
        <FeatureLayout>
            <CompetitionTable />
        </FeatureLayout>
    );
}
