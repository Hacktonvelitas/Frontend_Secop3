import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';

export const mockDocumentosData: Documento[] = [
  {
    id: '1',
    nombre: 'Registro Único de Proponentes (RUP)',
    categoria: 'juridico',
    estado: 'aprobado',
    observaciones: 'Documento válido hasta diciembre 2024',
    fecha_carga: '2023-11-15'
  },
  {
    id: '2',
    nombre: 'Certificado de Existencia y Representación Legal',
    categoria: 'juridico',
    estado: 'vencido',
    observaciones: 'La fecha de expedición supera los 30 días permitidos',
    fecha_carga: null
  },
  {
    id: '3',
    nombre: 'Estados Financieros 2023',
    categoria: 'financiero',
    estado: 'requiere_accion',
    observaciones: 'Falta firma del contador',
    fecha_carga: '2023-11-20'
  },
  {
    id: '4',
    nombre: 'Garantía de Seriedad de la Oferta',
    categoria: 'financiero',
    estado: 'pendiente',
    observaciones: null,
    fecha_carga: null
  },
  {
    id: '5',
    nombre: 'Certificado de Experiencia 1',
    categoria: 'tecnico',
    estado: 'aprobado',
    observaciones: null,
    fecha_carga: '2023-11-10'
  },
  {
    id: '6',
    nombre: 'Certificado de Experiencia 2',
    categoria: 'tecnico',
    estado: 'aprobado',
    observaciones: null,
    fecha_carga: '2023-11-10'
  }
];

export const mockResumenEstadoData: ResumenEstado = {
  total_documentos: 12,
  aprobados: 3,
  pendientes: 4,
  requiere_accion: 1,
  vencidos: 1
};
