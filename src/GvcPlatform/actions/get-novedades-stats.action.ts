import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { NovedadesStatsResponse } from '@/interfaces/novedad-stats.reponse';
import type { AxiosError } from 'axios';

export const getNovedadesStatsAction = async (): Promise<NovedadesStatsResponse> => {
  try {
    const { data } = await gvcPlatformApi.get<NovedadesStatsResponse>('/novedad/stats');

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Check auth failed', {
      cause: error,
    });
  }
};
