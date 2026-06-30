import type { Novedad } from '@/interfaces/novedad.interface';
import { NovedadesEmptyScreen } from './NovedadesEmptyScreen';
import { NovedadesCard } from './NovedadesCard';

interface NovedadesListProps {
  novedades: Novedad[];
  canApprove?: boolean;
  canCreate?: boolean;
  showColaborador?: boolean;
  selectedIds?: Set<string>;
  onSelect?: (id: string) => void;
}

export const NovedadesList = ({
  novedades,
  canApprove,
  canCreate,
  showColaborador,
  selectedIds = new Set(),
  onSelect,
}: NovedadesListProps) => {
  return (
    <>
      {novedades.length === 0 ? (
        <NovedadesEmptyScreen canCreate={canCreate} />
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
