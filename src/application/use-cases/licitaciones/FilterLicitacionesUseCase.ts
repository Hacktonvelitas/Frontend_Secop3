import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { ILicitacionRepository } from '@/domain/repositories/ILicitacionRepository';

export interface FilterCriteria {
  searchQuery?: string;
  sector?: string;
  region?: string;
}

export class FilterLicitacionesUseCase {
  constructor(private readonly licitacionRepository: ILicitacionRepository) {}

  async execute(criteria: FilterCriteria): Promise<Licitacion[]> {
    let results = await this.licitacionRepository.getAll();

    if (criteria.searchQuery && criteria.searchQuery.trim() !== '') {
      results = await this.licitacionRepository.search(criteria.searchQuery);
    }

    if (criteria.sector && criteria.sector.trim() !== '') {
      results = results.filter(l => l.sector === criteria.sector);
    }

    if (criteria.region && criteria.region.trim() !== '') {
      results = results.filter(l => l.region === criteria.region);
    }

    return results;
  }
}
