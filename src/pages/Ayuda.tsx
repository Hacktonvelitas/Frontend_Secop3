import { TopNav } from '@/components/layout/TopNav';
import { HelpCircle, FileText, Check, Calculator, Shield } from 'lucide-react';

export default function Ayuda() {
    const features = [
        {
            icon: FileText,
            title: 'Dashboard inteligente',
            description: 'Encuentra licitaciones que coinciden con tu perfil de empresa. Filtramos entre miles de oportunidades públicas para mostrarte solo las relevantes.'
        },
        {
            icon: Check,
            title: 'Checklist visual',
            description: 'Guía paso a paso para preparar todos los documentos requeridos. Nunca más olvidarás un anexo importante.'
        },
        {
            icon: Calculator,
            title: 'Calculadora de precios',
            description: 'Benchmark de mercado para ofertar de forma competitiva. Compara tus precios con históricos del sector.'
        },
        {
            icon: Shield,
            title: 'Análisis de riesgo',
            description: 'Identifica problemas antes de presentar tu oferta. Evaluamos los pliegos para detectar cláusulas riesgosas.'
        }
    ];

    return (
        <div className="min-h-screen bg-background animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-semibold text-foreground tracking-tight p-6 mt-1 flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-primary" />
                        Centro de Ayuda
                    </h2>
                </div>
                <TopNav />
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-12">
                {/* Intro Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        ¿Cómo funciona SIICOP?
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Dashboard de licitaciones, checklist visual de documentos y calculadora de precios con benchmark. Todo lo que necesitas para participar en contratación pública con confianza.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card-elevated p-8 bg-card animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ / Support Contact (Optional Placeholder) */}
                <div className="mt-16 p-8 bg-muted/30 rounded-2xl text-center border border-border/50">
                    <h3 className="text-lg font-semibold text-foreground mb-2">¿Necesitas más ayuda?</h3>
                    <p className="text-muted-foreground mb-4">
                        Si tienes dudas específicas sobre una licitación o el uso de la plataforma, contáctanos.
                    </p>
                    <a href="mailto:soporte@siicop.com" className="text-primary font-medium hover:underline">
                        soporte@siicop.com
                    </a>
                </div>
            </div>
        </div>
    );
}
