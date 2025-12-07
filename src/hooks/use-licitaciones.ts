import { useQuery } from '@tanstack/react-query';
import { LicitacionService } from '@/infrastructure/services/LicitacionService';
import { LicitacionRepositoryMock } from '@/infrastructure/repositories/LicitacionRepositoryMock';
import {
  GetLicitacionesUseCase,
  GetLicitacionByIdUseCase,
  FilterLicitacionesUseCase,
  type FilterCriteria,
} from '@/application/use-cases/licitaciones';

// Dependency Injection Setup
const licitacionService = new LicitacionService();
const licitacionRepository = new LicitacionRepositoryMock(licitacionService);

const getLicitacionesUseCase = new GetLicitacionesUseCase(licitacionRepository);
const getLicitacionByIdUseCase = new GetLicitacionByIdUseCase(licitacionRepository);
const filterLicitacionesUseCase = new FilterLicitacionesUseCase(licitacionRepository);

export function useLicitaciones() {
  return useQuery({
    queryKey: ['licitaciones'],
    queryFn: () => getLicitacionesUseCase.execute(),
  });
}

export function useLicitacion(id: string) {
  return useQuery({
    queryKey: ['licitacion', id],
    queryFn: () => getLicitacionByIdUseCase.execute(id),
    enabled: !!id,
  });
}

export function useFilterLicitaciones(criteria: FilterCriteria) {
  return useQuery({
    queryKey: ['licitaciones', 'filter', criteria],
    queryFn: () => filterLicitacionesUseCase.execute(criteria),
    enabled: !!(criteria.searchQuery || criteria.sector || criteria.region),
  });
}
