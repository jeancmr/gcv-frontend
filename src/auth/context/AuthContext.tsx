import { createContext } from 'react';
import type { User } from '@/interfaces/user.interface';

export type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

interface IAuthContext {
  authStatus: AuthStatus;
  user: User | null;

  checkAuthStatus: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
export const AuthContext = createContext({} as IAuthContext);
