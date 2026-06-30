import type { Novedad } from '@/interfaces/novedad.interface';
import { useEffect, useState } from 'react';
import { getNovedades } from '../actions/get-novedades.action';

export const useNovedades = (estado: string, tipo: string, search: string) => {
  const [novedades, setNovedades] = useState<Novedad[]>([]);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const novedades = await getNovedades(estado, tipo, search);
        setNovedades(novedades);
      } catch (error) {
        console.error('Error fetching novedades:', error);
      }
    };

    fetchNovedades();
  }, [estado, tipo, search]);

  return {
    novedades,
  };
};
