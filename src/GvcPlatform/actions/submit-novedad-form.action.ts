import { gvcPlatformApi } from '@/api/gvc-platform.api';
import {
  NovedadEstado,
  type NovedadEstado as NovedadEstadoType,
} from '@/interfaces/novedad.interface';
import type { CreateNovedadResponse } from '@/interfaces/create-novedad.response';
import type { AxiosError } from 'axios';
import type { FormData } from '../schemas/novedad-form.schema';

export const submitNovedadFormAction = async (
  novedad: FormData,
  estado: NovedadEstadoType = NovedadEstado.PENDIENTE,
  id?: number,
): Promise<CreateNovedadResponse> => {
  try {
    const { data } = await gvcPlatformApi<CreateNovedadResponse>({
      url: id ? `/novedad/${id}` : '/novedad',
      method: id ? 'PATCH' : 'POST',
      data: {
        ...novedad,
        estado,
      },
    });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Error submitting novedad form', {
      cause: error,
    });
  }
};
