import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { AxiosError } from 'axios';

interface Response {
  message: string;
}

export type Action = 'enviar' | 'aprobar' | 'rechazar';

export const updateNovedadAction = async (id: number, action: Action): Promise<Response> => {
  try {
    const { data } = await gvcPlatformApi.post<Response>(`/novedad/${id}/${action}`);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Check auth failed', {
      cause: error,
    });
  }
};
