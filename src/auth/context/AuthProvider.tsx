import { useState, type PropsWithChildren } from 'react';
import { AuthContext, type AuthStatus } from './AuthContext';
import { loginAction } from '../actions/login.action';
import type { User } from '@/interfaces/user.interface';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('not-authenticated');
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

  return (
    <AuthContext
      value={{
        authStatus,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
};
