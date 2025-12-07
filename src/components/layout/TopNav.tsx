import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, AlertCircle, X, CircleUser, Building2 } from 'lucide-react';
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

export function TopNav() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  const closeAllDropdowns = () => {
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => {
            setIsNotificationsOpen(!isNotificationsOpen);
            setIsProfileOpen(false);
          }}
          className="relative p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full ring-4 ring-destructive/20 animate-pulse" />
          )}
        </button>

        {isNotificationsOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={closeAllDropdowns}
            />
            <div className="absolute right-0 top-full mt-2 w-96 bg-card rounded-2xl shadow-elevated border border-border z-50 animate-scale-in">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notificaciones</h3>
                <button
                  onClick={closeAllDropdowns}
                  className="p-1 rounded-lg hover:bg-muted transition-colors duration-200"
                  aria-label="Cerrar notificaciones"
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
                            "p-3 rounded-xl cursor-pointer transition-colors duration-200",
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

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsNotificationsOpen(false);
          }}
          className="p-2.5 rounded-xl hover:bg-muted transition-colors duration-200"
          aria-label="Perfil de usuario"
        >
          <CircleUser className="w-6 h-6 text-muted-foreground" />
        </button>

        {isProfileOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={closeAllDropdowns}
            />
            <div className="absolute right-0 top-full mt-2 w-64 bg-card rounded-2xl shadow-elevated border border-border z-50 animate-scale-in">
              <div className="p-3">

                <button
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200"
                  onClick={closeAllDropdowns}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
