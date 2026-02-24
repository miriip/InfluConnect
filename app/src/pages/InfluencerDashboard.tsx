import { useState, useMemo, useEffect } from 'react';
import { 
  Star, 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  CheckCircle, 
  LogOut,
  User,
  Edit3,
  FileText,
  Search,
  Filter,
  Home,
  Settings,
  ArrowRight,
  ArrowLeft,
  Building2,
  Send
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { NotificationsBell } from '@/components/NotificationsBell';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { mockInfluencers, mockCampaigns, mockBrands, getOpenCampaigns, getApplications, saveApplications, getBrandUserId } from '@/data/mockData';
import { toast } from 'sonner';
import type { Campaign, OpenCampaign } from '@/types';

const MAX_MESSAGE_LENGTH = 300;

export function InfluencerDashboard() {
  const { user, logout, setView } = useAuth();
  const { addNotification } = useNotifications();
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('campaigns');
  const [openCampaigns, setOpenCampaigns] = useState<OpenCampaign[]>(() => getOpenCampaigns());
  const [applications, setApplications] = useState(() => getApplications());
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedOpenCampaign, setSelectedOpenCampaign] = useState<OpenCampaign | null>(null);
  const [applyMessage, setApplyMessage] = useState('');
  const [brandProfileModal, setBrandProfileModal] = useState<typeof mockBrands[0] | null>(null);
  const [tarifasModalOpen, setTarifasModalOpen] = useState(false);

  useEffect(() => {
    const tab = sessionStorage.getItem('influencer_initial_tab');
    if (tab === 'open') {
      setActiveTab('open');
      sessionStorage.removeItem('influencer_initial_tab');
    }
  }, []);

  // Obtener datos del influencer (simulado)
  const influencer = useMemo(() => mockInfluencers.find((i) => i.userId === user?.id) ?? mockInfluencers[0], [user?.id]);
  
  // Filtrar campañas del influencer
  const myCampaigns = mockCampaigns.filter(camp => camp.influencerId === influencer.id);

  // Filtrar marcas para búsqueda bidireccional
  const filteredBrands = mockBrands.filter(brand => 
    brand.companyName.toLowerCase().includes(brandSearchQuery.toLowerCase()) ||
    brand.industry.toLowerCase().includes(brandSearchQuery.toLowerCase()) ||
    brand.location.toLowerCase().includes(brandSearchQuery.toLowerCase())
  );

  const hasApplied = (openCampaignId: string) =>
    applications.some((a) => a.openCampaignId === openCampaignId && a.influencerId === user?.id);

  const handleOpenApply = (campaign: OpenCampaign) => {
    setSelectedOpenCampaign(campaign);
    setApplyMessage('');
    setApplyModalOpen(true);
  };

  const handleSubmitApplication = () => {
    if (!selectedOpenCampaign || !user) return;
    const msg = applyMessage.trim().slice(0, MAX_MESSAGE_LENGTH);
    const newApp = {
      id: `app-${Date.now()}`,
      openCampaignId: selectedOpenCampaign.id,
      influencerId: user.id,
      influencerName: user.name,
      influencerHandle: influencer.handle,
      message: msg,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };
    const updated = [...applications, newApp];
    setApplications(updated);
    saveApplications(updated);
    const brandUserId = getBrandUserId(selectedOpenCampaign.brandId);
    if (brandUserId) {
      addNotification({
        userId: brandUserId,
        type: 'application_received',
        title: 'Nueva postulación',
        body: `${user.name} (${influencer.handle}) se postuló a "${selectedOpenCampaign.name}".`,
        data: { applicationId: newApp.id, campaignId: selectedOpenCampaign.id, influencerId: user.id, brandId: selectedOpenCampaign.brandId },
      });
    }
    toast.success('Postulación enviada. La empresa te contactará por la plataforma.');
    setApplyModalOpen(false);
    setSelectedOpenCampaign(null);
  };

  const getStatusBadge = (status: Campaign['status']) => {
    const styles = {
      draft: 'bg-gray-500/20 text-gray-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
      negotiating: 'bg-blue-500/20 text-blue-400',
      confirmed: 'bg-purple-500/20 text-purple-400',
      paid: 'bg-green-500/20 text-green-400',
      in_progress: 'bg-cyan-500/20 text-cyan-400',
      completed: 'bg-green-500/20 text-green-400',
      cancelled: 'bg-red-500/20 text-red-400',
    };
    const labels = {
      draft: 'Borrador',
      pending: 'Pendiente',
      negotiating: 'En negociación',
      confirmed: 'Confirmada',
      paid: 'Pagada',
      in_progress: 'En progreso',
      completed: 'Completada',
      cancelled: 'Cancelada',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="text-[#D4AF37] font-semibold text-xl tracking-tight">INFLUCONNECT</span>
              <span className="text-gray-500">|</span>
              <span className="text-white font-light">Panel de Influencer</span>
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
              <NotificationsBell />
              <span className="text-gray-400 text-sm hidden sm:inline">{user?.name}</span>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="bg-[#141414] border-[#2A2A2A] mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{influencer.name}</h2>
                  {influencer.isVerified && (
                    <Badge className="bg-green-500/20 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400 mb-2">{influencer.handle}</p>
                <p className="text-gray-500 text-sm mb-3">{influencer.bio}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#2A2A2A] text-gray-300">{influencer.category}</Badge>
                  <Badge className="bg-[#2A2A2A] text-gray-300">{influencer.location}</Badge>
                </div>
              </div>
              <Button 
                variant="outline"
                className="border-[#2A2A2A] text-gray-400 hover:scale-105 transition-transform"
                onClick={() => setView('settings')}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Seguidores</p>
                  <p className="text-2xl font-bold text-white">{(influencer.followers / 1000).toFixed(0)}K</p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Engagement</p>
                  <p className="text-2xl font-bold text-white">{influencer.engagement}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Campañas</p>
                  <p className="text-2xl font-bold text-white">{influencer.campaignsCompleted}</p>
                </div>
                <Briefcase className="h-8 w-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-2xl font-bold text-white">{influencer.rating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#141414] border border-[#2A2A2A] flex-wrap h-auto gap-1">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <Briefcase className="h-4 w-4 mr-2" />
              Mis Campañas
            </TabsTrigger>
            <TabsTrigger value="open" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <Search className="h-4 w-4 mr-2" />
              Campañas abiertas
            </TabsTrigger>
            <TabsTrigger value="brands" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <Building2 className="h-4 w-4 mr-2" />
              Buscar Empresas
            </TabsTrigger>
            <TabsTrigger value="packages" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <DollarSign className="h-4 w-4 mr-2" />
              Mis Tarifas
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ingresos
            </TabsTrigger>
          </TabsList>

          {/* Mis Campañas */}
          <TabsContent value="campaigns" className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-white">Tus Campañas</h3>
            
            {myCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-[#141414] border-[#2A2A2A]">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white text-lg">{campaign.name}</h4>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{campaign.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-gray-500">
                          Empresa: <span className="text-white">L'Oreal Argentina</span>
                        </span>
                        <span className="text-gray-500">
                          Entregables: <span className="text-white">{campaign.deliverables.length}</span>
                        </span>
                        <span className="text-gray-500">
                          Fecha: <span className="text-white">{campaign.startDate}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Vas a recibir</p>
                        <p className="text-xl font-bold text-green-400">
                          ${campaign.influencerReceives.toFixed(2)} {campaign.currency}
                        </p>
                      </div>

                      {campaign.contractUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#2A2A2A] text-gray-400"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Contrato
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Breakdown de ingresos */}
                  <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-gray-500">
                        Monto acordado: <span className="text-white">${campaign.baseAmount}</span>
                      </span>
                      <span className="text-gray-500">
                        Comisión plataforma (10%): <span className="text-white">-${(campaign.platformFee * (10/15)).toFixed(0)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Entregables */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Entregables:</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.deliverables.map((del) => (
                        <Badge key={del.id} className="bg-[#1E1E1E] text-gray-300">
                          {del.quantity}x {del.type} ({del.platform})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {myCampaigns.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No tienes campañas aún</p>
                <p className="text-gray-500 text-sm mt-2">
                  Las empresas te contactarán con propuestas
                </p>
              </div>
            )}
          </TabsContent>

          {/* Campañas abiertas - postularse con mensaje breve */}
          <TabsContent value="open" className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-white">Campañas que buscan colaboración</h3>
            <p className="text-gray-400 text-sm font-light">Postulate con un mensaje breve. Toda la comunicación queda en la plataforma.</p>
            <div className="space-y-4">
              {openCampaigns.map((oc) => {
                const applied = hasApplied(oc.id);
                const myApp = applications.find((a) => a.openCampaignId === oc.id && a.influencerId === user?.id);
                return (
                  <Card key={oc.id} className="bg-[#141414] border-[#2A2A2A]">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-white text-lg">{oc.name}</h4>
                            <Badge className="bg-[#2A2A2A] text-gray-300">{oc.brandName}</Badge>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{oc.objective}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                            <span>Presupuesto: <span className="text-[#D4AF37] font-medium">${oc.budget} {oc.currency}</span></span>
                            <span>Entregables: {oc.deliverablesSummary}</span>
                            <span>Plazo: {oc.startDate} – {oc.endDate}</span>
                            {oc.platform && <span>Plataforma: {oc.platform}</span>}
                          </div>
                        </div>
                        <div className="shrink-0">
                          {applied ? (
                            <Badge className={myApp?.status === 'accepted' ? 'bg-green-500/20 text-green-400' : myApp?.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}>
                              {myApp?.status === 'accepted' ? 'Aceptada' : myApp?.status === 'rejected' ? 'Rechazada' : 'En revisión'}
                            </Badge>
                          ) : (
                            <Button
                              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium"
                              onClick={() => handleOpenApply(oc)}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Postularme
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {openCampaigns.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No hay campañas abiertas en este momento</p>
              </div>
            )}
          </TabsContent>

          {/* Buscar Empresas - Búsqueda Bidireccional */}
          <TabsContent value="brands" className="space-y-6 animate-fade-in">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar empresas por nombre, industria o ubicación..."
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  className="pl-10 bg-[#141414] border-[#2A2A2A] text-white"
                />
              </div>
              <Button variant="outline" className="border-[#2A2A2A] text-gray-400">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBrands.map((brand) => (
                <Card key={brand.id} className="bg-[#141414] border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-[#D4AF37]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white">{brand.companyName}</h4>
                          {brand.isVerified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <Badge className="mt-1 bg-[#2A2A2A] text-gray-300">
                          {brand.industry}
                        </Badge>
                        <p className="text-sm text-gray-400 mt-1">{brand.location}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mt-4 line-clamp-2">
                      {brand.description}
                    </p>

                    {brand.website && (
                      <p className="text-sm text-[#D4AF37] mt-2">
                        {brand.website}
                      </p>
                    )}

                    <Button 
                      className="w-full mt-4 bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-transform hover:scale-[1.02]"
                      onClick={() => setBrandProfileModal(brand)}
                    >
                      Ver Perfil
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBrands.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No se encontraron empresas</p>
                <p className="text-gray-500 text-sm mt-2">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            )}
          </TabsContent>

          {/* Mis Tarifas */}
          <TabsContent value="packages" className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-white">Mis Paquetes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {influencer.packages.map((pkg) => (
                <Card key={pkg.id} className="bg-[#141414] border-[#2A2A2A]">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-white mb-1">{pkg.name}</h4>
                    <p className="text-sm text-gray-400 mb-3">{pkg.description}</p>
                    <p className="text-xl font-bold text-[#D4AF37]">
                      ${pkg.price} {pkg.currency}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black transition-transform hover:scale-105"
              onClick={() => setTarifasModalOpen(true)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Editar Tarifas
            </Button>
          </TabsContent>

          {/* Ingresos */}
          <TabsContent value="earnings" className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-white">Tus Ingresos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-[#141414] border-[#2A2A2A]">
                <CardContent className="p-4">
                  <p className="text-gray-400 text-sm">Ganado (Total)</p>
                  <p className="text-2xl font-bold text-green-400">$12,450 USD</p>
                </CardContent>
              </Card>
              <Card className="bg-[#141414] border-[#2A2A2A]">
                <CardContent className="p-4">
                  <p className="text-gray-400 text-sm">Pendiente</p>
                  <p className="text-2xl font-bold text-yellow-400">$2,100 USD</p>
                </CardContent>
              </Card>
              <Card className="bg-[#141414] border-[#2A2A2A]">
                <CardContent className="p-4">
                  <p className="text-gray-400 text-sm">Este Mes</p>
                  <p className="text-2xl font-bold text-white">$3,200 USD</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#141414] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white text-lg">Historial de Pagos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '2026-02-15', campaign: 'Lanzamiento Skincare', amount: 900, status: 'completed' },
                    { date: '2026-01-20', campaign: 'Campaña Verano', amount: 1200, status: 'completed' },
                    { date: '2026-01-05', campaign: 'Product Review', amount: 500, status: 'completed' },
                  ].map((payment, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-[#2A2A2A] last:border-0">
                      <div>
                        <p className="text-white font-medium">{payment.campaign}</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">+${payment.amount}</p>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completado
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modal Perfil de empresa */}
      <Dialog open={!!brandProfileModal} onOpenChange={(open) => !open && setBrandProfileModal(null)}>
        <DialogContent className="bg-[#141414] border-[#2A2A2A] text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Perfil de la empresa</DialogTitle>
            <DialogDescription className="text-gray-400">
              Información pública de la marca.
            </DialogDescription>
          </DialogHeader>
          {brandProfileModal && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">{brandProfileModal.companyName}</h4>
                  <Badge className="bg-[#2A2A2A] text-gray-300 mt-1">{brandProfileModal.industry}</Badge>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{brandProfileModal.description}</p>
              {brandProfileModal.website && (
                <p className="text-[#D4AF37] text-sm">{brandProfileModal.website}</p>
              )}
              <p className="text-gray-500 text-sm">{brandProfileModal.location}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Editar tarifas (listado y breve info) */}
      <Dialog open={tarifasModalOpen} onOpenChange={setTarifasModalOpen}>
        <DialogContent className="bg-[#141414] border-[#2A2A2A] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Mis tarifas</DialogTitle>
            <DialogDescription className="text-gray-400">
              Tus paquetes y precios actuales. Los cambios se guardan en tu perfil.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {influencer.packages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1E1E1E]">
                <div>
                  <p className="font-medium text-white">{pkg.name}</p>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>
                <p className="text-[#D4AF37] font-semibold">${pkg.price} {pkg.currency}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-[#2A2A2A] text-gray-400" onClick={() => setTarifasModalOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black" onClick={() => { setTarifasModalOpen(false); toast.success('Tarifas actualizadas (simulado).'); }}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Postularme - mensaje breve (máx. 300 caracteres) */}
      <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
        <DialogContent className="bg-[#141414] border-[#2A2A2A] text-white">
          <DialogHeader>
            <DialogTitle>Mostrar interés en la campaña</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedOpenCampaign && (
                <>Campaña: <span className="text-white font-medium">{selectedOpenCampaign.name}</span> · {selectedOpenCampaign.brandName}</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-gray-300">Mensaje breve (opcional, máx. {MAX_MESSAGE_LENGTH} caracteres)</Label>
            <textarea
              className="w-full min-h-[100px] rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder="Ej: Tengo experiencia en contenido de belleza y me encantaría colaborar..."
              value={applyMessage}
              onChange={(e) => setApplyMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              maxLength={MAX_MESSAGE_LENGTH}
            />
            <p className="text-xs text-gray-500">{applyMessage.length}/{MAX_MESSAGE_LENGTH}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-[#2A2A2A] text-gray-400" onClick={() => setApplyModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium" onClick={handleSubmitApplication}>
              <Send className="h-4 w-4 mr-2" />
              Enviar postulación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InfluencerDashboard;
