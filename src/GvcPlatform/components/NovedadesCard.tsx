import { StatusBadge, TipoBadge } from '@/components/custom/CustomStatusBadge';
import { Button } from '@/components/ui/button';
import { NovedadEstado, type Novedad } from '@/interfaces/novedad.interface';
import { Calendar } from 'lucide-react';

interface NovedadCardProps {
  novedad: Novedad;
  showColaborador?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  canApprove?: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export const NovedadesCard = ({
  novedad,
  showColaborador,
  selected,
  canApprove,
  onSelect,
  onApprove,
  onReject,
}: NovedadCardProps) => {
  return (
    <article
      className={`rounded-lg border bg-card transition-all ${
        selected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/40'
      }`}
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Checkbox for bulk actions */}
            {onSelect && (
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onSelect(novedad.id.toString())}
                aria-label={`Seleccionar novedad ${novedad.id}`}
                className="mt-0.5 h-4 w-4 rounded border-border accent-primary shrink-0"
              />
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <TipoBadge tipo={novedad.tipo} />
                <StatusBadge estado={novedad.estado} />
              </div>
              <p className="text-xs font-mono text-muted-foreground">#{novedad.id}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">{formatDate(novedad.creadaEn)}</p>
          </div>
        </div>

        {/* Colaborador info */}
        {showColaborador && (
          <div className="mt-3 flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0"
              style={{ background: 'oklch(0.35 0.1 250)' }}
              aria-hidden="true"
            >
              {novedad.solicitante.nombre
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">
                {novedad.solicitante.nombre}
              </span>
              <span className="text-xs text-muted-foreground ml-1.5">
                · {novedad.solicitante.rol}
              </span>
            </div>
          </div>
        )}

        {/* Date range */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={12} aria-hidden="true" />
          <span>{formatDate(novedad.fechaInicio)}</span>
          {novedad.fechaFin !== novedad.fechaInicio && novedad.fechaFin && (
            <>
              <span>→</span>
              <span>{formatDate(novedad.fechaFin)}</span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-foreground/80 leading-relaxed line-clamp-2">
          {novedad.descripcion}
        </p>

        {/* Action buttons — Supervisor only */}
        {canApprove && novedad.estado === NovedadEstado.PENDIENTE && (
          <div className="flex gap-2 justify-end">
            <Button
              size="xs"
              onClick={() => onReject?.(novedad.id)}
              className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors"
            >
              Rechazar
            </Button>
            <Button
              size="xs"
              onClick={() => onApprove?.(novedad.id)}
              className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              Aprobar
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};
