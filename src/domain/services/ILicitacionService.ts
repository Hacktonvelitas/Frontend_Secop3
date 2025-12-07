export interface LicitacionMatchDTO {
  score: number;
  texto: string;
}

export interface LicitacionItemDTO {
  id: string;
  titulo: string;
  entidadContratante: string;
  sector: string;
  estadoEtiqueta: string;
  match: LicitacionMatchDTO;
  ubicacion: string;
  fechaCierre: string;
  fechaCierreTexto: string;
  esNueva: boolean;
  regionCodigo: string;
  urlDetalle: string;
}

export interface LicitacionFiltrosDTO {
  busqueda: string;
  sector: string;
  region: string;
}

export interface LicitacionResponseDTO {
  usuarioId: string;
  totalMatches: number;
  filtros: LicitacionFiltrosDTO;
  licitaciones: LicitacionItemDTO[];
}

export interface ILicitacionService {
  getLicitaciones(): Promise<LicitacionResponseDTO>;
}
