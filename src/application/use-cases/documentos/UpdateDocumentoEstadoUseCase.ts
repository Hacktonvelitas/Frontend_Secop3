import { Documento } from '@/domain/entities/Documento.entity';
import { IDocumentoRepository } from '@/domain/repositories/IDocumentoRepository';

export class UpdateDocumentoEstadoUseCase {
  constructor(private readonly documentoRepository: IDocumentoRepository) {}

  async execute(id: string, estado: Documento['estado']): Promise<Documento> {
    if (!id || id.trim() === '') {
      throw new Error('El ID del documento es requerido');
    }

    const validEstados: Documento['estado'][] = [
      'aprobado',
      'pendiente',
      'vencido',
      'rechazado',
      'cargado',
      'requiere_accion'
    ];

    if (!validEstados.includes(estado)) {
      throw new Error(`Estado inválido: ${estado}`);
    }

    return await this.documentoRepository.updateEstado(id, estado);
  }
}
