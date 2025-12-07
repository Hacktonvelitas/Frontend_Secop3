import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'primary' | 'warning' | 'success';
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const iconBgColors = {
    default: 'bg-muted',
    primary: 'bg-primary/10',
    warning: 'bg-warning/10',
    success: 'bg-success/10'
  };

  const iconColors = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    warning: 'text-warning',
    success: 'text-success'
  };

  return (
    <div className="card-elevated p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs mt-2 font-medium",
              trend.value >= 0 ? "text-success" : "text-destructive"
            )}>
              {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconBgColors[variant])}>
          <Icon className={cn("w-6 h-6", iconColors[variant])} />
        </div>
      </div>
    </div>
  );
}
