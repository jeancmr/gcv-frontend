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
import { toast } from 'sonner';

export const NovedadesPage = () => {
  const { inputRef, currentEstado, currentTipo, hasActiveFilters, search, setSearchParams } =
    useNovedadesFilter();

  const {
    data: novedades = [],
    error,
    approveNovedadesMasivoMutation: mutation,
    exportNovedadesCsvMutation,
  } = useNovedades(currentEstado, currentTipo, search);
  const { data: novedadesStats = initialStats } = useNovedadesStats();

  const {
    canApprove,
    pendingFiltered,
    selectedIds,
    onSelect,
    selectAllPending,
    handleClearSelection,
  } = useNovedadesPage(novedades);

  const handleBulkApprove = async () => {
    const ids = Array.from(selectedIds).map(Number);
    await mutation.mutateAsync(ids, {
      onSuccess: () => {
        toast.success(`Novedades aprobadas correctamente.`);
        handleClearSelection();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleExportCsv = async () => {
    await exportNovedadesCsvMutation.mutateAsync(undefined, {
      onSuccess: ({ blob, filename }) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast.success('CSV exportado correctamente.');
      },
      onError: (mutationError) => {
        toast.error(mutationError.message);
      },
    });
  };

  return (
    <>
      <NovedadesHeader
        onExportCsv={handleExportCsv}
        isExportingCsv={exportNovedadesCsvMutation.isPending}
      />

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
