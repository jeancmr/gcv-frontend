import { cn } from '@/lib/utils';
import type { NovedadEstado, NovedadTipo } from '@/interfaces/novedad.interface';

interface StatusBadgeProps {
  estado: NovedadEstado;
  className?: string;
}

export function StatusBadge({ estado, className }: StatusBadgeProps) {
  const styles: Record<NovedadEstado, string> = {
    BORRADOR: 'bg-gray-100 text-gray-800 border border-gray-200',
    PENDIENTE: 'bg-amber-100 text-amber-800 border border-amber-200',
    APROBADA: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    RECHAZADA: 'bg-red-100 text-red-800 border border-red-200',
  };

  const dots: Record<NovedadEstado, string> = {
    BORRADOR: 'bg-gray-500',
    PENDIENTE: 'bg-amber-500',
    APROBADA: 'bg-emerald-500',
    RECHAZADA: 'bg-red-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles[estado],
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dots[estado])} aria-hidden="true" />
      {estado}
    </span>
  );
}

interface TipoBadgeProps {
  tipo: NovedadTipo;
  className?: string;
}

export function TipoBadge({ tipo, className }: TipoBadgeProps) {
  const styles: Record<NovedadTipo, string> = {
    AUSENTISMO: 'bg-slate-100 text-slate-700 border border-slate-200',
    PERMISO: 'bg-blue-100 text-blue-700 border border-blue-200',
    HORAS_EXTRA: 'bg-violet-100 text-violet-700 border border-violet-200',
    SALUD: 'bg-pink-100 text-pink-700 border border-pink-200',
    ACTUALIZACION_DATOS: 'bg-teal-100 text-teal-700 border border-teal-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        styles[tipo],
        className,
      )}
    >
      {tipo}
    </span>
  );
}
