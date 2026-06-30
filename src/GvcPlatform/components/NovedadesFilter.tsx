import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  NovedadEstado,
  NovedadTipo,
  type NovedadEstado as NovedadEstadoType,
  type NovedadTipo as NovedadTipoType,
} from '../../interfaces/novedad.interface';
import { Input } from '@/components/ui/input';
import { useNovedadesFilter } from '../hooks/useNovedadesFilter';

export const NovedadesFilter = () => {
  const {
    inputRef,
    clearFilters,
    currentEstado,
    currentTipo,
    handleEstadoChange,
    handleKeyDown,
    handleTipoChange,
    hasActiveFilters,
    search,
  } = useNovedadesFilter();

  return (
    <div className="mb-4 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-50">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          placeholder="Buscar por colaborador, descripción o ID…"
          ref={inputRef}
          defaultValue={search}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Filter size={13} className="text-muted-foreground" aria-hidden="true" />
        <select
          value={currentEstado}
          aria-label="Filtrar por estado"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onChange={(e) => handleEstadoChange(e.target.value as NovedadEstadoType)}
        >
          <option value="todas">Todos los estados</option>
          <option value={NovedadEstado.APROBADA}>Aprobadas</option>
          <option value={NovedadEstado.BORRADOR}>Borradores</option>
          <option value={NovedadEstado.PENDIENTE}>Pendientes</option>
          <option value={NovedadEstado.RECHAZADA}>Rechazadas</option>
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <SlidersHorizontal size={13} className="text-muted-foreground" aria-hidden="true" />
        <select
          value={currentTipo}
          onChange={(e) => handleTipoChange(e.target.value as NovedadTipoType)}
          aria-label="Filtrar por tipo"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="todos">Todos los tipos</option>
          <option value={NovedadTipo.ACTUALIZACION_DATOS}>Actualización de datos</option>
          <option value={NovedadTipo.AUSENTISMO}>Ausentismo</option>
          <option value={NovedadTipo.HORAS_EXTRA}>Horas extra</option>
          <option value={NovedadTipo.PERMISO}>Permiso</option>
          <option value={NovedadTipo.SALUD}>Salud</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Eliminar filtros activos"
        >
          <X size={13} aria-hidden="true" />
          Limpiar filtros
        </button>
      )}
    </div>
  );
};
