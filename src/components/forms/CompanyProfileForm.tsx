import { Building2, MapPin, Briefcase, Users } from 'lucide-react';
import { sectores } from '@/infrastructure/mock';
import { cn } from '@/lib/utils';

export interface CompanyData {
    nombreLegal: string;
    nit: string;
    sector: string;
    tamano: string;
    ciudad: string;
}

interface CompanyProfileFormProps {
    data: CompanyData;
    onChange: (data: CompanyData) => void;
}

export function CompanyProfileForm({ data, onChange }: CompanyProfileFormProps) {
    const tamanos = ['Micro (1-10)', 'Pequeña (11-50)', 'Mediana (51-200)', 'Grande (200+)'];

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre legal
                    </label>
                    <input
                        type="text"
                        value={data.nombreLegal}
                        onChange={(e) => onChange({ ...data, nombreLegal: e.target.value })}
                        placeholder="Razón social completa"
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        NIT
                    </label>
                    <input
                        type="text"
                        value={data.nit}
                        onChange={(e) => onChange({ ...data, nit: e.target.value })}
                        placeholder="XXX.XXX.XXX-X"
                        className="input-field"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Sector principal
                </label>
                <div className="flex flex-wrap gap-2">
                    {sectores.map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => onChange({ ...data, sector: s })}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                data.sector === s
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Tamaño de empresa
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {tamanos.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => onChange({ ...data, tamano: t })}
                            className={cn(
                                "px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                                data.tamano === t
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Ciudad principal
                </label>
                <input
                    type="text"
                    value={data.ciudad}
                    onChange={(e) => onChange({ ...data, ciudad: e.target.value })}
                    placeholder="Ej: Bogotá, Medellín, Cali..."
                    className="input-field"
                />
            </div>
        </div>
    );
}
