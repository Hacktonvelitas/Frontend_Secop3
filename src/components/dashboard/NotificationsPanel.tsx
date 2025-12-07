import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';
import { Notificacion } from '@/domain/entities/Notificacion.entity';
import { notificacionRepository } from '@/infrastructure/repositories';
import { cn } from '@/lib/utils';

const tipoConfig = {
  critico: {
    icon: AlertTriangle,
    iconColor: 'text-destructive',
    bgColor: 'bg-destructive/10'
  },
  importante: {
    icon: AlertCircle,
    iconColor: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  info: {
    icon: Info,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10'
  }
};

export function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notificacion[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await notificacionRepository.getAll();
      setNotifications(data);
    };

    loadNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.leida).length;

  const groupedNotifications = {
    critico: notifications.filter(n => n.tipo === 'critico'),
    importante: notifications.filter(n => n.tipo === 'importante'),
    info: notifications.filter(n => n.tipo === 'info')
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 bg-card rounded-2xl shadow-elevated border border-border z-50 animate-scale-in">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Notificaciones</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {(['critico', 'importante', 'info'] as const).map((tipo) => {
                const items = groupedNotifications[tipo];
                if (items.length === 0) return null;

                const config = tipoConfig[tipo];
                const Icon = config.icon;
                const labels = {
                  critico: 'Crítico',
                  importante: 'Importante',
                  info: 'Informativo'
                };

                return (
                  <div key={tipo} className="p-2">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <Icon className={cn("w-4 h-4", config.iconColor)} />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {labels[tipo]}
                      </span>
                    </div>
                    {items.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-3 rounded-xl cursor-pointer transition-colors",
                          notification.leida ? "hover:bg-muted/50" : cn(config.bgColor, "hover:opacity-80")
                        )}
                      >
                        <p className={cn(
                          "text-sm font-medium",
                          notification.leida ? "text-muted-foreground" : "text-foreground"
                        )}>
                          {notification.titulo}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {notification.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-border">
              <button className="w-full text-sm text-primary font-medium hover:underline">
                Ver todas las notificaciones
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
