import { ILicitacionService, LicitacionResponseDTO } from '@/domain/services/ILicitacionService';

export class LicitacionService implements ILicitacionService {
  async getLicitaciones(): Promise<LicitacionResponseDTO> {
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      "usuarioId": "empresa-123",
      "totalMatches": 6,
      "filtros": {
        "busqueda": "",
        "sector": "todos",
        "region": "todas"
      },
      "licitaciones": [
        {
          "id": "LIC-001",
          "titulo": "Construcción de Centro de Salud Municipal",
          "entidadContratante": "Alcaldía de Bogotá",
          "sector": "Construcción",
          "estadoEtiqueta": "Nueva",
          "match": {
            "score": 0.95,
            "texto": "95% Match"
          },
          "ubicacion": "Bogotá D.C.",
          "fechaCierre": "2026-02-14",
          "fechaCierreTexto": "Cierra 14 de feb",
          "esNueva": true,
          "regionCodigo": "CO-DC",
          "urlDetalle": "/licitaciones/LIC-001"
        },
        {
          "id": "LIC-002",
          "titulo": "Consultoría en Transformación Digital",
          "entidadContratante": "DIAN",
          "sector": "Tecnología",
          "estadoEtiqueta": "Nueva",
          "match": {
            "score": 0.95,
            "texto": "95% Match"
          },
          "ubicacion": "Bogotá D.C.",
          "fechaCierre": "2026-02-24",
          "fechaCierreTexto": "Cierra 24 de feb",
          "esNueva": true,
          "regionCodigo": "CO-DC",
          "urlDetalle": "/licitaciones/LIC-002"
        },
        {
          "id": "LIC-003",
          "titulo": "Suministro de Equipos Médicos",
          "entidadContratante": "Hospital San Juan de Dios",
          "sector": "Salud",
          "estadoEtiqueta": "Nueva",
          "match": {
            "score": 0.88,
            "texto": "88% Match"
          },
          "ubicacion": "Medellín",
          "fechaCierre": "2026-03-10",
          "fechaCierreTexto": "Cierra 10 de mar",
          "esNueva": true,
          "regionCodigo": "CO-ANT",
          "urlDetalle": "/licitaciones/LIC-003"
        },
        {
          "id": "LIC-004",
          "titulo": "Mantenimiento de Infraestructura Vial",
          "entidadContratante": "Invías",
          "sector": "Infraestructura",
          "estadoEtiqueta": "Nueva",
          "match": {
            "score": 0.92,
            "texto": "92% Match"
          },
          "ubicacion": "Cali",
          "fechaCierre": "2026-02-28",
          "fechaCierreTexto": "Cierra 28 de feb",
          "esNueva": true,
          "regionCodigo": "CO-VAC",
          "urlDetalle": "/licitaciones/LIC-004"
        },
        {
          "id": "LIC-005",
          "titulo": "Desarrollo de Sistema de Gestión Documental",
          "entidadContratante": "Ministerio de Educación",
          "sector": "Tecnología",
          "estadoEtiqueta": "En progreso",
          "match": {
            "score": 0.90,
            "texto": "90% Match"
          },
          "ubicacion": "Bogotá D.C.",
          "fechaCierre": "2026-03-15",
          "fechaCierreTexto": "Cierra 15 de mar",
          "esNueva": false,
          "regionCodigo": "CO-DC",
          "urlDetalle": "/licitaciones/LIC-005"
        },
        {
          "id": "LIC-006",
          "titulo": "Auditoría de Seguridad Informática",
          "entidadContratante": "Banco de la República",
          "sector": "Tecnología",
          "estadoEtiqueta": "En progreso",
          "match": {
            "score": 0.87,
            "texto": "87% Match"
          },
          "ubicacion": "Bogotá D.C.",
          "fechaCierre": "2026-03-20",
          "fechaCierreTexto": "Cierra 20 de mar",
          "esNueva": false,
          "regionCodigo": "CO-DC",
          "urlDetalle": "/licitaciones/LIC-006"
        }
      ]
    };
  }
}
