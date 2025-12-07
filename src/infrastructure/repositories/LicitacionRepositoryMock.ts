import { ILicitacionRepository } from '@/domain/repositories/ILicitacionRepository';
import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { ILicitacionService, LicitacionItemDTO } from '@/domain/services/ILicitacionService';

export class LicitacionRepositoryMock implements ILicitacionRepository {
  constructor(private readonly service: ILicitacionService) {}

  private mapDtoToEntity(dto: LicitacionItemDTO): Licitacion {
    // Simulate different completion states for different licitaciones
    // documentosCompletados = 0 -> Shows in Dashboard (new opportunities)
    // documentosCompletados > 0 -> Shows in Borradores (in progress)
    const completionMap: Record<string, number> = {
      'LIC-001': 0,  // New - shows in Dashboard
      'LIC-002': 0,  // New - shows in Dashboard
      'LIC-003': 0,  // New - shows in Dashboard
      'LIC-004': 0,  // New - shows in Dashboard
      'LIC-005': 5,  // In progress - shows in Borradores (5/10 docs)
      'LIC-006': 8,  // In progress - shows in Borradores (8/10 docs)
    };

    const documentosCompletados = completionMap[dto.id] ?? 0;

    // Generate realistic summaries and amounts per licitacion
    const detailsMap: Record<string, { resumen: string; montoMin: number; montoMax: number; tipoContrato: string }> = {
      'LIC-001': {
        resumen: 'Construcción y dotación completa de un centro de salud de primer nivel de atención en la localidad de Usaquén. Incluye obras civiles, instalaciones eléctricas, hidráulicas, redes de datos y equipamiento médico básico. Área aproximada de construcción: 1,200 m².',
        montoMin: 2500000000,
        montoMax: 3200000000,
        tipoContrato: 'Licitación Pública'
      },
      'LIC-002': {
        resumen: 'Consultoría especializada para el diseño e implementación de un plan de transformación digital institucional. Incluye diagnóstico de madurez digital, arquitectura empresarial, diseño de servicios digitales y capacitación del personal. Duración estimada: 12 meses.',
        montoMin: 800000000,
        montoMax: 1200000000,
        tipoContrato: 'Concurso de Méritos'
      },
      'LIC-003': {
        resumen: 'Suministro de equipos médicos de alta tecnología incluyendo monitores de signos vitales, electrocardiógrafos, ecógrafos y equipos de laboratorio clínico. Se requiere instalación, capacitación y garantía mínima de 3 años.',
        montoMin: 1500000000,
        montoMax: 2000000000,
        tipoContrato: 'Licitación Pública'
      },
      'LIC-004': {
        resumen: 'Mantenimiento preventivo y correctivo de la red vial terciaria en el departamento del Valle del Cauca. Incluye bacheo, reparcheo, limpieza de obras de arte, señalización vertical y horizontal. Longitud aproximada: 250 km.',
        montoMin: 5000000000,
        montoMax: 6500000000,
        tipoContrato: 'Licitación Pública'
      },
      'LIC-005': {
        resumen: 'Desarrollo de un sistema de gestión documental electrónica para el Ministerio de Educación. Debe incluir digitalización de archivos históricos, motor de búsqueda avanzado, flujos de trabajo automatizados y módulo de firma electrónica. Compatible con GD01.',
        montoMin: 1200000000,
        montoMax: 1800000000,
        tipoContrato: 'Selección Abreviada'
      },
      'LIC-006': {
        resumen: 'Auditoría integral de seguridad informática de la infraestructura tecnológica del Banco de la República. Incluye pentesting, análisis de vulnerabilidades, revisión de políticas de seguridad y plan de mejoramiento. Se requiere certificación ISO 27001.',
        montoMin: 600000000,
        montoMax: 900000000,
        tipoContrato: 'Concurso de Méritos'
      }
    };

    const details = detailsMap[dto.id] || {
      resumen: `Oportunidad de ${dto.sector.toLowerCase()} con un ${dto.match.score * 100}% de coincidencia con tu perfil empresarial.`,
      montoMin: 100000000,
      montoMax: 500000000,
      tipoContrato: 'Licitación Pública'
    };

    return {
      id: dto.id,
      nombre: dto.titulo,
      entidad: dto.entidadContratante,
      montoMin: details.montoMin,
      montoMax: details.montoMax,
      fechaCierre: dto.fechaCierre,
      estado: dto.esNueva ? 'nueva' : 'en_progreso',
      sector: dto.sector,
      region: dto.ubicacion,
      tipoContrato: details.tipoContrato,
      resumen: details.resumen,
      documentosTotal: 10,
      documentosCompletados
    };
  }

  async getAll(): Promise<Licitacion[]> {
    const response = await this.service.getLicitaciones();
    return response.licitaciones.map(dto => this.mapDtoToEntity(dto));
  }

  async getById(id: string): Promise<Licitacion | null> {
    const all = await this.getAll();
    // Backward compatibility for legacy ID "1" -> "LIC-001"
    const searchId = id === "1" ? "LIC-001" : id;
    return all.find(l => l.id === searchId) || null;
  }

  async filterBySector(sector: string): Promise<Licitacion[]> {
    const all = await this.getAll();
    if (!sector) return all;
    return all.filter(l => l.sector === sector);
  }

  async filterByRegion(region: string): Promise<Licitacion[]> {
    const all = await this.getAll();
    if (!region) return all;
    return all.filter(l => l.region === region);
  }

  async search(query: string): Promise<Licitacion[]> {
    const all = await this.getAll();
    if (!query) return all;

    const lowerQuery = query.toLowerCase();
    return all.filter(l =>
      l.nombre.toLowerCase().includes(lowerQuery) ||
      l.entidad.toLowerCase().includes(lowerQuery) ||
      l.sector.toLowerCase().includes(lowerQuery)
    );
  }
}
