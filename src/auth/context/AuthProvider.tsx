import { useState, type PropsWithChildren } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext, type AuthStatus } from './AuthContext';
import { loginAction } from '../actions/login.action';
import type { User } from '@/interfaces/user.interface';
import { checkAuthAction } from '../actions/check-auth.action';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { data: user, token } = await loginAction(email, password);
      queryClient.removeQueries({ queryKey: ['novedades'] });
      queryClient.removeQueries({ queryKey: ['novedades-stats'] });

      localStorage.setItem('token', token);

      setUser(user);
      setAuthStatus('authenticated');
    } catch (error) {
      localStorage.removeItem('token');

      setUser(null);
      setAuthStatus('not-authenticated');
      throw new Error((error as Error).message, { cause: error });
    }
  };

  const logout = () => {
    queryClient.removeQueries({ queryKey: ['novedades'] });
    queryClient.removeQueries({ queryKey: ['novedades-stats'] });

    localStorage.removeItem('token');

    setUser(null);
    setAuthStatus('not-authenticated');
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      logout();
      throw new Error('No token');
    }

    try {
      const user = await checkAuthAction();
      setUser(user);
      setAuthStatus('authenticated');
      return user;
    } catch {
      logout();
    }
  };

  return (
    <AuthContext
      value={{
        authStatus,
        user,
        checkAuthStatus,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
};
