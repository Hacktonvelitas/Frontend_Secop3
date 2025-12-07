import { Notificacion } from '../entities/Notificacion.entity';

export interface INotificacionRepository {
  getAll(): Promise<Notificacion[]>;
  getById(id: string): Promise<Notificacion | null>;
  getUnread(): Promise<Notificacion[]>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(): Promise<void>;
}
