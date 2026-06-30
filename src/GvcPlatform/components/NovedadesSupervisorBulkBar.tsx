import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

interface NovedadesSupervisorBulkBarProps {
  selectedIds: Set<string>;
  pendingFiltered: number;
  selectAllPending: () => void;
  onClearSelection: () => void;
  onBulkApprove: () => void;
}

export const NovedadesSupervisorBulkBar = ({
  selectedIds,
  pendingFiltered,
  selectAllPending,
  onClearSelection,
  onBulkApprove,
}: NovedadesSupervisorBulkBarProps) => {
  return (
    <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5">
      <span className="text-sm text-amber-800 font-medium">
        {selectedIds.size > 0
          ? `${selectedIds.size} novedad(es) seleccionada(s)`
          : `${pendingFiltered} novedad(es) pendiente(s) de revisión`}
      </span>
      <div className="flex gap-2">
        {selectedIds.size === 0 ? (
          <Button
            variant="link"
            size="sm"
            onClick={selectAllPending}
            className="font-medium text-amber-700"
          >
            Seleccionar todas
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={onClearSelection}
              className="flex items-center gap-1.5 rounded-md bg-amber-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-amber-700 transition-colors"
            >
              Limpiar
            </Button>
            <Button
              onClick={onBulkApprove}
              className="flex items-center gap-1.5 rounded-md bg-emerald-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-emerald-700 transition-colors"
            >
              <CheckCheck size={13} />
              Aprobar seleccionadas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
