import type { Novedad } from '@/interfaces/novedad.interface';
import { useEffect, useState } from 'react';
import { getNovedades } from '../actions/get-novedades.action';

export const useNovedades = () => {
  const [novedades, setNovedades] = useState<Novedad[]>([]);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const novedades = await getNovedades();
        setNovedades(novedades);
      } catch (error) {
        console.error('Error fetching novedades:', error);
      }
    };

    fetchNovedades();
  }, []);

  return {
    novedades,
  };
};
