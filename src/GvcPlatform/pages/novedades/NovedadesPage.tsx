import { useAuth } from '@/auth/hooks/useAuth';
import { updateNovedadAction } from '@/GvcPlatform/actions/update-novedad-estado.action';
import { NovedadesFilter } from '@/GvcPlatform/components/NovedadesFilter';
import { NovedadesHeader } from '@/GvcPlatform/components/NovedadesHeader';
import { NovedadesList } from '@/GvcPlatform/components/NovedadesList';
import { NovedadesStatsCards } from '@/GvcPlatform/components/NovedadesStatsCards';
import { NovedadesSupervisorBulkBar } from '@/GvcPlatform/components/NovedadesSupervisorBulkBar';
import { useNovedades } from '@/GvcPlatform/hooks/useNovedades';
import { useNovedadesFilter } from '@/GvcPlatform/hooks/useNovedadesFilter';
import { NovedadEstado } from '@/interfaces/novedad.interface';
import { UserRole } from '@/interfaces/user.interface';
import { useState } from 'react';

export const NovedadesPage = () => {
  const { inputRef, currentEstado, currentTipo, hasActiveFilters, search, setSearchParams } =
    useNovedadesFilter();
  const { novedades } = useNovedades(currentEstado, currentTipo, search);
  const { user } = useAuth();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const canExport = user?.rol === UserRole.RRHH;
  const canCreate = user?.rol === UserRole.COLABORADOR;
  const canApprove = user?.rol === UserRole.SUPERVISOR;
  const showColaborador = user?.rol !== UserRole.COLABORADOR;

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

  const onApprove = async (id: number) => {
    try {
      await updateNovedadAction(id, 'aprobar');
    } catch (error) {
      console.error(`Error al aprobar la novedad con ID ${id}:`, error);
    }
  };

  const onReject = async (id: number) => {
    try {
      await updateNovedadAction(id, 'rechazar');
    } catch (error) {
      console.error(`Error al rechazar la novedad con ID ${id}:`, error);
    }
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

  return (
    <>
      <NovedadesHeader canExport={canExport} canCreate={canCreate} userRole={user?.rol} />

      <NovedadesStatsCards novedades={novedades} />

      <NovedadesFilter
        hasActiveFilters={hasActiveFilters}
        inputRef={inputRef}
        currentEstado={currentEstado}
        currentTipo={currentTipo}
        search={search}
        setSearchParams={setSearchParams}
      />

      {canApprove && pendingFiltered > 0 && (
        <NovedadesSupervisorBulkBar
          selectedIds={selectedIds}
          pendingFiltered={pendingFiltered}
          selectAllPending={selectAllPending}
          onClearSelection={handleClearSelection}
          onBulkApprove={handleBulkApprove}
        />
      )}

      <NovedadesList
        novedades={novedades}
        canCreate={canCreate}
        canApprove={canApprove}
        showColaborador={showColaborador}
        selectedIds={selectedIds}
        onSelect={onSelect}
        onApprove={onApprove}
        onReject={onReject}
      />
    </>
  );
};
