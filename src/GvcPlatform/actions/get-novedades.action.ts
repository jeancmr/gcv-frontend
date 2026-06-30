import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { Novedad } from '@/interfaces/novedad.interface';

export const getNovedades = async (
  estado: string,
  tipo: string,
  search: string,
): Promise<Novedad[]> => {
  const { data } = await gvcPlatformApi.get<Novedad[]>('/novedad', {
    params: {
      estado: estado || undefined,
      tipo: tipo || undefined,
      search: search || undefined,
    },
  });

  return data;
};
