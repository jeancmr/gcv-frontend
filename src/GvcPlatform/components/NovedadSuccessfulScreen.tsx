import { CheckCircle2 } from 'lucide-react';

export const NovedadSuccessfulScreen = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <TopNav user={user} onLogout={onLogout} /> */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-200">
            <CheckCircle2 className="text-emerald-600" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Novedad registrada con éxito
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Su novedad de tipo <strong>knsdf</strong> ha sido enviada al supervisor para revisión.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-left mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tipo</span>
              <span className="font-medium text-foreground">kmsdf</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Período</span>
              <span className="font-medium text-foreground">xc → zc</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estado</span>
              <span className="font-medium text-amber-600">Pendiente</span>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => console.log('Ver mis novedades')}
              className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90"
            >
              Ver mis novedades
            </button>
            <button
              onClick={() => console.log('Nueva novedad')}
              className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Nueva novedad
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
