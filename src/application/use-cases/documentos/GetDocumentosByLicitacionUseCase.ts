import { Documento } from '@/domain/entities/Documento.entity';
import { IDocumentoRepository } from '@/domain/repositories/IDocumentoRepository';

export class GetDocumentosByLicitacionUseCase {
  constructor(private readonly documentoRepository: IDocumentoRepository) {}

  async execute(licitacionId: string): Promise<Documento[]> {
    if (!licitacionId || licitacionId.trim() === '') {
      throw new Error('El ID de la licitación es requerido');
    }

    return await this.documentoRepository.getByLicitacionId(licitacionId);
  }
}
