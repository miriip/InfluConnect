import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, User, Building2, Shield, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
  const { login, setView } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const result = await login(email.trim(), password);
    
    if (result.success) {
      toast.success('Sesión iniciada correctamente. Bienvenido.');
    } else {
      setError(result.message || 'Error al iniciar sesión');
      toast.error(result.message);
    }
    
    setIsLoading(false);
  };

  // Login rápido para demo con usuarios pre-registrados
  const quickLogin = async (type: 'influencer' | 'brand' | 'admin') => {
    setIsLoading(true);
    setError(null);
    
    const demoEmails = {
      influencer: 'demo-influencer@influconnect.com',
      brand: 'demo-brand@influconnect.com',
      admin: 'admin@influconnect.com',
    };
    
    const demoPasswords = {
      influencer: 'Demo123!',
      brand: 'Demo123!',
      admin: 'Admin123!',
    };

    // Primero intentar login con credenciales demo
    const result = await login(demoEmails[type], demoPasswords[type]);
    
    // Si no existe, registrar y luego login
    if (!result.success && result.message?.includes('no encontrado')) {
      // Crear usuario demo
      const users = JSON.parse(localStorage.getItem('influconnect_users') || '[]');
      
      let hash = 0;
      for (let i = 0; i < demoPasswords[type].length; i++) {
        const char = demoPasswords[type].charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      const passwordHash = hash.toString(16);
      
      const demoUser = {
        id: `demo-${type}`,
        email: demoEmails[type],
        passwordHash,
        name: type === 'influencer' ? 'Maria Gonzalez' : type === 'brand' ? 'L\'Oreal Argentina' : 'Administrador',
        role: type,
        avatar: type === 'influencer' 
          ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
          : undefined,
        handle: type === 'influencer' ? '@maria_beauty' : undefined,
        category: type === 'influencer' ? 'Belleza' : undefined,
        companyName: type === 'brand' ? 'L\'Oreal Argentina' : undefined,
        industry: type === 'brand' ? 'Belleza' : undefined,
        createdAt: new Date().toISOString(),
      };
      
      users.push(demoUser);
      localStorage.setItem('influconnect_users', JSON.stringify(users));
      
      // Intentar login nuevamente
      await login(demoEmails[type], demoPasswords[type]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => setView('landing')}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>

        <Card className="bg-[#141414] border-[#2A2A2A]">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-[#D4AF37]" />
            </div>
            <CardTitle className="text-2xl font-medium text-white">Bienvenido de vuelta</CardTitle>
            <CardDescription className="text-gray-400 font-light">
              Inicia sesión en tu cuenta de InfluConnect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 pr-10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Mínimo 8 caracteres, una mayúscula, una minúscula y un número
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/30">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-500/10 border-green-500/30">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <AlertDescription className="text-green-400">{success}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-bold py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ingresando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-gray-400 text-sm">
                ¿No tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={() => setView('register-influencer')} 
                  className="text-[#D4AF37] hover:underline font-medium"
                >
                  Soy Influencer
                </button>
                {' · '}
                <button 
                  type="button"
                  onClick={() => setView('register-brand')} 
                  className="text-[#D4AF37] hover:underline font-medium"
                >
                  Soy Empresa
                </button>
              </p>
            </div>

            {/* Login rápido para demo */}
            <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
              <p className="text-xs text-gray-500 text-center mb-3">Cuentas de demostración</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('influencer')}
                  disabled={isLoading}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                >
                  <User className="h-3 w-3 mr-1" />
                  Influencer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('brand')}
                  disabled={isLoading}
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  <Building2 className="h-3 w-3 mr-1" />
                  Empresa
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('admin')}
                  disabled={isLoading}
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </Button>
              </div>
              <p className="text-xs text-gray-600 text-center mt-2">
                Contraseña demo: Demo123!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
