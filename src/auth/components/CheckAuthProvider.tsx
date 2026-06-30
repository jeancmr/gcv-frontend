import { useEffect, type PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus, authStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (authStatus === 'checking') return <CustomFullScreenLoading />;

  return children;
};
