import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Settings,
  LogOut,
  Shield,
  Users,
  Building2,
  Star,
  DollarSign,
  Search,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Obtener usuarios desde localStorage (mismo formato que AuthContext)
function getStoredUsers(): Array<{ id: string; email: string; name: string; role: string; createdAt?: string }> {
  try {
    return JSON.parse(localStorage.getItem('influconnect_users') || '[]');
  } catch {
    return [];
  }
}

export function AdminDashboard() {
  const { user, logout, setView } = useAuth();
  const [searchUser, setSearchUser] = useState('');

  const users = useMemo(() => getStoredUsers(), []);
  const filteredUsers = useMemo(() => {
    if (!searchUser.trim()) return users;
    const q = searchUser.toLowerCase();
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        (u.role && u.role.toLowerCase().includes(q))
    );
  }, [users, searchUser]);

  const counts = useMemo(() => {
    const influencers = users.filter((u) => u.role === 'influencer').length;
    const brands = users.filter((u) => u.role === 'brand').length;
    const admins = users.filter((u) => u.role === 'admin').length;
    return { influencers, brands, admins, total: users.length };
  }, [users]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="bg-[#141414] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="text-[#D4AF37] font-semibold text-xl tracking-tight">INFLUCONNECT</span>
              <span className="text-gray-500">|</span>
              <span className="text-white font-light">Panel Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setView('home')}
                className="border-[#2A2A2A] text-gray-400 hover:text-white font-normal"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setView('settings')}
                className="border-[#2A2A2A] text-gray-400 hover:text-white font-normal"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
              <span className="text-gray-400 text-sm">{user?.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-[#2A2A2A] text-gray-400 hover:text-white font-normal"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-white">Administración</h1>
            <p className="text-gray-400 text-sm font-light">Usuarios, métricas y comisiones</p>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#141414] border-[#2A2A2A] animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-light">Total usuarios</p>
                  <p className="text-2xl font-medium text-white">{counts.total}</p>
                </div>
                <Users className="h-8 w-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A] animate-fade-in animation-delay-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-light">Influencers</p>
                  <p className="text-2xl font-medium text-white">{counts.influencers}</p>
                </div>
                <Star className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A] animate-fade-in animation-delay-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-light">Empresas</p>
                  <p className="text-2xl font-medium text-white">{counts.brands}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A] animate-fade-in animation-delay-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-light">Comisiones (ejemplo)</p>
                  <p className="text-2xl font-medium text-white">—</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de usuarios */}
        <Card className="bg-[#141414] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-white font-medium flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuarios registrados
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por email, nombre o rol..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="pl-10 bg-[#1E1E1E] border-[#2A2A2A] text-white font-normal"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500 font-light">
                  No hay usuarios o no coinciden con la búsqueda.
                </div>
              ) : (
                filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1E1E1E] hover:bg-[#252525] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#2A2A2A] flex items-center justify-center text-gray-400 text-sm font-medium">
                        {u.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.name}</p>
                        <p className="text-gray-500 text-sm font-light">{u.email}</p>
                      </div>
                    </div>
                    <Badge
                      className={
                        u.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-400'
                          : u.role === 'influencer'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                      }
                    >
                      {u.role === 'admin' ? 'Admin' : u.role === 'influencer' ? 'Influencer' : 'Empresa'}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-gray-500 text-sm font-light mt-6 text-center">
          Verificación de usuarios, gestión de comisiones y contenido del sitio en próximas actualizaciones.
        </p>
      </main>
    </div>
  );
}

export default AdminDashboard;
