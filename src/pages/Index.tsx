import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileText, Calculator, MessageCircle, Shield } from 'lucide-react';
import logoSiipro from '@/images/logo_siipro.png';

export default function Index() {
  const features = [
    {
      icon: FileText,
      title: 'Dashboard inteligente',
      description: 'Encuentra licitaciones que coinciden con tu perfil de empresa'
    },
    {
      icon: Check,
      title: 'Checklist visual',
      description: 'Guía paso a paso para preparar todos los documentos requeridos'
    },
    {
      icon: Calculator,
      title: 'Calculadora de precios',
      description: 'Benchmark de mercado para ofertar de forma competitiva'
    },
    {
      icon: Shield,
      title: 'Análisis de riesgo',
      description: 'Identifica problemas antes de presentar tu oferta'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <img src={logoSiipro} alt="SIICOP Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="font-bold text-xl text-foreground tracking-tight">
              SIICOP
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="btn-ghost text-sm">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn-primary text-sm">
              Crear cuenta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-24">
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="animate-fade-in">
            

            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Prepara tus ofertas de<br />
              <span className="text-primary">licitación sin complicaciones</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Dashboard de licitaciones, checklist visual de documentos y calculadora de precios con benchmark. Todo lo que necesitas para participar en contratación pública con confianza.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Comenzar gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        {/* <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-muted-foreground text-lg">
              Simplificamos el proceso de licitación para que te enfoques en ganar contratos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card-elevated p-8 animate-slide-up"
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
        </section> */}

        {/* CTA */}
        {/* <section className="bg-primary py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              ¿Listo para empezar a licitar?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
              Únete a miles de PYMEs que ya están preparando sus ofertas de forma más eficiente
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity">
              Crear cuenta gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      {/* <footer className="bg-background border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <img src={logoSiipro} alt="SIICOP Logo" className="w-6 h-6 object-contain" />
            </div>
            <span>© 2024 SIICOP</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Términos</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Contacto</a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
