import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  Shield, 
  FileText, 
  CreditCard, 
  Users, 
  CheckCircle,
  Briefcase,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function LandingPage() {
  const { setView } = useAuth();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37] font-semibold text-xl tracking-tight">INFLUCONNECT</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button type="button" onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white text-sm font-light transition-colors">
                Cómo Funciona
              </button>
              <button type="button" onClick={() => document.getElementById('seguridad')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white text-sm font-light transition-colors">
                Seguridad
              </button>
              <button type="button" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white text-sm font-light transition-colors">
                Pricing
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setView('login')}
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-6 transition-transform hover:scale-105"
              >
                <Lock className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[#D4AF37] text-sm font-medium">Estamos en fase de lanzamiento</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-6 leading-tight animate-fade-in-up">
            Conectamos marcas con el{' '}
            <span className="text-[#D4AF37]">influencer perfecto</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-100">
            La plataforma premium donde las empresas encuentran creadores verificados 
            y los influencers acceden a oportunidades de alto valor, con pagos seguros y contratos claros.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-200">
            <Button 
              onClick={() => setView('register-influencer')}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-6 text-lg transition-transform hover:scale-105"
            >
              <Star className="mr-2 h-5 w-5" />
              Soy Influencer
            </Button>
            <Button 
              onClick={() => setView('register-brand')}
              className="bg-white hover:bg-gray-100 text-black font-medium px-8 py-6 text-base transition-transform hover:scale-105 border-0"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Soy Empresa
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 font-light animate-fade-in-up animation-delay-300">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Plataforma en lanzamiento
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Buscando marcas e influencers fundadores
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Sé parte de los primeros casos de éxito
            </span>
          </div>
        </div>
      </section>

      {/* Social proof honesto - lanzamiento */}
      <section className="py-12 bg-[#141414] border-y border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-6 uppercase tracking-wider font-light">Para quién es la plataforma</p>
          <p className="text-center text-gray-400 max-w-2xl mx-auto font-light mb-8">
            Estamos en fase de lanzamiento. Buscamos nuestras primeras marcas e influencers para construir casos de éxito reales.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {['Marca de moda', 'Startup tech', 'Empresa retail', 'Belleza y lifestyle', 'Deportes', 'Gastronomía'].map((label) => (
              <span key={label} className="text-sm font-medium text-gray-500 px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A]">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Propuesta de Valor Dual */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-medium text-white text-center mb-4">
            Una plataforma, dos mundos conectados
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto font-light">
            Ya seas creador de contenido o marca, tenemos las herramientas que necesitas para crecer.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Influencer */}
            <Card className="bg-[#141414] border-[#2A2A2A] hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:scale-[1.02] animate-fade-in">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <Star className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-green-400">PARA INFLUENCERS</h3>
                </div>
                <p className="text-white text-lg mb-4">Convierte tu pasión en ingresos consistentes</p>
                <ul className="space-y-3 text-gray-400 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Perfil profesional gratuito
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Acceso a marcas premium
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Pagos garantizados con escrow
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Contratos claros y automáticos
                  </li>
                </ul>
                <Button 
                  onClick={() => setView('register-influencer')}
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 transition-transform hover:scale-105"
                >
                  Crear mi perfil
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Card Empresa */}
            <Card className="bg-[#141414] border-[#2A2A2A] hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] animate-fade-in animation-delay-100">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Briefcase className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-medium text-blue-400">PARA EMPRESAS</h3>
                </div>
                <p className="text-white text-lg mb-4">Encuentra el creador ideal para tu mensaje</p>
                <ul className="space-y-3 text-gray-400 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    Búsqueda avanzada con filtros
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    Influencers verificados
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    Escrow de pagos seguro
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    Contratos automáticos
                  </li>
                </ul>
                <Button 
                  onClick={() => setView('register-brand')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 transition-transform hover:scale-105"
                >
                  Explorar influencers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section id="como-funciona" className="py-20 px-4 bg-[#141414]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-medium text-white text-center mb-4">Cómo funciona</h2>
          <p className="text-gray-400 text-center mb-12 font-light">Tu próxima colaboración en 4 pasos simples</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Regístrate y verifica', desc: 'Crea tu cuenta y validamos tu identidad con seguridad' },
              { step: '2', title: 'Completa tu perfil', desc: 'Muestra tu mejor trabajo o encuentra tu match ideal' },
              { step: '3', title: 'Negocia con confianza', desc: 'Acuerda alcance, entregables y compensación' },
              { step: '4', title: 'Recibe pago seguro', desc: 'Cobranza garantizada con protección de ambas partes' },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-black font-bold text-2xl">{item.step}</span>
                </div>
                <h4 className="font-semibold text-white mb-2 text-lg">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seguridad */}
      <section id="seguridad" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-medium text-white text-center mb-4">
            Tu seguridad es nuestra prioridad
          </h2>
          <p className="text-gray-400 text-center mb-12 font-light">Protegemos cada transacción con tecnología de punta</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Verificación de identidad', desc: 'Perfiles reales garantizados' },
              { icon: CreditCard, title: 'Pagos protegidos', desc: 'Escrow seguro para ambas partes' },
              { icon: FileText, title: 'Contratos claros', desc: 'Términos definidos desde el inicio' },
              { icon: Users, title: 'Soporte 24/7', desc: 'Equipo dedicado a ayudarte' },
            ].map((item) => (
              <Card key={item.title} className="bg-[#141414] border-[#2A2A2A] p-6">
                <item.icon className="h-8 w-8 text-[#D4AF37] mb-4" />
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-[#141414]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-medium text-white text-center mb-4">Transparencia total en precios</h2>
          <p className="text-gray-400 text-center mb-12 font-light">Sin costos fijos. Solo pagas cuando cierras un trato.</p>
          
          <Card className="bg-[#141414] border-[#2A2A2A] max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <p className="text-green-400 font-semibold mb-2">PARA INFLUENCERS</p>
                  <p className="text-4xl font-bold text-white mb-2">10%</p>
                  <p className="text-gray-400 text-sm">de comisión por campaña</p>
                  <div className="mt-4 p-4 bg-green-500/10 rounded-lg">
                    <p className="text-gray-400 text-sm">Ejemplo: Campaña de $1,000</p>
                    <p className="text-green-400 font-bold text-xl mt-1">Tú recibes: $900</p>
                  </div>
                </div>
                <div className="text-center border-l border-[#2A2A2A]">
                  <p className="text-blue-400 font-semibold mb-2">PARA EMPRESAS</p>
                  <p className="text-4xl font-bold text-white mb-2">5%</p>
                  <p className="text-gray-400 text-sm">de comisión por campaña</p>
                  <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                    <p className="text-gray-400 text-sm">Ejemplo: Campaña de $1,000</p>
                    <p className="text-blue-400 font-bold text-xl mt-1">Tú pagas: $1,050</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#2A2A2A] text-center">
                <p className="text-gray-400 text-sm">La comisión cubre: verificación, pagos seguros, contratos y soporte</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-medium text-white mb-4">¿Listo para empezar?</h2>
          <p className="text-gray-400 mb-8 font-light">
            Únete a la comunidad de creadores y marcas que están redefiniendo el influencer marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setView('register-influencer')}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-6 transition-transform hover:scale-105"
            >
              <Star className="mr-2 h-5 w-5" />
              Soy Influencer
            </Button>
            <Button 
              onClick={() => setView('register-brand')}
              className="bg-white hover:bg-gray-100 text-black font-medium px-8 py-6 text-base transition-transform hover:scale-105 border-0"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Soy Empresa
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-6 font-light">Registro gratuito. Sin compromisos.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[#D4AF37] font-semibold text-lg">INFLUCONNECT</span>
            <div className="flex gap-6 text-sm text-gray-500 font-light">
              <button type="button" onClick={() => setView('login')} className="hover:text-white transition-colors">Login</button>
              <button type="button" onClick={() => setView('register-influencer')} className="hover:text-white transition-colors">Registro Influencer</button>
              <button type="button" onClick={() => setView('register-brand')} className="hover:text-white transition-colors">Registro Empresa</button>
            </div>
            <p className="text-gray-600 text-sm font-light">© 2026 InfluConnect. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
