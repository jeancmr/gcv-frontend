import type { Novedad } from '@/interfaces/novedad.interface';
import { NovedadesEmptyScreen } from './NovedadesEmptyScreen';
import { NovedadesCard } from './NovedadesCard';
import { useAuth } from '@/auth/hooks/useAuth';
import { UserRole } from '@/interfaces/user.interface';

interface NovedadesListProps {
  novedades: Novedad[];
  errorMessage?: string;
  canCreate?: boolean;
  selectedIds?: Set<string>;
  onSelect?: (id: string) => void;
}

export const NovedadesList = ({
  novedades,
  errorMessage,
  selectedIds = new Set(),
  onSelect,
}: NovedadesListProps) => {
  const { user } = useAuth();

  const canApprove = user?.rol === UserRole.SUPERVISOR;
  const canCreate = user?.rol === UserRole.COLABORADOR;
  const showColaborador = user?.rol !== UserRole.COLABORADOR;

  return (
    <>
      {novedades.length === 0 ? (
        <NovedadesEmptyScreen canCreate={canCreate} errorMessage={errorMessage} />
      ) : (
        <div className="space-y-3">
          {novedades.map((novedad) => (
            <NovedadesCard
              key={novedad.id}
              novedad={novedad}
              showColaborador={showColaborador}
              selected={selectedIds.has(novedad.id.toString())}
              onSelect={canApprove ? onSelect : undefined}
              canApprove={canApprove}
            />
          ))}
        </div>
      )}
    </>
  );
};
