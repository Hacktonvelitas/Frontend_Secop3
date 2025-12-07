import { Licitacion } from '@/domain/entities/Licitacion.entity';

export const mockLicitacionesData: Licitacion[] = [
  {
    id: '1',
    nombre: 'Construcción de Centro de Salud Municipal',
    entidad: 'Alcaldía de Bogotá',
    montoMin: 500000000,
    montoMax: 750000000,
    fechaCierre: '2024-02-15',
    estado: 'nueva',
    sector: 'Construcción',
    region: 'Bogotá D.C.',
    tipoContrato: 'Obra pública',
    resumen: 'Proyecto para la construcción de un centro de salud de nivel 2 con capacidad para 50 camas, consultorios externos y área de urgencias.',
    documentosTotal: 12,
    documentosCompletados: 0
  },
  {
    id: '2',
    nombre: 'Mantenimiento de Infraestructura Vial',
    entidad: 'Gobernación de Antioquia',
    montoMin: 200000000,
    montoMax: 350000000,
    fechaCierre: '2024-02-08',
    estado: 'casi_cierra',
    sector: 'Infraestructura',
    region: 'Antioquia',
    tipoContrato: 'Mantenimiento',
    resumen: 'Mantenimiento preventivo y correctivo de 45 km de vías secundarias en el departamento.',
    documentosTotal: 10,
    documentosCompletados: 7
  },
  {
    id: '3',
    nombre: 'Suministro de Equipos de Cómputo',
    entidad: 'Ministerio de Educación',
    montoMin: 80000000,
    montoMax: 120000000,
    fechaCierre: '2024-02-20',
    estado: 'en_progreso',
    sector: 'Tecnología',
    region: 'Nacional',
    tipoContrato: 'Suministro',
    resumen: 'Adquisición de 500 equipos de cómputo para instituciones educativas rurales.',
    documentosTotal: 8,
    documentosCompletados: 4
  },
  {
    id: '4',
    nombre: 'Consultoría en Transformación Digital',
    entidad: 'DIAN',
    montoMin: 150000000,
    montoMax: 250000000,
    fechaCierre: '2024-02-25',
    estado: 'nueva',
    sector: 'Tecnología',
    region: 'Bogotá D.C.',
    tipoContrato: 'Consultoría',
    resumen: 'Servicios de consultoría para el diseño e implementación de la estrategia de transformación digital institucional.',
    documentosTotal: 15,
    documentosCompletados: 0
  },
  {
    id: '5',
    nombre: 'Servicio de Vigilancia y Seguridad',
    entidad: 'Universidad Nacional',
    montoMin: 300000000,
    montoMax: 450000000,
    fechaCierre: '2024-02-12',
    estado: 'en_progreso',
    sector: 'Servicios',
    region: 'Bogotá D.C.',
    tipoContrato: 'Prestación de servicios',
    resumen: 'Prestación de servicios de vigilancia armada y no armada para las sedes de la universidad.',
    documentosTotal: 11,
    documentosCompletados: 9
  }
];

export const sectoresData = [
  'Construcción',
  'Tecnología',
  'Servicios',
  'Infraestructura',
  'Salud',
  'Educación',
  'Transporte'
];

export const regionesData = [
  'Bogotá D.C.',
  'Antioquia',
  'Valle del Cauca',
  'Atlántico',
  'Santander',
  'Nacional'
];

export const tiposContratoData = [
  'Obra pública',
  'Suministro',
  'Consultoría',
  'Prestación de servicios',
  'Mantenimiento',
  'Interventoría'
];

export const tiposEntidadData = [
  'Alcaldía',
  'Gobernación',
  'Ministerio',
  'Entidad descentralizada',
  'Universidad pública',
  'Hospital público'
];
