import { IDocumentoRepository } from '@/domain/repositories/IDocumentoRepository';
import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';
import { mockDocumentosData, mockResumenEstadoData } from '../mock/documentos.data';

export class DocumentoRepositoryMock implements IDocumentoRepository {
  private documentos: Documento[] = mockDocumentosData;
  private resumenEstado: ResumenEstado = mockResumenEstadoData;

  async getAll(): Promise<Documento[]> {
    return Promise.resolve([...this.documentos]);
  }

  async getById(id: string): Promise<Documento | null> {
    const documento = this.documentos.find(d => d.id === id);
    return Promise.resolve(documento || null);
  }

  async getByLicitacionId(licitacionId: string): Promise<Documento[]> {
    // In a real mock, we might filter by licitacionId if we had that relationship in the mock data
    // For now, return all mock documents as requested in the sample
    return Promise.resolve([...this.documentos]);
  }

  async getResumenEstado(licitacionId: string): Promise<ResumenEstado> {
    return Promise.resolve({ ...this.resumenEstado });
  }

  async updateEstado(id: string, estado: Documento['estado']): Promise<Documento> {
    const documento = this.documentos.find(d => d.id === id);
    if (!documento) {
      throw new Error(`Documento with id ${id} not found`);
    }

    documento.estado = estado;
    return Promise.resolve({ ...documento });
  }
}
