export const NovedadEstado = {
  BORRADOR: 'BORRADOR',
  PENDIENTE: 'PENDIENTE',
  APROBADA: 'APROBADA',
  RECHAZADA: 'RECHAZADA',
} as const;

export type NovedadEstado = (typeof NovedadEstado)[keyof typeof NovedadEstado];

export const NovedadTipo = {
  AUSENTISMO: 'AUSENTISMO',
  PERMISO: 'PERMISO',
  HORAS_EXTRA: 'HORAS_EXTRA',
  SALUD: 'SALUD',
  ACTUALIZACION_DATOS: 'ACTUALIZACION_DATOS',
} as const;

export type NovedadTipo = (typeof NovedadTipo)[keyof typeof NovedadTipo];

export interface Novedad {
  id: number;
  tipo: NovedadTipo;
  estado: NovedadEstado;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  creadaEn: string;
  actualizadaEn: string;
}
