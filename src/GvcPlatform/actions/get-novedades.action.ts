import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { Novedad } from '@/interfaces/novedad.interface';
import type { AxiosError } from 'axios';

export const getNovedadesAction = async (
  estado: string,
  tipo: string,
  search: string,
): Promise<Novedad[]> => {
  try {
    const { data } = await gvcPlatformApi.get<Novedad[]>('/novedad', {
      params: {
        estado: estado || undefined,
        tipo: tipo || undefined,
        search: search || undefined,
      },
    });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Check auth failed', {
      cause: error,
    });
  }
};
