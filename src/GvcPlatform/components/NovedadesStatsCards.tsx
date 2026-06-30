import type { NovedadesStatsResponse } from '@/interfaces/novedad-stats.reponse';
import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react';

interface StatsCardsProps {
  novedadesStats: NovedadesStatsResponse;
}

export const NovedadesStatsCards = ({ novedadesStats }: StatsCardsProps) => {
  const total = novedadesStats.total;
  const borradores = novedadesStats.borradores;
  const pendientes = novedadesStats.pendientes;
  const aprobadas = novedadesStats.aprobadas;
  const rechazadas = novedadesStats.rechazadas;

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
