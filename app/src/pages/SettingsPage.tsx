import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Save,
  CheckCircle,
  AlertCircle,
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function SettingsPage() {
  const { user, logout, setView, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailCampaigns: true,
    emailPayments: true,
    emailMessages: true,
    pushCampaigns: false,
    pushPayments: true,
    pushMessages: true,
  });

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState({
    stripeConnected: false,
    mercadoPagoConnected: false,
  });

  const isInfluencer = user?.role === 'influencer';
  const isAdmin = user?.role === 'admin';

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validaciones
    if (!profileData.name.trim()) {
      setErrorMessage('El nombre es requerido');
      setIsLoading(false);
      return;
    }

    if (!profileData.email.trim()) {
      setErrorMessage('El email es requerido');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      setErrorMessage('El email no es válido');
      setIsLoading(false);
      return;
    }

    // Simular actualización
    setTimeout(() => {
      updateUser({ name: profileData.name, email: profileData.email });
      setSuccessMessage('Perfil actualizado correctamente');
      toast.success('Perfil actualizado correctamente');
      setIsLoading(false);
    }, 500);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validaciones
    if (!passwordData.currentPassword) {
      setErrorMessage('La contraseña actual es requerida');
      setIsLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrorMessage('La nueva contraseña debe tener al menos 8 caracteres');
      setIsLoading(false);
      return;
    }

    if (!/[A-Z]/.test(passwordData.newPassword)) {
      setErrorMessage('La nueva contraseña debe tener al menos una mayúscula');
      setIsLoading(false);
      return;
    }

    if (!/[a-z]/.test(passwordData.newPassword)) {
      setErrorMessage('La nueva contraseña debe tener al menos una minúscula');
      setIsLoading(false);
      return;
    }

    if (!/[0-9]/.test(passwordData.newPassword)) {
      setErrorMessage('La nueva contraseña debe tener al menos un número');
      setIsLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Simular actualización
    setTimeout(() => {
      setSuccessMessage('Contraseña actualizada correctamente');
      toast.success('Contraseña actualizada correctamente');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsLoading(false);
    }, 500);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Preferencias de notificación actualizadas');
  };

  const handleConnectStripe = () => {
    setPaymentMethods(prev => ({ ...prev, stripeConnected: true }));
    toast.success('Cuenta de Stripe conectada correctamente');
  };

  const handleConnectMercadoPago = () => {
    setPaymentMethods(prev => ({ ...prev, mercadoPagoConnected: true }));
    toast.success('Cuenta de Mercado Pago conectada correctamente');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setView('home')}
                className="border-[#2A2A2A] text-gray-400 hover:text-white font-normal"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
              <span className="text-[#D4AF37] font-semibold text-xl tracking-tight">INFLUCONNECT</span>
              <span className="text-gray-500">|</span>
              <span className="text-white">Configuración</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setView('home')}
                className="border-[#2A2A2A] text-gray-400 hover:text-white"
              >
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
                className="border-[#2A2A2A] text-gray-400 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="text-green-400">{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-400">{errorMessage}</p>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-[#141414] border border-[#2A2A2A] w-full justify-start">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <Lock className="h-4 w-4 mr-2" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <CreditCard className="h-4 w-4 mr-2" />
              Pagos
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-[#141414] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white">Información del Perfil</CardTitle>
                <CardDescription className="text-gray-400">
                  Actualiza tu información personal y de contacto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Nombre completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-[#1E1E1E] border-[#2A2A2A] text-white"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="bg-[#1E1E1E] border-[#2A2A2A] text-white"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Teléfono</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-[#1E1E1E] border-[#2A2A2A] text-white"
                        placeholder="+54 11 1234 5678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-white">Tipo de cuenta</Label>
                      <Input
                        id="role"
                        value={isAdmin ? 'Administrador' : isInfluencer ? 'Influencer' : 'Empresa'}
                        disabled
                        className="bg-[#1E1E1E] border-[#2A2A2A] text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">Biografía</Label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="w-full h-32 bg-[#1E1E1E] border border-[#2A2A2A] text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="Cuéntanos sobre ti..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Guardar cambios
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-[#141414] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white">Cambiar Contraseña</CardTitle>
                <CardDescription className="text-gray-400">
                  Actualiza tu contraseña para mantener tu cuenta segura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-white">Contraseña actual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="bg-[#1E1E1E] border-[#2A2A2A] text-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white">Nueva contraseña</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="bg-[#1E1E1E] border-[#2A2A2A] text-white"
                        placeholder="••••••••"
                      />
                      <p className="text-xs text-gray-500">
                        Mínimo 8 caracteres, una mayúscula, una minúscula y un número
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">Confirmar nueva contraseña</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="bg-[#1E1E1E] border-[#2A2A2A] text-white"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
                      ) : (
                        <Lock className="h-4 w-4 mr-2" />
                      )}
                      Actualizar contraseña
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-[#2A2A2A] mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#D4AF37]" />
                  Seguridad de la cuenta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Verificación en dos pasos</p>
                      <p className="text-gray-400 text-sm">Añade una capa extra de seguridad</p>
                    </div>
                    <Button variant="outline" className="border-[#2A2A2A] text-gray-400">
                      Configurar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Sesiones activas</p>
                      <p className="text-gray-400 text-sm">Gestiona tus dispositivos conectados</p>
                    </div>
                    <Button variant="outline" className="border-[#2A2A2A] text-gray-400">
                      Ver sesiones
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-[#141414] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white">Preferencias de Notificación</CardTitle>
                <CardDescription className="text-gray-400">
                  Elige cómo y cuándo quieres recibir notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">Notificaciones por Email</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                        <div>
                          <p className="text-white">Campañas</p>
                          <p className="text-gray-400 text-sm">Nuevas propuestas y actualizaciones</p>
                        </div>
                        <Switch
                          checked={notifications.emailCampaigns}
                          onCheckedChange={() => handleNotificationChange('emailCampaigns')}
                          className="data-[state=checked]:bg-[#D4AF37]"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                        <div>
                          <p className="text-white">Pagos</p>
                          <p className="text-gray-400 text-sm">Confirmaciones y transferencias</p>
                        </div>
                        <Switch
                          checked={notifications.emailPayments}
                          onCheckedChange={() => handleNotificationChange('emailPayments')}
                          className="data-[state=checked]:bg-[#D4AF37]"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                        <div>
                          <p className="text-white">Mensajes</p>
                          <p className="text-gray-400 text-sm">Nuevos mensajes de empresas o influencers</p>
                        </div>
                        <Switch
                          checked={notifications.emailMessages}
                          onCheckedChange={() => handleNotificationChange('emailMessages')}
                          className="data-[state=checked]:bg-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#2A2A2A] pt-6">
                    <h4 className="text-white font-medium mb-4">Notificaciones Push</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                        <div>
                          <p className="text-white">Campañas</p>
                          <p className="text-gray-400 text-sm">Alertas en tiempo real</p>
                        </div>
                        <Switch
                          checked={notifications.pushCampaigns}
                          onCheckedChange={() => handleNotificationChange('pushCampaigns')}
                          className="data-[state=checked]:bg-[#D4AF37]"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                        <div>
                          <p className="text-white">Pagos</p>
                          <p className="text-gray-400 text-sm">Confirmaciones instantáneas</p>
                        </div>
                        <Switch
                          checked={notifications.pushPayments}
                          onCheckedChange={() => handleNotificationChange('pushPayments')}
                          className="data-[state=checked]:bg-[#D4AF37]"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                        <div>
                          <p className="text-white">Mensajes</p>
                          <p className="text-gray-400 text-sm">Notificaciones de chat</p>
                        </div>
                        <Switch
                          checked={notifications.pushMessages}
                          onCheckedChange={() => handleNotificationChange('pushMessages')}
                          className="data-[state=checked]:bg-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="bg-[#141414] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white">Métodos de Pago</CardTitle>
                <CardDescription className="text-gray-400">
                  Conecta tus cuentas para recibir pagos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#635BFF] rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Stripe</p>
                        <p className="text-gray-400 text-sm">
                          {paymentMethods.stripeConnected ? 'Cuenta conectada' : 'No conectado'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleConnectStripe}
                      disabled={paymentMethods.stripeConnected}
                      variant={paymentMethods.stripeConnected ? "outline" : "default"}
                      className={paymentMethods.stripeConnected 
                        ? "border-green-500 text-green-500" 
                        : "bg-[#635BFF] hover:bg-[#4f49cc] text-white"
                      }
                    >
                      {paymentMethods.stripeConnected ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Conectado
                        </>
                      ) : (
                        'Conectar'
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00B1EA] rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Mercado Pago</p>
                        <p className="text-gray-400 text-sm">
                          {paymentMethods.mercadoPagoConnected ? 'Cuenta conectada' : 'No conectado'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleConnectMercadoPago}
                      disabled={paymentMethods.mercadoPagoConnected}
                      variant={paymentMethods.mercadoPagoConnected ? "outline" : "default"}
                      className={paymentMethods.mercadoPagoConnected 
                        ? "border-green-500 text-green-500" 
                        : "bg-[#00B1EA] hover:bg-[#0090c0] text-white"
                      }
                    >
                      {paymentMethods.mercadoPagoConnected ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Conectado
                        </>
                      ) : (
                        'Conectar'
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isInfluencer && (
              <Card className="bg-[#141414] border-[#2A2A2A] mt-6">
                <CardHeader>
                  <CardTitle className="text-white">Historial de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: '2026-02-15', amount: 900, method: 'Stripe', status: 'completed' },
                      { date: '2026-01-20', amount: 1200, method: 'Mercado Pago', status: 'completed' },
                      { date: '2026-01-05', amount: 500, method: 'Stripe', status: 'completed' },
                    ].map((payment, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 border-b border-[#2A2A2A] last:border-0">
                        <div>
                          <p className="text-white font-medium">{payment.date}</p>
                          <p className="text-sm text-gray-500">{payment.method}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-semibold">+${payment.amount}</p>
                          <span className="text-xs text-green-500">Completado</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default SettingsPage;
