import { Licitacion } from '../entities/Licitacion.entity';

export interface ILicitacionRepository {
  getAll(): Promise<Licitacion[]>;
  getById(id: string): Promise<Licitacion | null>;
  filterBySector(sector: string): Promise<Licitacion[]>;
  filterByRegion(region: string): Promise<Licitacion[]>;
  search(query: string): Promise<Licitacion[]>;
}
