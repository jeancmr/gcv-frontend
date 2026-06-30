import { useAuth } from '@/auth/hooks/useAuth';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { GCVLogo } from './GCVLogo';

export const CustomHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <GCVLogo />
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-medium leading-tight">{user.nombre}</div>
              <div className="text-[11px] text-muted-foreground">
                {user.rol.toLowerCase()} · {user.filial.nombre}
              </div>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
              {user.nombre
                .split(' ')
                .map((s) => s[0])
                .slice(0, 2)
                .join('')}
            </div>

            <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
