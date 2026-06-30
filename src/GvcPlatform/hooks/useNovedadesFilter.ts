import { useRef, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router';
import { type NovedadEstado as NovedadEstadoType } from '../../interfaces/novedad.interface';
import { type NovedadTipo as NovedadTipoType } from '../../interfaces/novedad.interface';

export const useNovedadesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const search = searchParams.get('search') ?? '';
  const currentTipo = (searchParams.get('tipo') || '') as NovedadTipoType;
  const currentEstado = (searchParams.get('estado') || '') as NovedadEstadoType;

  const hasActiveFilters =
    searchParams.has('search') || searchParams.has('tipo') || searchParams.has('estado');

  const handleTipoChange = (newTipo: NovedadTipoType) => {
    searchParams.set('tipo', newTipo);
    setSearchParams(searchParams);
  };

  const handleEstadoChange = (newEstado: NovedadEstadoType) => {
    searchParams.set('estado', newEstado);
    setSearchParams(searchParams);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const inputElement = inputRef.current;
    if (event.key === 'Enter' && inputElement) {
      const cleanedInput = inputElement.value.trim();

      setSearchParams((prev) => {
        prev.set('search', cleanedInput);
        return prev;
      });
    }

    if (!inputElement?.value.trim()) {
      setSearchParams((prev) => {
        prev.delete('search');
        return prev;
      });
    }
  };

  const clearFilters = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSearchParams((prev) => {
      prev.delete('search');
      prev.delete('tipo');
      prev.delete('estado');
      return prev;
    });
  };

  return {
    currentEstado,
    currentTipo,
    hasActiveFilters,
    inputRef,
    search,
    clearFilters,
    setSearchParams,
  };
};
