import { useAuth } from '@/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/interfaces/user.interface';
import { Download, Plus } from 'lucide-react';

export const NovedadesHeader = () => {
  const { user } = useAuth();

  const canExport = user?.rol === UserRole.RRHH;
  const canCreate = user?.rol === UserRole.COLABORADOR;

  const userRole = user?.rol;

  return (
    <header className="flex items-center justify-between mb-6 gap-3 flex-wrap">
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          {userRole === UserRole.COLABORADOR && 'Mis novedades'}
          {userRole === UserRole.SUPERVISOR && 'Aprobación de novedades'}
          {userRole === UserRole.RRHH && 'Novedades de la filial'}
        </h1>

        <p className="text-sm text-muted-foreground mt-0.5">
          {userRole === UserRole.COLABORADOR && 'Registro y seguimiento de tus novedades de nómina'}

          {userRole === UserRole.SUPERVISOR && 'Revisión y aprobación de novedades del equipo'}

          {userRole === UserRole.RRHH && 'Consulta y exportación de novedades para nómina'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {canCreate && (
          <Button
            onClick={() => console.log('Crear novedad')}
            size="lg"
            className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={15} aria-hidden="true" />
            Nueva novedad
          </Button>
        )}

        {canExport && (
          <Button
            size="lg"
            onClick={() => console.log('Exportar CSV')}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Download size={15} aria-hidden="true" />
            Exportar CSV
          </Button>
        )}
      </div>
    </header>
  );
};
