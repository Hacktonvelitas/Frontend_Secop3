export interface Notificacion {
  id: string;
  tipo: 'critico' | 'importante' | 'info';
  titulo: string;
  descripcion: string;
  fecha: string;
  leida: boolean;
}

export type NotificacionTipo = Notificacion['tipo'];
