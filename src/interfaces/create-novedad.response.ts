export interface CreateNovedadResponse {
  id: number;
  filial: {
    id: number;
  };
  solicitante: {
    id: number;
  };
  tipo: string;
  estado: string;
  fechaInicio: Date;
  fechaFin: Date;
  descripcion: string;
  creadaEn: Date;
  actualizadaEn: Date;
}
