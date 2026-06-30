import { NovedadesFilter } from '@/GvcPlatform/components/NovedadesFilter';
import { NovedadesHeader } from '@/GvcPlatform/components/NovedadesHeader';
import { NovedadesList } from '@/GvcPlatform/components/NovedadesList';
import { NovedadesStatsCards } from '@/GvcPlatform/components/NovedadesStatsCards';
import { NovedadesSupervisorBulkBar } from '@/GvcPlatform/components/NovedadesSupervisorBulkBar';
import { useNovedades } from '@/GvcPlatform/hooks/useNovedades';
import { useNovedadesFilter } from '@/GvcPlatform/hooks/useNovedadesFilter';
import { useNovedadesPage } from '@/GvcPlatform/hooks/useNovedadesPage';
import { useNovedadesStats } from '@/GvcPlatform/hooks/useNovedadesStats';
import { initialStats } from '@/GvcPlatform/libs/initial-novedades-stats';

export const NovedadesPage = () => {
  const { inputRef, currentEstado, currentTipo, hasActiveFilters, search, setSearchParams } =
    useNovedadesFilter();
  const { data: novedades = [], error } = useNovedades(currentEstado, currentTipo, search);
  const { data: novedadesStats = initialStats } = useNovedadesStats();
  const {
    canApprove,
    pendingFiltered,
    selectedIds,
    onSelect,
    selectAllPending,
    handleBulkApprove,
    handleClearSelection,
  } = useNovedadesPage(novedades);

  return (
    <>
      <NovedadesHeader />

      <NovedadesStatsCards novedadesStats={novedadesStats} />

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
        selectedIds={selectedIds}
        onSelect={onSelect}
        errorMessage={error ? error.message : undefined}
      />
    </>
  );
};
