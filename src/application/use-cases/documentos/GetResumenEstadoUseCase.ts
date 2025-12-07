import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';
import { IDocumentoRepository } from '@/domain/repositories/IDocumentoRepository';

export class GetResumenEstadoUseCase {
  constructor(private readonly documentoRepository: IDocumentoRepository) {}

  async execute(): Promise<ResumenEstado> {
    return await this.documentoRepository.getResumenEstado();
  }
}
