import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  NovedadEstado,
  NovedadTipo,
  type NovedadEstado as NovedadEstadoType,
  type NovedadTipo as NovedadTipoType,
} from '../../interfaces/novedad.interface';
import { Input } from '@/components/ui/input';
import type { RefObject } from 'react';
import type { SetURLSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/auth/hooks/useAuth';
import { UserRole } from '@/interfaces/user.interface';

interface NovedadesFilterProps {
  inputRef: RefObject<HTMLInputElement | null>;
  currentEstado: NovedadEstadoType;
  currentTipo: NovedadTipoType;
  search: string;
  hasActiveFilters: boolean;
  setSearchParams: SetURLSearchParams;
}

export const NovedadesFilter = ({
  inputRef,
  currentEstado,
  currentTipo,
  search,
  hasActiveFilters,
  setSearchParams,
}: NovedadesFilterProps) => {
  const { user } = useAuth();
  const rol = user?.rol;

  const placeholderMessage = `Buscar por ${rol === UserRole.COLABORADOR ? 'descripción' : 'colaborador'}`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = inputRef.current;

    if (event.key === 'Enter' && inputElement) {
      const cleanedInput = inputElement.value.trim();

      setSearchParams((prev) => {
        prev.set('search', cleanedInput);
        return prev;
      });
    }
  };

  return (
    <div className="mb-4 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-50">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          placeholder={placeholderMessage}
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
          onChange={(e) => {
            const newEstado = e.target.value as NovedadEstadoType;
            setSearchParams((prev) => {
              prev.set('estado', newEstado);
              return prev;
            });
          }}
        >
          <option value="">Todos los estados</option>
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
          onChange={(e) => {
            const newTipo = e.target.value as NovedadTipoType;
            setSearchParams((prev) => {
              prev.set('tipo', newTipo);
              return prev;
            });
          }}
          aria-label="Filtrar por tipo"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todos los tipos</option>
          <option value={NovedadTipo.ACTUALIZACION_DATOS}>Actualización de datos</option>
          <option value={NovedadTipo.AUSENTISMO}>Ausentismo</option>
          <option value={NovedadTipo.HORAS_EXTRA}>Horas extra</option>
          <option value={NovedadTipo.PERMISO}>Permiso</option>
          <option value={NovedadTipo.SALUD}>Salud</option>
        </select>
      </div>

      {hasActiveFilters && (
        <Button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = '';
            }
            const newParams = new URLSearchParams();
            setSearchParams(newParams);
          }}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Eliminar filtros activos"
        >
          <X size={13} aria-hidden="true" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
};
