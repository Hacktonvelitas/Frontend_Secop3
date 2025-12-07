import { useMemo } from 'react';
import { LicitacionCard } from '@/components/dashboard/LicitacionCard';
import { TopNav } from '@/components/layout/TopNav';
import { useLicitaciones } from '@/hooks/use-licitaciones';

export default function Borradores() {
    const { data: rawLicitaciones = [], isLoading } = useLicitaciones();

    const borradores = useMemo(() => {
        return rawLicitaciones.filter(l => l.documentosCompletados > 0);
    }, [rawLicitaciones]);

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-foreground tracking-tight p-6 mt-1">
                        Mis Borradores <span className="text-muted-foreground font-normal text-base ml-2">({borradores.length})</span>
                    </h2>
                </div>
                <TopNav />
            </div>

            {/* Licitaciones grid */}
            {isLoading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Cargando borradores...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {borradores.map((licitacion, index) => (
                            <div
                                key={licitacion.id}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className="animate-slide-up"
                            >
                                <LicitacionCard licitacion={licitacion} />
                            </div>
                        ))}
                    </div>

                    {borradores.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                No tienes borradores pendientes.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
