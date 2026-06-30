import { useAuth } from '@/auth/hooks/useAuth';
import { NovedadesFilter } from '@/GvcPlatform/components/NovedadesFilter';
import { NovedadesHeader } from '@/GvcPlatform/components/NovedadesHeader';
import { NovedadesList } from '@/GvcPlatform/components/NovedadesList';
import { NovedadesStatsCards } from '@/GvcPlatform/components/NovedadesStatsCards';
import { useNovedades } from '@/GvcPlatform/hooks/useNovedades';
import { UserRole } from '@/interfaces/user.interface';

export const NovedadesPage = () => {
  const { novedades } = useNovedades();
  const { user } = useAuth();

  const canExport = user?.rol === UserRole.RRHH;
  const canCreate = user?.rol === UserRole.COLABORADOR;
  const canApprove = user?.rol === UserRole.SUPERVISOR;
  const showColaborador = user?.rol !== UserRole.COLABORADOR;

  return (
    <>
      <NovedadesHeader canExport={canExport} canCreate={canCreate} userRole={user?.rol} />

      <NovedadesStatsCards novedades={novedades} />

      <NovedadesFilter />

      <NovedadesList
        novedades={novedades}
        canCreate={canCreate}
        canApprove={canApprove}
        showColaborador={showColaborador}
      />
    </>
  );
};
