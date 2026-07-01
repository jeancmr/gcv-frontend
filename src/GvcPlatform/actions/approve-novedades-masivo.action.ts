import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { AxiosError } from 'axios';

interface Response {
  message: string;
}

export const approveNovedadesMasivoAction = async (ids: number[]): Promise<Response> => {
  try {
    const { data } = await gvcPlatformApi.post<Response>('/novedad/aprobar-masivo', { ids: ids });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Error approving novedades masivo', {
      cause: error,
    });
  }
};
