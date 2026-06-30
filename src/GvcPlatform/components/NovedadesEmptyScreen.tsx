import { FileTextIcon, Plus } from 'lucide-react';

interface NovedadesEmptyScreenProps {
  canCreate?: boolean;
  errorMessage?: string;
}
export const NovedadesEmptyScreen = ({ canCreate, errorMessage }: NovedadesEmptyScreenProps) => {
  return (
    <div className="rounded-lg border border-border border-dashed bg-card flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-3">
        <FileTextIcon />
      </div>
      <p className="text-sm font-medium text-foreground">Sin novedades</p>
      <p
        className={`text-xs text-muted-foreground mt-1 max-w-xs ${errorMessage ? 'text-red-500' : ''}`}
      >
        {errorMessage ?? 'No hay novedades que coincidan con los filtros aplicados'}
      </p>
      {canCreate && (
        <button
          onClick={() => console.log('Crear novedad')}
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Plus size={14} />
          Registrar novedad
        </button>
      )}
    </div>
  );
};
