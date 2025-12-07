import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '@/hooks/use-register';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import logoSiipro from '@/images/logo_siipro.png';

export default function Register() {
  // Componente de registro de usuario
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    nombreEmpresa: ''
  });
  const [error, setError] = useState('');
  const { mutate: register, isPending } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.password || !formData.nombreEmpresa) {
      setError('Por favor completa todos los campos');
      return;
    }
    console.log(formData);

    register({
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      nombreEmpresa: formData.nombreEmpresa
    }, {
      onSuccess: () => {
        navigate('/onboarding');
      },
      onError: (err: any) => {
        setError(err.message || 'Error al registrar usuario');
      }
    });
  };

  const benefits = [
    'Dashboard de licitaciones personalizadas',
    'Checklist visual de documentos',
    'Calculadora de precios con benchmark',
    'Asistente inteligente de soporte'
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 active:scale-95 shadow-sm">
            <img src={logoSiipro} alt="SIICOP Logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-xl text-primary-foreground tracking-tight leading-none">
              SIICOP
            </span>
            <span className="text-[10px] text-primary-foreground/50 font-medium uppercase tracking-wider">
              Gestión
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-4">
              Únete a miles de<br />PYMEs que ya licitan
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Comienza gratis y descubre cómo podemos ayudarte.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-primary-foreground/90">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
          <span>© 2025 SIICOP</span>
          <span>•</span>
          <span>Hecho para PYMEs colombianas</span>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 active:scale-95 shadow-sm">
              <img src={logoSiipro} alt="SIICOP Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl text-foreground tracking-tight leading-none">
                SIICOP
              </span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                Gestión
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Crea tu cuenta
            </h2>
            <p className="text-muted-foreground">
              Comienza a preparar tus ofertas de licitación
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre de empresa
                </label>
                <input
                  type="text"
                  name="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={handleChange}
                  placeholder="Mi Empresa S.A.S"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Correo electrónico corporativo
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@empresa.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-input accent-primary" />
              <span className="text-sm text-muted-foreground">
                Acepto los{' '}
                <a href="#" className="text-primary hover:underline">términos de servicio</a>
                {' '}y la{' '}
                <a href="#" className="text-primary hover:underline">política de privacidad</a>
              </span>
            </label>

            <button type="submit" className="btn-primary w-full" disabled={isPending}>
              {isPending ? 'Registrando...' : 'Crear cuenta'}
              {!isPending && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
