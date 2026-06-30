import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import { AuthProvider } from './auth/context/AuthProvider';

export const GvcPlatformApp = () => {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
};
