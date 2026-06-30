import { gvcPlatformApi } from '@/api/gvc-platform.api';

interface Response {
  message: string;
}

type Action = 'enviar' | 'aprobar' | 'rechazar';

export const updateNovedadAction = async (id: number, action: Action): Promise<Response> => {
  const { data } = await gvcPlatformApi.post<Response>(`/novedad/${id}/${action}`);

  return data;
};
