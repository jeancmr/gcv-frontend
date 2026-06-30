import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appRouter } from './app.router';
import { AuthProvider } from './auth/context/AuthProvider';
import { CheckAuthProvider } from './auth/components/CheckAuthProvider';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient();

export const GvcPlatformApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CheckAuthProvider>
          <RouterProvider router={appRouter} />
          <Toaster />
        </CheckAuthProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
