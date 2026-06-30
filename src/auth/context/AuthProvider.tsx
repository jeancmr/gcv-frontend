import { useState, type PropsWithChildren } from 'react';
import { AuthContext, type AuthStatus } from './AuthContext';
import { loginAction } from '../actions/login.action';
import type { User } from '@/interfaces/user.interface';
import { checkAuthAction } from '../actions/check-auth.action';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { data: user, token } = await loginAction(email, password);
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
    localStorage.removeItem('token');
    setUser(null);
    setAuthStatus('not-authenticated');
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    setAuthStatus('checking');

    if (!token) {
      logout();
      return;
    }

    try {
      const user = await checkAuthAction();
      setUser(user);
      setAuthStatus('authenticated');
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
