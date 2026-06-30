import { useQuery } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { useAuth } from '../hooks/useAuth';

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuth();

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};
