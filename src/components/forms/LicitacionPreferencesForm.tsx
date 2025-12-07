import { DollarSign } from 'lucide-react';
import { sectores, regiones, tiposContrato } from '@/infrastructure/mock';
import { cn } from '@/lib/utils';

export interface PreferencesData {
    montoMin: string;
    montoMax: string;
    sectores: string[];
    tiposContrato: string[];
    tiposEntidad: string[];
    regiones: string[];
}

interface LicitacionPreferencesFormProps {
    data: PreferencesData;
    onChange: (data: PreferencesData) => void;
}

export function LicitacionPreferencesForm({ data, onChange }: LicitacionPreferencesFormProps) {

    const toggleArrayItem = (array: string[], item: string) => {
        if (array.includes(item)) {
            return array.filter(i => i !== item);
        }
        return [...array, item];
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Rango de montos (COP)
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={data.montoMin}
                        onChange={(e) => onChange({ ...data, montoMin: e.target.value })}
                        placeholder="Mínimo: $50.000.000"
                        className="input-field"
                    />
                    <input
                        type="text"
                        value={data.montoMax}
                        onChange={(e) => onChange({ ...data, montoMax: e.target.value })}
                        placeholder="Máximo: $500.000.000"
                        className="input-field"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Sectores de interés
                </label>
                <div className="flex flex-wrap gap-2">
                    {sectores.map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => onChange({
                                ...data,
                                sectores: toggleArrayItem(data.sectores, s)
                            })}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                data.sectores.includes(s)
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
                    Tipos de contrato
                </label>
                <div className="flex flex-wrap gap-2">
                    {tiposContrato.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => onChange({
                                ...data,
                                tiposContrato: toggleArrayItem(data.tiposContrato, t)
                            })}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                data.tiposContrato.includes(t)
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
                    Regiones preferidas
                </label>
                <div className="flex flex-wrap gap-2">
                    {regiones.map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => onChange({
                                ...data,
                                regiones: toggleArrayItem(data.regiones, r)
                            })}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                data.regiones.includes(r)
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
