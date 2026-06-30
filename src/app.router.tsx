import { createBrowserRouter, Navigate } from 'react-router';
import { NovedadLayout } from './layout/NovedadLayout';
import { NovedadesPage } from './GvcPlatform/pages/novedades/NovedadesPage';
import { NovedadesFormPage } from './GvcPlatform/pages/NovedadesForm/NovedadesFormPage';
import { AuthLayout } from './auth/layout/AuthLayout';
import { LoginPage } from './auth/pages/Login/LoginPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <NovedadLayout />,
    children: [
      { index: true, element: <Navigate to="/novedades" /> },
      {
        path: 'novedades',
        element: <NovedadesPage />,
      },
      {
        path: 'nueva-novedad',
        element: <NovedadesFormPage />,
      },
    ],
  },

  //   AUTH routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
