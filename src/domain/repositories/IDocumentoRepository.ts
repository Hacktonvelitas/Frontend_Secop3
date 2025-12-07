import { Documento } from '../entities/Documento.entity';
import { ResumenEstado } from '../entities/ResumenEstado.entity';

export interface IDocumentoRepository {
  getAll(): Promise<Documento[]>;
  getById(id: string): Promise<Documento | null>;
  getByLicitacionId(licitacionId: string): Promise<Documento[]>;
  getResumenEstado(licitacionId: string): Promise<ResumenEstado>;
  updateEstado(id: string, estado: Documento['estado']): Promise<Documento>;
}
