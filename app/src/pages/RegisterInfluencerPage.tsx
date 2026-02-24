import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, CheckCircle, Star, Eye, EyeOff, Instagram, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function RegisterInfluencerPage() {
  const { register, setView } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    category: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validaciones del lado del cliente
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('El email es requerido');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El email no es válido');
      setIsLoading(false);
      return;
    }

    if (!formData.handle.trim()) {
      setError('El usuario de Instagram es requerido');
      setIsLoading(false);
      return;
    }

    if (!formData.category.trim()) {
      setError('La categoría es requerida');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setIsLoading(false);
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError('La contraseña debe tener al menos una mayúscula');
      setIsLoading(false);
      return;
    }

    if (!/[a-z]/.test(formData.password)) {
      setError('La contraseña debe tener al menos una minúscula');
      setIsLoading(false);
      return;
    }

    if (!/[0-9]/.test(formData.password)) {
      setError('La contraseña debe tener al menos un número');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: 'influencer',
      handle: formData.handle,
      category: formData.category,
    });

    if (result.success) {
      setSuccess(result.message || 'Registro exitoso');
      toast.success('Cuenta creada. Ya puedes iniciar sesión.');
      setTimeout(() => {
        setView('login');
      }, 1500);
    } else {
      setError(result.message || 'Error al registrar');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-md mx-auto">
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
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Crear Perfil de Influencer</CardTitle>
            <CardDescription className="text-gray-400">
              Completa tu información para comenzar a recibir propuestas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="handle" className="text-white flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Usuario de Instagram
                </Label>
                <Input
                  id="handle"
                  name="handle"
                  placeholder="@tuusuario"
                  value={formData.handle}
                  onChange={handleChange}
                  className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Categoría</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Ej: Belleza, Fitness, Viajes, Moda..."
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 pr-10 focus:border-green-500 focus:ring-green-500/20"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirmar Contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-[#1E1E1E] border-[#2A2A2A] text-white placeholder:text-gray-500 pr-10 focus:border-green-500 focus:ring-green-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
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

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando perfil...
                    </>
                  ) : (
                    'Crear Perfil'
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Al registrarte, aceptas nuestros{' '}
                <button type="button" onClick={() => setLegalModal('terms')} className="text-[#D4AF37] hover:underline">Términos y Condiciones</button>
                {' '}y{' '}
                <button type="button" onClick={() => setLegalModal('privacy')} className="text-[#D4AF37] hover:underline">Política de Privacidad</button>
              </p>
              <Dialog open={!!legalModal} onOpenChange={(open) => !open && setLegalModal(null)}>
                <DialogContent className="bg-[#141414] border-[#2A2A2A] text-white max-w-lg max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{legalModal === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad'}</DialogTitle>
                  </DialogHeader>
                  <div className="text-gray-400 text-sm space-y-3 font-light">
                    {legalModal === 'terms' && (
                      <>
                        <p>1. Uso de la plataforma: InfluConnect conecta marcas con influencers. Al registrarte aceptás usar el servicio de forma legal y respetuosa.</p>
                        <p>2. Comisiones: La plataforma cobra una comisión sobre las transacciones según el plan vigente.</p>
                        <p>3. Comunicación: Toda la comunicación entre partes debe realizarse dentro de la plataforma hasta que se acepte una colaboración.</p>
                        <p>4. Contenido: Sos responsable del contenido que publiques. No se permiten contenidos ilegales ni que violen derechos de terceros.</p>
                      </>
                    )}
                    {legalModal === 'privacy' && (
                      <>
                        <p>1. Datos que recopilamos: email, nombre, perfil profesional y datos de pago necesarios para las transacciones.</p>
                        <p>2. Uso: Usamos tus datos para gestionar tu cuenta, campañas, pagos y soporte.</p>
                        <p>3. Protección: Implementamos medidas de seguridad para proteger tu información.</p>
                        <p>4. No vendemos tus datos personales a terceros con fines de marketing.</p>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <p className="text-sm text-gray-400 text-center">
                ¿Ya tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={() => setView('login')} 
                  className="text-[#D4AF37] hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RegisterInfluencerPage;
