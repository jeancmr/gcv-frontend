import type { Filial } from './filial.interface';

export const UserRole = {
  COLABORADOR: 'COLABORADOR',
  SUPERVISOR: 'SUPERVISOR',
  RRHH: 'RRHH',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: number;
  email: string;
  nombre: string;
  rol: UserRole;
  filialId: number;
  filial: Filial;
  creadaEn: Date;
  actualizadaEn: Date;
}
