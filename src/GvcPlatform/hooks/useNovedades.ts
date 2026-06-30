import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNovedadesAction } from '../actions/get-novedades.action';
import { updateNovedadAction, type Action } from '../actions/update-novedad-estado.action';

type UpdateNovedadParams = {
  id: number;
  action: Action;
};

export const useNovedades = (estado: string, tipo: string, search: string) => {
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
    },
  });

  return {
    ...query,
    novedadMutation: updateNovedadMutation,
  };
};
