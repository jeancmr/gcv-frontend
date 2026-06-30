import type { Novedad } from '@/interfaces/novedad.interface';
import { NovedadesEmptyScreen } from './NovedadesEmptyScreen';
import { useState } from 'react';
import { NovedadesCard } from './NovedadesCard';

interface NovedadesListProps {
  novedades: Novedad[];
  canApprove?: boolean;
  canCreate?: boolean;
  showColaborador?: boolean;
}

export const NovedadesList = ({
  novedades,
  canApprove,
  canCreate,
  showColaborador,
}: NovedadesListProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const onSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const onApprove = (id: string) => {
    console.log(`Aprobar novedad con ID: ${id}`);
  };

  const onReject = (id: string) => {
    console.log(`Rechazar novedad con ID: ${id}`);
  };

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
              onApprove={canApprove ? onApprove : undefined}
              onReject={canApprove ? onReject : undefined}
              canApprove={canApprove}
            />
          ))}
        </div>
      )}
    </>
  );
};
