import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { Novedad } from '@/interfaces/novedad.interface';

export const getNovedades = async (): Promise<Novedad[]> => {
  const { data } = await gvcPlatformApi.get<Novedad[]>('/novedad');

  return data;
};
