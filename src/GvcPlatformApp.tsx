import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import { AuthProvider } from './auth/context/AuthProvider';
import { CheckAuthProvider } from './auth/components/CheckAuthProvider';

export const GvcPlatformApp = () => {
  return (
    <AuthProvider>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
    </AuthProvider>
  );
};
