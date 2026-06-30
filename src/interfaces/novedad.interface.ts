export const NovedadEstado = {
  BORRADOR: 'BORRADOR',
  PENDIENTE: 'PENDIENTE',
  APROBADA: 'APROBADA',
  RECHAZADA: 'RECHAZADA',
} as const;

export type NovedadEstado = (typeof NovedadEstado)[keyof typeof NovedadEstado];

export interface Novedad {
  id: number;
  tipo: string;
  estado: NovedadEstado;
  fechaInicio: Date;
  fechaFin?: Date;
  descripcion: string;
  creadaEn: Date;
  actualizadaEn: Date;
}
