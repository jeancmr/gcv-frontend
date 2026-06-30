import { NovedadEstado, type Novedad } from '@/interfaces/novedad.interface';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface StatsCardsProps {
  novedades: Novedad[];
}

export const NovedadesStatsCards = ({ novedades }: StatsCardsProps) => {
  const total = novedades.length;

  const borradores = novedades.filter((n) => n.estado === NovedadEstado.BORRADOR).length;
  const pendientes = novedades.filter((n) => n.estado === NovedadEstado.PENDIENTE).length;
  const aprobadas = novedades.filter((n) => n.estado === NovedadEstado.APROBADA).length;
  const rechazadas = novedades.filter((n) => n.estado === NovedadEstado.RECHAZADA).length;

  const stats = [
    {
      label: 'Total novedades',
      value: total,
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/8',
    },
    {
      label: 'Borradores',
      value: borradores,
      icon: FileText,
      color: 'text-muted-foreground',
      bg: 'bg-muted',
    },
    {
      label: 'Pendientes',
      value: pendientes,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Aprobadas',
      value: aprobadas,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Rechazadas',
      value: rechazadas,
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            <div className={`rounded-md p-1.5 ${stat.bg}`}>
              <stat.icon size={14} className={stat.color} aria-hidden="true" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};
