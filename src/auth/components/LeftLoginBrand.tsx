import { GCVLogo } from '@/components/custom/GCVLogo';

export const LeftLoginBrand = () => {
  return (
    <section
      className="hidden lg:flex flex-col justify-between flex-1 p-12"
      style={{ background: 'oklch(0.20 0.12 250)' }}
    >
      <GCVLogo size="lg" variant="light" />

      <div className="space-y-6">
        <h1 className="text-4xl font-semibold leading-snug text-white text-balance">
          Gestión centralizada de novedades de nómina
        </h1>
        <p className="text-white/60 leading-relaxed text-base">
          Plataforma corporativa del Centro de Servicios Compartidos. Digitalice, trace y consolide
          todas las novedades de sus filiales en un solo lugar.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
          Filiales operativas
        </p>
        <div className="flex flex-wrap gap-2">
          {['Andinagas', 'HidroVértice', 'TransAndes', 'RetailVértice', 'AgroVértice'].map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
