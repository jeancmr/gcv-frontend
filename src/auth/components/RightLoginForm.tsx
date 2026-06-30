import { useState, type SubmitEvent } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { GCVLogo } from '@/components/custom/GCVLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../hooks/useAuth';

export const RightLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    login(email, password)
      .then((response) => {
        console.log('Login successful:', response);
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10 bg-background">
      {/* Mobile logo */}
      <div className="mb-8 lg:hidden">
        <GCVLogo size="md" variant="dark" />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Iniciar sesión</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ingrese sus credenciales corporativas
          </p>
        </div>

        <form onSubmit={handleSignIn} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={15}
                aria-hidden="true"
              />
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="usuario@gcv.com"
                className="pl-9 h-10"
                aria-required="true"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Contraseña
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={15}
                aria-hidden="true"
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="pl-9 pr-10 h-10"
                aria-required="true"
                required
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-primary text-primary-foreground font-medium"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Verificando...
              </span>
            ) : (
              'Ingresar'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
