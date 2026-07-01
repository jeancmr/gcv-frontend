import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { CreateNovedadResponse } from '@/interfaces/create-novedad.response';
import type { AxiosError } from 'axios';
import type { FormData } from '../schemas/novedad-form.schema';

export const submitNovedadFormAction = async (
  novedad: FormData,
): Promise<CreateNovedadResponse> => {
  try {
    const { data } = await gvcPlatformApi<CreateNovedadResponse>({
      url: '/novedad',
      method: 'POST',
      data: novedad,
    });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Error submitting novedad form', {
      cause: error,
    });
  }
};
