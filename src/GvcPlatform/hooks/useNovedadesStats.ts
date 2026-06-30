import { useQuery } from '@tanstack/react-query';
import { getNovedadesStatsAction } from '../actions/get-novedades-stats.action';

export const useNovedadesStats = () => {
  return useQuery({
    queryKey: ['novedades-stats'],
    queryFn: () => getNovedadesStatsAction(),
    staleTime: 1000 * 6 * 5,
    retry: false,
  });
};
