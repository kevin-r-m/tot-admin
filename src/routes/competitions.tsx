import RouteLayout from '@/components/Layout/RouteLayout';
import CompetitonManagement from '@/features/CompetitionManagement';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/competitions')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <RouteLayout>
            <CompetitonManagement />
        </RouteLayout>
    );
}
