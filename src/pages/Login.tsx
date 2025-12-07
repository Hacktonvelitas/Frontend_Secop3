import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useLogin } from '@/hooks/use-login';
import logoSiipro from '@/images/logo_siipro.png';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    login({ email, pass: password }, {
      onSuccess: () => {
        navigate('/dashboard');
      },
      onError: (err: any) => {
        setError(err.message || 'Error al iniciar sesión');
      }
    });
  };

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

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">
            Prepara tus ofertas de<br />licitación sin complicaciones
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Dashboard inteligente, checklist visual y calculadora de precios. Todo lo que necesitas para participar en contratación pública con confianza.
          </p>
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
              Bienvenido de nuevo
            </h2>
            <p className="text-muted-foreground">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-input accent-primary" />
                <span className="text-sm text-muted-foreground">Recordarme</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={isPending}>
              {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
              {!isPending && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Crea una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
