import { Outlet } from 'react-router';
import { CustomHeader } from '@/components/custom/CustomHeader';

export const NovedadLayout = () => {
  return (
    <>
      <CustomHeader />

      <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </>
  );
};
