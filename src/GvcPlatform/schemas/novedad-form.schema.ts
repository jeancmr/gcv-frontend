import { z } from 'zod';
import { NOVEDAD_TIPOS } from '@/GvcPlatform/libs/novedad-tipos';
import type { NovedadTipo } from '@/interfaces/novedad.interface';

export const today = new Date().toISOString().split('T')[0];

const novedadTipoValues = NOVEDAD_TIPOS.map((tipo) => tipo.value) as NovedadTipo[];

export const novedadSchema = z
  .object({
    tipo: z.string().refine((value) => novedadTipoValues.includes(value as NovedadTipo), {
      message: 'Seleccione el tipo de novedad',
    }),
    fechaInicio: z.string().min(1, 'La fecha de inicio es obligatoria'),
    fechaFin: z.string().min(1, 'La fecha de fin es obligatoria'),
    descripcion: z
      .string()
      .min(10, 'La descripción debe tener al menos 10 caracteres')
      .max(500, 'La descripción no puede superar 500 caracteres'),
  })
  .refine((data) => data.fechaFin >= data.fechaInicio, {
    message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
    path: ['fechaFin'],
  });

export type FormData = z.infer<typeof novedadSchema>;
