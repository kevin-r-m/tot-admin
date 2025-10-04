import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '@/features/Dashboard';
import RouteLayout from '@/components/Layout/RouteLayout';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <RouteLayout>
            <Dashboard />
        </RouteLayout>
    );
}
