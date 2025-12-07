import { INotificacionRepository } from '@/domain/repositories/INotificacionRepository';
import { Notificacion } from '@/domain/entities/Notificacion.entity';
import { mockNotificacionesData } from '../mock/notificaciones.data';

export class NotificacionRepositoryMock implements INotificacionRepository {
  private notificaciones: Notificacion[] = mockNotificacionesData;

  async getAll(): Promise<Notificacion[]> {
    return Promise.resolve([...this.notificaciones]);
  }

  async getById(id: string): Promise<Notificacion | null> {
    const notificacion = this.notificaciones.find(n => n.id === id);
    return Promise.resolve(notificacion || null);
  }

  async getUnread(): Promise<Notificacion[]> {
    const unread = this.notificaciones.filter(n => !n.leida);
    return Promise.resolve(unread);
  }

  async markAsRead(id: string): Promise<Notificacion | null> {
    const notificacion = this.notificaciones.find(n => n.id === id);
    if (!notificacion) {
      return Promise.resolve(null);
    }

    notificacion.leida = true;
    return Promise.resolve({ ...notificacion });
  }

  async markAllAsRead(): Promise<void> {
    this.notificaciones.forEach(n => {
      n.leida = true;
    });
    return Promise.resolve();
  }
}
