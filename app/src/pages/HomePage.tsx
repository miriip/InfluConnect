import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Briefcase,
  ArrowRight,
  CheckCircle,
  Home,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { NotificationsBell } from '@/components/NotificationsBell';
import { useAuth } from '@/contexts/AuthContext';

export function HomePage() {
  const { user, setView, logout } = useAuth();
  const [welcomeVisible, setWelcomeVisible] = useState(false);

  const isInfluencer = user?.role === 'influencer';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const t = setTimeout(() => setWelcomeVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-20">
      {/* Barra superior: orden clara con iconos */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Izquierda: logo + Inicio */}
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37] font-semibold text-lg tracking-tight">INFLUCONNECT</span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5 text-white font-light text-sm">
                <Home className="h-4 w-4 text-[#D4AF37]" />
                Inicio
              </span>
            </div>
            {/* Derecha: Configuración, Notificaciones, Usuario, Salir */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white font-normal"
                onClick={() => setView('settings')}
              >
                <Settings className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Configuración</span>
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-normal"
                  onClick={() => setView('admin-dashboard')}
                >
                  <Shield className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Panel Admin</span>
                </Button>
              )}
              <NotificationsBell />
              <span className="text-gray-500 text-sm hidden md:inline max-w-[120px] truncate" title={user?.name}>{user?.name}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
                className="border-[#2A2A2A] text-gray-400 hover:text-white font-normal"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Bienvenida con transición más impactante */}
      <div className={`bg-gradient-to-b from-[#141414] via-[#1A1A1A] to-[#0A0A0A] border-b border-[#2A2A2A] transition-all duration-700 ${welcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <p className="text-[#D4AF37] text-sm font-medium tracking-wider uppercase mb-2">Tu espacio</p>
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-2">
            ¡Hola, {user?.name}!
          </h1>
          <p className="text-gray-400 font-light max-w-xl">
            {isAdmin 
              ? 'Panel de administración de la plataforma.'
              : isInfluencer 
                ? 'Bienvenido a tu panel. Revisa campañas, busca empresas y postúlate a oportunidades.'
                : 'Bienvenido a tu panel. Busca influencers y gestiona tus campañas y postulaciones.'}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin: solo CTA al panel */}
        {isAdmin && (
          <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/30 mb-8 animate-fade-in-up">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-[#D4AF37]" />
                    Panel de administración
                  </h3>
                  <p className="text-gray-400 font-light">
                    Gestiona usuarios, comisiones, métricas y contenido del sitio.
                  </p>
                </div>
                <Button 
                  onClick={() => setView('admin-dashboard')}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium shrink-0 transition-transform hover:scale-105"
                >
                  Ir al panel admin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!isAdmin && (
        <>
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    {isInfluencer ? 'Campañas Activas' : 'Campañas este mes'}
                  </p>
                  <p className="text-2xl font-bold text-white">{isInfluencer ? '2' : '5'}</p>
                </div>
                <Briefcase className="h-8 w-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    {isInfluencer ? 'Ingresos (Mes)' : 'Invertido (Mes)'}
                  </p>
                  <p className="text-2xl font-bold text-white">{isInfluencer ? '$3,200' : '$5,250'}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    {isInfluencer ? 'Nuevas Propuestas' : 'Influencers Contactados'}
                  </p>
                  <p className="text-2xl font-bold text-white">{isInfluencer ? '3' : '12'}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    {isInfluencer ? 'Rating' : 'Alcance Total'}
                  </p>
                  <p className="text-2xl font-bold text-white">{isInfluencer ? '4.8' : '425K'}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions - Influencer: Buscar campañas primero; Empresa: Buscar influencers */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Primera acción: para influencer = Buscar campañas (en inicio); para empresa = Buscar influencers */}
          <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/30">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {isInfluencer ? 'Buscar campañas' : 'Buscar influencers'}
                  </h3>
                  <p className="text-gray-400 mb-4 font-light">
                    {isInfluencer 
                      ? 'Encontrá campañas abiertas y postulate con un mensaje breve.'
                      : 'Encontrá el influencer perfecto para tu próxima campaña.'}
                  </p>
                  <Button 
                    onClick={() => {
                      if (isInfluencer) sessionStorage.setItem('influencer_initial_tab', 'open');
                      setView(isInfluencer ? 'influencer-dashboard' : 'brand-dashboard');
                    }}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium"
                  >
                    {isInfluencer ? 'Ver campañas abiertas' : 'Buscar ahora'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                  {isInfluencer ? <Briefcase className="h-6 w-6 text-[#D4AF37]" /> : <Users className="h-6 w-6 text-[#D4AF37]" />}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segunda acción: Perfil (influencer) o Mis campañas (empresa) */}
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {isInfluencer ? 'Perfil' : 'Mis campañas'}
                  </h3>
                  <p className="text-gray-400 mb-4 font-light">
                    {isInfluencer 
                      ? 'Tu información, tarifas y portfolio.'
                      : 'Gestioná tus campañas activas y resultados.'}
                  </p>
                  <Button 
                    onClick={() => setView(isInfluencer ? 'influencer-dashboard' : 'brand-dashboard')}
                    variant={isInfluencer ? 'default' : 'outline'}
                    className={
                      isInfluencer
                        ? 'bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium'
                        : 'border-[#2A2A2A] text-white hover:bg-[#1E1E1E] font-medium'
                    }
                  >
                    {isInfluencer ? 'Ver perfil' : 'Ver campañas'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="w-12 h-12 bg-[#2A2A2A] rounded-xl flex items-center justify-center">
                  {isInfluencer ? <Star className="h-6 w-6 text-green-500" /> : <Briefcase className="h-6 w-6 text-blue-500" />}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                {isInfluencer ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-[#1E1E1E] rounded-lg">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Nueva propuesta recibida</p>
                        <p className="text-gray-400 text-sm">L'Oreal Argentina - $1,200</p>
                      </div>
                      <span className="text-gray-500 text-xs">Hace 2h</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#1E1E1E] rounded-lg">
                      <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-[#D4AF37]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Pago recibido</p>
                        <p className="text-gray-400 text-sm">Campaña Nike - $900</p>
                      </div>
                      <span className="text-gray-500 text-xs">Ayer</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-[#1E1E1E] rounded-lg">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Nuevo influencer guardado</p>
                        <p className="text-gray-400 text-sm">@maria_beauty - Belleza</p>
                      </div>
                      <span className="text-gray-500 text-xs">Hace 1h</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#1E1E1E] rounded-lg">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Campaña completada</p>
                        <p className="text-gray-400 text-sm">Lanzamiento Verano 2026</p>
                      </div>
                      <span className="text-gray-500 text-xs">Ayer</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Accesos Rápidos</h3>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1E1E1E]"
                  onClick={() => {
                    if (isInfluencer) sessionStorage.setItem('influencer_initial_tab', 'open');
                    setView(isInfluencer ? 'influencer-dashboard' : 'brand-dashboard');
                  }}
                >
                  <Briefcase className="mr-3 h-5 w-5" />
                  {isInfluencer ? 'Buscar campañas' : 'Gestionar Campañas'}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1E1E1E]"
                  onClick={() => setView(isInfluencer ? 'influencer-dashboard' : 'brand-dashboard')}
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  {isInfluencer ? 'Mis Ingresos' : 'Presupuesto y Pagos'}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1E1E1E]"
                  onClick={() => setView('settings')}
                >
                  <Star className="mr-3 h-5 w-5" />
                  Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        </>
        )}
      </main>
    </div>
  );
}

export default HomePage;
