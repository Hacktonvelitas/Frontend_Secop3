import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { ILicitacionRepository } from '@/domain/repositories/ILicitacionRepository';

export class GetLicitacionesUseCase {
  constructor(private readonly licitacionRepository: ILicitacionRepository) {}

  async execute(): Promise<Licitacion[]> {
    return await this.licitacionRepository.getAll();
  }
}
