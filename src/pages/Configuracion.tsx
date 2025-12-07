import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TopNav } from '@/components/layout/TopNav';
import { CompanyProfileForm, CompanyData } from '@/components/forms/CompanyProfileForm';
import { LicitacionPreferencesForm, PreferencesData } from '@/components/forms/LicitacionPreferencesForm';
import { Building2, Save, SlidersHorizontal, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Configuracion() {
    const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');

    // Initialize with some mock data if available, or empty
    const [companyData, setCompanyData] = useState<CompanyData>({
        nombreLegal: 'Constructora Ejemplo S.A.S',
        nit: '900.123.456-7',
        sector: 'Construcción',
        tamano: 'Mediana (51-200)',
        ciudad: 'Bogotá D.C.'
    });

    const [preferences, setPreferences] = useState<PreferencesData>({
        montoMin: '50000000',
        montoMax: '800000000',
        sectores: ['Construcción', 'Infraestructura'],
        tiposContrato: ['Obra pública'],
        tiposEntidad: [],
        regiones: ['Bogotá D.C.', 'Cundinamarca']
    });

    const handleSave = () => {
        toast.success('Configuración actualizada correctamente');
    };

    return (
        <div className="min-h-screen bg-background animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-semibold text-foreground tracking-tight p-6 mt-1 flex items-center gap-2">
                        <Settings className="w-6 h-6 text-primary" />
                        Configuración
                    </h2>
                </div>
                <TopNav />
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar Tabs */}
                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                                activeTab === 'profile'
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted text-muted-foreground"
                            )}
                        >
                            <Building2 className="w-4 h-4" />
                            Perfil de Empresa
                        </button>
                        <button
                            onClick={() => setActiveTab('preferences')}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                                activeTab === 'preferences'
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted text-muted-foreground"
                            )}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Preferencias
                        </button>
                    </div>

                    {/* Content */}
                    <div className="card-elevated p-8 bg-card">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-foreground">
                                {activeTab === 'profile' ? 'Información de la Empresa' : 'Preferencias de Licitación'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {activeTab === 'profile'
                                    ? 'Actualiza los datos legales y generales de tu empresa.'
                                    : 'Personaliza los criterios para encontrar las mejores oportunidades.'}
                            </p>
                        </div>

                        {activeTab === 'profile' ? (
                            <CompanyProfileForm
                                data={companyData}
                                onChange={setCompanyData}
                            />
                        ) : (
                            <LicitacionPreferencesForm
                                data={preferences}
                                onChange={setPreferences}
                            />
                        )}

                        <div className="mt-8 pt-6 border-t border-border flex justify-end">
                            <Button onClick={handleSave} className="items-center gap-2">
                                <Save className="w-4 h-4" />
                                Guardar cambios
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
