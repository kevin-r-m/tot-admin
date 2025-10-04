import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '@/features/Header';

const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Outlet />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
