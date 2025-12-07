import { NavLink, useLocation } from 'react-router-dom';
import logoSiipro from '@/images/logo_siipro.png';
import {
  LayoutDashboard,
  FileText,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Licitaciones' },
  { to: '/borradores', icon: FileText, label: 'Borradores' },
  { to: '/configuracion', icon: Settings, label: 'Configuración' },
  { to: '/ayuda', icon: HelpCircle, label: 'Ayuda' },
];

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar flex flex-col z-40 border-r border-sidebar-border/10",
        // Animación del contenedor principal:
        // duration-500 para que sea lento y elegante
        // ease-in-out para suavizar el inicio y el final
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo Section */}
      <div
        onClick={onToggle}
        className={cn(
          "h-28 flex items-center cursor-pointer group select-none transition-all duration-300",
          collapsed ? "justify-center px-0" : "px-8"
        )}
        title={collapsed ? "Expandir" : "Colapsar"}
      >
        <div className={cn(
          "w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500",
          // Efecto sutil: el logo respira (escala) al hacer click o hover
          "group-hover:scale-105 active:scale-95 shadow-sm"
        )}>
          <img src={logoSiipro} alt="SIICOP Logo" className="w-8 h-8 object-contain" />
        </div>

        {/* Texto del Logo con Animación de Entrada/Salida */}
        <div className={cn(
          "flex flex-col justify-center overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out",
          collapsed ? "w-0 opacity-0 translate-x-4" : "w-40 opacity-100 translate-x-3"
        )}>
          <span className="font-bold text-xl text-sidebar-foreground tracking-tight leading-none">
            SIICOP
          </span>
          <span className="text-[10px] text-sidebar-foreground/50 font-medium uppercase tracking-wider">
            Gestión
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 space-y-2",
        collapsed ? "" : "px-8"
      )}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                if (!collapsed && onToggle) {
                  onToggle();
                }
              }}
              className={cn(
                "relative flex items-center h-12 rounded-xl transition-all duration-300 group overflow-hidden",
                // Hover effect estilo Apple: suave y translúcido
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
                collapsed ? "justify-center px-0" : "px-4"
              )}
            >
              {/* Icono */}
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-all duration-500",
                // Si está activo y colapsado, el icono brilla un poco más
                isActive && collapsed && "text-primary scale-110"
              )} />

              {/* Texto del Menú */}
              <span className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out absolute left-12",
                // Lógica de desaparición:
                // Opacidad, ancho y una ligera traslación para dar sensación de movimiento
                collapsed
                  ? "opacity-0 w-0 translate-x-10 pointer-events-none"
                  : "opacity-100 w-auto translate-x-0"
              )}>
                {item.label}
              </span>

              {/* Tooltip simple para cuando está colapsado (Opcional UX improvement) */}
              {collapsed && (
                <div className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-lg">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}