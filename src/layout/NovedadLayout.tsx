import { Outlet } from 'react-router';
import { CustomHeader } from '@/components/custom/CustomHeader';

export const NovedadLayout = () => {
  return (
    <>
      <CustomHeader />
      <Outlet />
    </>
  );
};
