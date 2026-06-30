import { NovedadesHeader } from '@/GvcPlatform/components/NovedadesHeader';
import { NovedadesStatsCards } from '@/GvcPlatform/components/NovedadesStatsCards';
import { useNovedades } from '@/GvcPlatform/hooks/useNovedades';

export const NovedadesPage = () => {
  const { novedades } = useNovedades();

  return (
    <>
      <NovedadesHeader />
      <NovedadesStatsCards novedades={novedades} />
    </>
  );
};
