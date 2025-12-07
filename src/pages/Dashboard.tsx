import { useState, useMemo } from 'react';
import { FileText, Clock, AlertTriangle, Search, SlidersHorizontal } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { LicitacionCard } from '@/components/dashboard/LicitacionCard';
import { TopNav } from '@/components/layout/TopNav';
import { sectores, regiones } from '@/infrastructure/mock';
import { cn } from '@/lib/utils';
import { useLicitaciones, useFilterLicitaciones } from '@/hooks/use-licitaciones';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const hasFilters = !!(searchQuery || selectedSector || selectedRegion);

  const { data: rawLicitaciones = [], isLoading: isLoadingAll } = useLicitaciones();
  const allLicitaciones = useMemo(() => rawLicitaciones.filter(l => l.documentosCompletados === 0), [rawLicitaciones]);

  const { data: filteredLicitaciones = [], isLoading: isLoadingFiltered } = useFilterLicitaciones({
    searchQuery,
    sector: selectedSector,
    region: selectedRegion,
  });

  const displayLicitaciones = hasFilters ? filteredLicitaciones : allLicitaciones;
  const isLoading = hasFilters ? isLoadingFiltered : isLoadingAll;

  const stats = useMemo(() => {
    return {
      nuevas: allLicitaciones.filter(l => l.estado === 'nueva').length,
      enProgreso: allLicitaciones.filter(l => l.estado === 'en_progreso').length,
      porCerrar: allLicitaciones.filter(l => l.estado === 'casi_cierra').length
    };
  }, [allLicitaciones]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground tracking-tight p-6 mt-1">
            ¡Hola!, tienes <span className="text-primary font-bold">{stats.nuevas}</span> oportunidades que coinciden con tu perfil.
          </h2>
        </div>
        <TopNav />
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Nuevas oportunidades"
          value={stats.nuevas}
          icon={FileText}
          variant="primary"
          trend={{ value: 12, label: 'esta semana' }}
        />
        <StatCard
          title="En progreso"
          value={stats.enProgreso}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Próximas a cerrar"
          value={stats.porCerrar}
          icon={AlertTriangle}
          variant="success"
        />
      </div> */}

      {/* Search & Filters Refactored */}
      <div className="flex items-center p-1 bg-background border rounded-full shadow-sm hover:shadow-md transition-shadow mb-8">
        <div className="flex-1 flex items-center px-4">
          <Search className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, entidad..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-muted-foreground h-10 w-full"
          />
        </div>

        <Separator orientation="vertical" className="h-8 mx-2" />

        <div className="w-[200px]">
          <Select value={selectedSector || "all_sectors"} onValueChange={(val) => setSelectedSector(val === "all_sectors" ? "" : val)}>
            <SelectTrigger className="w-full border-none shadow-none bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0 h-10 text-muted-foreground font-medium">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_sectors">Todos los sectores</SelectItem>
              {sectores.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-8 mx-2" />

        <div className="w-[200px]">
          <Select value={selectedRegion || "all_regions"} onValueChange={(val) => setSelectedRegion(val === "all_regions" ? "" : val)}>
            <SelectTrigger className="w-full border-none shadow-none bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0 h-10 text-muted-foreground font-medium">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_regions">Todas las regiones</SelectItem>
              {regiones.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="rounded-full px-8 ml-2 h-10" onClick={() => { }}>
          Buscar
        </Button>
      </div>

      {/* Licitaciones grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Cargando licitaciones...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {displayLicitaciones.map((licitacion, index) => (
              <div
                key={licitacion.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-slide-up"
              >
                <LicitacionCard licitacion={licitacion} />
              </div>
            ))}
          </div>

          {displayLicitaciones.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No se encontraron licitaciones con los filtros seleccionados
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
