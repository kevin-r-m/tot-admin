import RouteLayout from '@/components/Layout/RouteLayout';
import CompetitorManagement from '@/features/CompetitorManagement';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/competitors')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <RouteLayout>
            <CompetitorManagement />
        </RouteLayout>
    );
}
