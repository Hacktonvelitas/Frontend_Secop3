import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CompanyProfileForm, CompanyData } from '@/components/forms/CompanyProfileForm';
import { LicitacionPreferencesForm, PreferencesData } from '@/components/forms/LicitacionPreferencesForm';
import { useUpdateCompany } from '@/hooks/use-company';


type Step = 1 | 2;

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  const { mutate: updateCompany, isPending } = useUpdateCompany();

  const [companyData, setCompanyData] = useState<CompanyData>({
    nombreLegal: '',
    nit: '',
    sector: '',
    tamano: '',
    ciudad: ''
  });

  const [preferences, setPreferences] = useState<PreferencesData>({
    montoMin: '',
    montoMax: '',
    sectores: [],
    tiposContrato: [],
    tiposEntidad: [],
    regiones: []
  });

  const handleNext = () => {
    if (step === 1) {
      console.log("Company Data:", companyData);
      updateCompany(companyData, {
        onSuccess: () => {
          setStep(2);
        },
        onError: (error) => {
          console.error("Failed to update company", error);
          // Optionally handle error state here
        }
      });
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground tracking-tight">
              SIICOP
            </span>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className={cn(
              "w-16 h-1 rounded-full transition-colors",
              step >= 2 ? "bg-primary" : "bg-muted"
            )} />
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              2
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto animate-fade-in">
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Cuéntanos sobre tu empresa
                </h1>
                <p className="text-muted-foreground">
                  Esta información nos ayuda a personalizar tu experiencia
                </p>
              </div>

              <CompanyProfileForm
                data={companyData}
                onChange={setCompanyData}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  ¿Qué licitaciones te interesan?
                </h1>
                <p className="text-muted-foreground">
                  Configura tus preferencias para mostrarte oportunidades relevantes
                </p>
              </div>

              <LicitacionPreferencesForm
                data={preferences}
                onChange={setPreferences}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {step > 1 ? (
            <button onClick={handleBack} className="btn-ghost">
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>
          ) : (
            <div />
          )}

          <button onClick={handleNext} className="btn-primary" disabled={isPending}>
            {step === 2 ? 'Ir al dashboard' : (isPending ? 'Guardando...' : 'Continuar')}
            {!isPending && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </footer>
    </div>
  );
}
