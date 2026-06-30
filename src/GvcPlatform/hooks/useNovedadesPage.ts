import { useAuth } from '@/auth/hooks/useAuth';
import { NovedadEstado, type Novedad } from '@/interfaces/novedad.interface';
import { UserRole } from '@/interfaces/user.interface';
import { useState } from 'react';

export const useNovedadesPage = (novedades: Novedad[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { user } = useAuth();

  const canApprove = user?.rol === UserRole.SUPERVISOR;

  const pendingFiltered = novedades.filter((n) => n.estado === NovedadEstado.PENDIENTE).length;

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

  const selectAllPending = () => {
    const pendingIds = novedades
      .filter((n) => n.estado === NovedadEstado.PENDIENTE)
      .map((n) => n.id.toString());
    setSelectedIds(new Set(pendingIds));
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkApprove = () => {
    console.log(`Aprobar novedades con IDs: ${Array.from(selectedIds).join(', ')}`);
  };
  return {
    canApprove,
    pendingFiltered,
    selectedIds,
    onSelect,
    selectAllPending,
    handleClearSelection,
    handleBulkApprove,
  };
};
