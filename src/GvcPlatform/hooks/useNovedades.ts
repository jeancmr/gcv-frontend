import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { approveNovedadesMasivoAction } from '../actions/approve-novedades-masivo.action';
import { getNovedadesAction } from '../actions/get-novedades.action';
import { updateNovedadAction, type Action } from '../actions/update-novedad-estado.action';
import { submitNovedadFormAction } from '../actions/submit-novedad-form.action';
import {
  NovedadEstado,
  type NovedadEstado as NovedadEstadoType,
} from '@/interfaces/novedad.interface';
import type { FormData } from '../schemas/novedad-form.schema';

type UpdateNovedadParams = {
  id: number;
  action: Action;
};

type SubmitNovedadParams = {
  novedad: FormData;
  estado?: NovedadEstadoType;
  id?: number;
};

type ApproveNovedadesMasivoParams = number[];

export const useNovedades = (estado: string = '', tipo: string = '', search: string = '') => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['novedades', { estado, tipo, search }],
    queryFn: () => getNovedadesAction(estado, tipo, search),
    staleTime: 1000 * 6 * 5,
    retry: false,
  });

  const updateNovedadMutation = useMutation({
    mutationFn: ({ id, action }: UpdateNovedadParams) => updateNovedadAction(id, action),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['novedades'] });
      await queryClient.invalidateQueries({ queryKey: ['novedades-stats'] });
    },
  });

  const submitNovedadMutation = useMutation({
    mutationFn: ({ novedad, estado = NovedadEstado.PENDIENTE, id }: SubmitNovedadParams) =>
      submitNovedadFormAction(novedad, estado, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['novedades'] });
      queryClient.invalidateQueries({ queryKey: ['novedades-stats'] });
    },
  });

  const approveNovedadesMasivoMutation = useMutation({
    mutationFn: (ids: ApproveNovedadesMasivoParams) => approveNovedadesMasivoAction(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['novedades'] });
      await queryClient.invalidateQueries({ queryKey: ['novedades-stats'] });
    },
  });

  return {
    ...query,
    novedadMutation: updateNovedadMutation,
    submitNovedadMutation,
    approveNovedadesMasivoMutation,
  };
};
