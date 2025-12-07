import { Calendar, MapPin, Building2, ArrowRight } from 'lucide-react';
import { Match } from './Match';
import { useNavigate } from 'react-router-dom';
import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { cn } from '@/lib/utils';

interface LicitacionCardProps {
  licitacion: Licitacion;
}

const estadoBadges = {
  nueva: { label: 'Nueva', className: 'badge-new' },
  en_progreso: { label: 'En progreso', className: 'badge-progress' },
  casi_cierra: { label: 'Cierra pronto', className: 'badge-urgent' }
};

const formatMoney = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short'
  });
};

export function LicitacionCard({ licitacion }: LicitacionCardProps) {
  const navigate = useNavigate();
  const badge = estadoBadges[licitacion.estado];

  const progress =
    licitacion.documentosTotal > 0
      ? Math.round(
        (licitacion.documentosCompletados / licitacion.documentosTotal) * 100
      )
      : 0;

  return (
    <div
      onClick={() => navigate(`/licitacion/${licitacion.id}`)}
      className={cn(
        'card-interactive group relative overflow-hidden cursor-pointer',
        'p-6 pb-8 h-full flex flex-col'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={badge.className}>{badge.label}</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {licitacion.sector}
            </span>
            <Match percentage={95} />
          </div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {licitacion.nombre}
          </h3>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span className="truncate">{licitacion.entidad}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{licitacion.region}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Cierra {formatDate(licitacion.fechaCierre)}</span>
          </div>
        </div>
      </div>

      {/* Texto + barra SOLO en hover */}
      {licitacion.documentosCompletados > 0 && (
        <>
          {/* fila de texto */}
          <div
            className="
              mt-2 flex items-center justify-between text-xs
              opacity-0 translate-y-1
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-200
            "
          >
            <span className="text-muted-foreground">Documentos completados</span>
            <span className="font-medium text-foreground">
              {licitacion.documentosCompletados}/{licitacion.documentosTotal}
            </span>
          </div>

          {/* borde inferior de progreso */}
          <div
            className="
              absolute left-0 right-0 bottom-0 h-1.5 bg-muted
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
          >
            <div
              className="
                h-full bg-primary
                transition-[width] duration-300
                group-hover:bg-primary/90
              "
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
