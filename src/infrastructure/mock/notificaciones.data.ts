import { Notificacion } from '@/domain/entities/Notificacion.entity';

export const mockNotificacionesData: Notificacion[] = [
  {
    id: '1',
    tipo: 'critico',
    titulo: 'Documento vencido',
    descripcion: 'El Certificado de Existencia en la licitación "Construcción Centro de Salud" ha vencido',
    fecha: '2024-01-28',
    leida: false
  },
  {
    id: '2',
    tipo: 'critico',
    titulo: 'Cierre próximo',
    descripcion: 'La licitación "Mantenimiento Vial" cierra en 3 días',
    fecha: '2024-01-28',
    leida: false
  },
  {
    id: '3',
    tipo: 'importante',
    titulo: 'Cambio en pliego',
    descripcion: 'Se modificaron requisitos técnicos en "Suministro Equipos de Cómputo"',
    fecha: '2024-01-27',
    leida: true
  },
  {
    id: '4',
    tipo: 'info',
    titulo: 'Nueva licitación compatible',
    descripcion: 'Encontramos una nueva oportunidad que coincide con tu perfil',
    fecha: '2024-01-26',
    leida: true
  }
];
