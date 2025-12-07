import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { ILicitacionRepository } from '@/domain/repositories/ILicitacionRepository';

export class GetLicitacionByIdUseCase {
  constructor(private readonly licitacionRepository: ILicitacionRepository) {}

  async execute(id: string): Promise<Licitacion | null> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la licitación es requerido');
    }

    return await this.licitacionRepository.getById(id);
  }
}
