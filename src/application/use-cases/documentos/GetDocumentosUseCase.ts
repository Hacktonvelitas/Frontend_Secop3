import { Documento } from '@/domain/entities/Documento.entity';
import { IDocumentoRepository } from '@/domain/repositories/IDocumentoRepository';

export class GetDocumentosUseCase {
  constructor(private readonly documentoRepository: IDocumentoRepository) {}

  async execute(): Promise<Documento[]> {
    return await this.documentoRepository.getAll();
  }
}
