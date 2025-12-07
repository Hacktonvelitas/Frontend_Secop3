export interface Licitacion {
  id: string;
  nombre: string;
  entidad: string;
  montoMin: number;
  montoMax: number;
  fechaCierre: string;
  estado: 'nueva' | 'en_progreso' | 'casi_cierra';
  sector: string;
  region: string;
  tipoContrato: string;
  resumen: string;
  documentosTotal: number;
  documentosCompletados: number;
}

export type LicitacionEstado = Licitacion['estado'];
