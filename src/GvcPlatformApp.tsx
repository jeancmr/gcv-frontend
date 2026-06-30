import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';

export const GvcPlatformApp = () => {
  return <RouterProvider router={appRouter} />;
};
