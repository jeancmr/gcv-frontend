import { NovedadTipo } from '@/interfaces/novedad.interface';

export const NOVEDAD_TIPOS: { value: NovedadTipo; label: string; description: string }[] = [
  {
    value: NovedadTipo.AUSENTISMO,
    label: 'Ausentismo',
    description: 'Falta al trabajo con o sin justificación',
  },
  {
    value: NovedadTipo.PERMISO,
    label: 'Permiso',
    description: 'Permiso remunerado o no remunerado',
  },
  {
    value: NovedadTipo.HORAS_EXTRA,
    label: 'Horas Extra',
    description: 'Trabajo adicional a la jornada ordinaria',
  },
  {
    value: NovedadTipo.SALUD,
    label: 'Novedad de Salud',
    description: 'Incapacidades médicas o accidentes de trabajo',
  },
  {
    value: NovedadTipo.ACTUALIZACION_DATOS,
    label: 'Actualización de Datos',
    description: 'Cambios en datos personales o bancarios',
  },
];
