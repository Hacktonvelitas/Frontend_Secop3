import { Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Match({ percentage }: { percentage: number }) {
    return (
        <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors",
            "bg-primary/10 text-primary border border-primary/20"
        )}>
            <div className="flex items-center gap-0.5">
                <Gauge className="w-3.5 h-3.5 text-primary" />
                <Gauge className="w-3.5 h-3.5 text-cyan-600" />
            </div>
            <span>{percentage}% Match</span>
        </div>
    );
}
