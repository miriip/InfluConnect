import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Plus, 
  CreditCard, 
  FileText, 
  CheckCircle, 
  LogOut,
  User,
  TrendingUp,
  DollarSign,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Home,
  Settings,
  UserPlus,
  XCircle,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { NotificationsBell } from '@/components/NotificationsBell';
import { PaymentModal } from '@/components/payments/PaymentModal';
import { mockInfluencers, mockCampaigns, mockBrands, getOpenCampaigns, getApplications, saveApplications, saveOpenCampaigns } from '@/data/mockData';
import { toast } from 'sonner';
import type { Campaign, CampaignApplication, OpenCampaign } from '@/types';
import type { Influencer } from '@/types';

export function BrandDashboard() {
  const { user, logout, setView } = useAuth();
  const { addNotification } = useNotifications();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [applications, setApplications] = useState<CampaignApplication[]>(() => getApplications());
  const [openCampaigns, setOpenCampaigns] = useState<OpenCampaign[]>(() => getOpenCampaigns());
  const [influencerProfileModal, setInfluencerProfileModal] = useState<Influencer | null>(null);
  const [campaignDetailModal, setCampaignDetailModal] = useState<OpenCampaign | null>(null);
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);
  const [newCampaignForm, setNewCampaignForm] = useState({ name: '', objective: '', budget: '', deliverablesSummary: '', startDate: '', endDate: '' });

  const myBrandId = useMemo(() => mockBrands.find((b) => b.userId === user?.id)?.id ?? '1', [user?.id]);
  const myApplications = useMemo(() => {
    return applications.filter((a) => {
      const oc = openCampaigns.find((o) => o.id === a.openCampaignId);
      return oc && oc.brandId === myBrandId;
    });
  }, [applications, openCampaigns, myBrandId]);

  const handleAcceptApplication = (app: CampaignApplication) => {
    const updated = applications.map((a) => (a.id === app.id ? { ...a, status: 'accepted' as const, updatedAt: new Date().toISOString() } : a));
    setApplications(updated);
    saveApplications(updated);
    addNotification({
      userId: app.influencerId,
      type: 'application_accepted',
      title: '¡Tu postulación fue aceptada!',
      body: `Tu postulación a la campaña fue aceptada. La empresa te contactará por la plataforma.`,
      data: { applicationId: app.id, campaignId: app.openCampaignId },
    });
    toast.success('Postulación aceptada. Podés contactar al influencer desde la plataforma.');
  };

  const handleRejectApplication = (app: CampaignApplication) => {
    const updated = applications.map((a) => (a.id === app.id ? { ...a, status: 'rejected' as const, updatedAt: new Date().toISOString() } : a));
    setApplications(updated);
    saveApplications(updated);
    addNotification({
      userId: app.influencerId,
      type: 'application_rejected',
      title: 'Postulación no aceptada',
      body: `Tu postulación a la campaña no fue aceptada en esta oportunidad.`,
      data: { applicationId: app.id },
    });
    toast.info('Postulación rechazada.');
  };

  const handleCreateCampaign = () => {
    const budget = parseInt(newCampaignForm.budget, 10);
    if (!newCampaignForm.name.trim() || !newCampaignForm.objective.trim() || !Number.isFinite(budget) || budget < 0) {
      toast.error('Completá nombre, objetivo y presupuesto.');
      return;
    }
    const campaign: OpenCampaign = {
      id: `open-${Date.now()}`,
      brandId: myBrandId,
      brandName: mockBrands.find((b) => b.id === myBrandId)?.companyName ?? 'Mi Empresa',
      name: newCampaignForm.name.trim(),
      objective: newCampaignForm.objective.trim(),
      budget,
      currency: 'USD',
      deliverablesSummary: newCampaignForm.deliverablesSummary.trim() || 'A definir',
      startDate: newCampaignForm.startDate || new Date().toISOString().slice(0, 10),
      endDate: newCampaignForm.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };
    const updated = [...openCampaigns, campaign];
    setOpenCampaigns(updated);
    saveOpenCampaigns(updated);
    setNewCampaignOpen(false);
    setNewCampaignForm({ name: '', objective: '', budget: '', deliverablesSummary: '', startDate: '', endDate: '' });
    toast.success('Campaña publicada. Los influencers ya pueden postularse.');
  };

  // Filtrar influencers
  const filteredInfluencers = mockInfluencers.filter(inf => 
    inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inf.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inf.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrar campañas del brand
  const myCampaigns = mockCampaigns.filter(camp => camp.brandId === myBrandId);

  const handlePayCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    // En producción: actualizar estado de la campaña
    if (selectedCampaign) {
      selectedCampaign.status = 'paid';
      selectedCampaign.paymentStatus = 'completed';
    }
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
              <span className="text-white font-light">Panel de Empresa</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Campañas Activas</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Influencers Guardados</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                <User className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Invertido (Mes)</p>
                  <p className="text-2xl font-bold text-white">$3,150</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141414] border-[#2A2A2A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Alcance Total</p>
                  <p className="text-2xl font-bold text-white">425K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#141414] border border-[#2A2A2A]">
            <TabsTrigger value="search" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <Search className="h-4 w-4 mr-2" />
              Buscar Influencers
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <UserPlus className="h-4 w-4 mr-2" />
              Postulaciones
              {myApplications.filter((a) => a.status === 'pending').length > 0 && (
                <span className="ml-1.5 rounded-full bg-red-500 text-white text-xs px-1.5 py-0.5">
                  {myApplications.filter((a) => a.status === 'pending').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <Briefcase className="h-4 w-4 mr-2" />
              Mis Campañas
            </TabsTrigger>
          </TabsList>

          {/* Postulaciones recibidas */}
          <TabsContent value="applications" className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-white">Influencers que se postularon a tus campañas</h3>
            <p className="text-gray-400 text-sm font-light">Toda la comunicación queda en la plataforma. Aceptá o rechazá postulaciones.</p>
            <div className="space-y-4">
              {myApplications.map((app) => {
                const campaign = openCampaigns.find((o) => o.id === app.openCampaignId);
                const inf = mockInfluencers.find((i) => i.userId === app.influencerId);
                return (
                  <Card key={app.id} className="bg-[#141414] border-[#2A2A2A]">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex gap-4">
                          {inf && (
                            <img src={inf.avatar} alt={app.influencerName} className="w-14 h-14 rounded-full object-cover" />
                          )}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <button type="button" onClick={() => inf && setInfluencerProfileModal(inf)} className="font-semibold text-white hover:text-[#D4AF37] text-left">
                                {app.influencerName}
                              </button>
                              <span className="text-gray-500 text-sm">{app.influencerHandle}</span>
                              {inf && <Badge className="bg-[#2A2A2A] text-gray-300">{inf.category}</Badge>}
                            </div>
                            <p className="text-gray-500 text-sm mt-1">
                              Campaña:{' '}
                              <button type="button" onClick={() => campaign && setCampaignDetailModal(campaign)} className="text-white hover:text-[#D4AF37] underline">
                                {campaign?.name ?? app.openCampaignId}
                              </button>
                            </p>
                            {app.message && (
                              <p className="text-gray-400 text-sm mt-2 italic">&ldquo;{app.message}&rdquo;</p>
                            )}
                            <p className="text-gray-600 text-xs mt-2">{new Date(app.createdAt).toLocaleDateString()}</p>
                            {inf && (
                              <Button size="sm" variant="ghost" className="text-[#D4AF37] hover:bg-[#D4AF37]/10 mt-2 h-8 text-xs" onClick={() => setInfluencerProfileModal(inf)}>
                                <Eye className="h-3 w-3 mr-1" />
                                Ver perfil del influencer
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {app.status === 'pending' ? (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAcceptApplication(app)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Aceptar
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10" onClick={() => handleRejectApplication(app)}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Rechazar
                              </Button>
                            </>
                          ) : (
                            <Badge className={app.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {app.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {myApplications.length === 0 && (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No tenés postulaciones aún</p>
                <p className="text-gray-500 text-sm mt-2">Los influencers pueden postularse desde la pestaña &quot;Campañas abiertas&quot; en su panel.</p>
              </div>
            )}
          </TabsContent>

          {/* Buscar Influencers */}
          <TabsContent value="search" className="space-y-6 animate-fade-in">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por nombre, categoría o ubicación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#141414] border-[#2A2A2A] text-white"
                />
              </div>
              <Button variant="outline" className="border-[#2A2A2A] text-gray-400">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInfluencers.map((influencer) => (
                <Card key={influencer.id} className="bg-[#141414] border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={influencer.avatar}
                        alt={influencer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white">{influencer.name}</h4>
                          {influencer.isVerified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{influencer.handle}</p>
                        <Badge className="mt-1 bg-[#2A2A2A] text-gray-300">
                          {influencer.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                      <div className="bg-[#1E1E1E] rounded p-2">
                        <p className="text-lg font-bold text-white">
                          {(influencer.followers / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-gray-500">Seguidores</p>
                      </div>
                      <div className="bg-[#1E1E1E] rounded p-2">
                        <p className="text-lg font-bold text-white">{influencer.engagement}%</p>
                        <p className="text-xs text-gray-500">Engagement</p>
                      </div>
                      <div className="bg-[#1E1E1E] rounded p-2">
                        <p className="text-lg font-bold text-white">{influencer.rating}</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1">
                      <p className="text-xs text-gray-500">Desde:</p>
                      <p className="text-[#D4AF37] font-semibold">
                        ${Math.min(...influencer.packages.map(p => p.price))} USD
                      </p>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-transform hover:scale-[1.02]"
                      onClick={() => setInfluencerProfileModal(influencer)}
                    >
                      Ver Perfil
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mis Campañas */}
          <TabsContent value="campaigns" className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Tus Campañas</h3>
              <Button 
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-black transition-transform hover:scale-105 font-medium"
                onClick={() => setNewCampaignOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Campaña
              </Button>
            </div>

            <div className="space-y-4">
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
                            Influencer: <span className="text-white">@{campaign.influencerId}</span>
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
                          <p className="text-sm text-gray-500">Total a pagar</p>
                          <p className="text-xl font-bold text-[#D4AF37]">
                            ${campaign.brandPays.toFixed(2)} {campaign.currency}
                          </p>
                        </div>

                        {campaign.status === 'confirmed' && (
                          <Button
                            onClick={() => handlePayCampaign(campaign)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pagar Ahora
                          </Button>
                        )}

                        {campaign.status === 'paid' && (
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Pagado</span>
                          </div>
                        )}

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

                    {/* Breakdown de comisiones */}
                    <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-gray-500">
                          Compensación influencer: <span className="text-white">${campaign.baseAmount}</span>
                        </span>
                        <span className="text-gray-500">
                          Comisión plataforma (15%): <span className="text-white">${campaign.platformFee}</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {myCampaigns.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No tienes campañas aún</p>
                  <Button 
                    className="mt-4 bg-[#D4AF37] hover:bg-[#B8941F] text-black transition-transform hover:scale-105"
                    onClick={() => setActiveTab('search')}
                  >
                    Buscar Influencers
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modal Perfil del influencer */}
      <Dialog open={!!influencerProfileModal} onOpenChange={(open) => !open && setInfluencerProfileModal(null)}>
        <DialogContent className="bg-[#141414] border-[#2A2A2A] text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Perfil del influencer</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ideales, principios, imagen y precios.
            </DialogDescription>
          </DialogHeader>
          {influencerProfileModal && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={influencerProfileModal.avatar} alt={influencerProfileModal.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37]" />
                <div>
                  <h4 className="font-semibold text-white text-lg">{influencerProfileModal.name}</h4>
                  <p className="text-gray-400">{influencerProfileModal.handle}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-[#2A2A2A] text-gray-300">{influencerProfileModal.category}</Badge>
                    {influencerProfileModal.isVerified && <Badge className="bg-green-500/20 text-green-400">Verificado</Badge>}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{influencerProfileModal.bio}</p>
              <p className="text-gray-500 text-sm">{influencerProfileModal.location}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#1E1E1E] rounded-lg p-3">
                  <p className="text-xl font-semibold text-white">{(influencerProfileModal.followers / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Seguidores</p>
                </div>
                <div className="bg-[#1E1E1E] rounded-lg p-3">
                  <p className="text-xl font-semibold text-white">{influencerProfileModal.engagement}%</p>
                  <p className="text-xs text-gray-500">Engagement</p>
                </div>
                <div className="bg-[#1E1E1E] rounded-lg p-3">
                  <p className="text-xl font-semibold text-white">{influencerProfileModal.rating}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
              <div>
                <h5 className="text-white font-medium mb-2">Tarifas</h5>
                <div className="space-y-2">
                  {influencerProfileModal.packages.map((p) => (
                    <div key={p.id} className="flex justify-between items-center py-2 border-b border-[#2A2A2A] last:border-0">
                      <span className="text-gray-400">{p.name}</span>
                      <span className="text-[#D4AF37] font-medium">${p.price} {p.currency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Detalle de campaña */}
      <Dialog open={!!campaignDetailModal} onOpenChange={(open) => !open && setCampaignDetailModal(null)}>
        <DialogContent className="bg-[#141414] border-[#2A2A2A] text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Detalle de la campaña</DialogTitle>
            <DialogDescription className="text-gray-400">
              Objetivo, entregables y fechas.
            </DialogDescription>
          </DialogHeader>
          {campaignDetailModal && (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-lg">{campaignDetailModal.name}</h4>
              <p className="text-gray-400 text-sm">{campaignDetailModal.objective}</p>
              <p className="text-[#D4AF37] font-medium">${campaignDetailModal.budget} {campaignDetailModal.currency}</p>
              <p className="text-gray-400 text-sm"><span className="text-gray-500">Entregables:</span> {campaignDetailModal.deliverablesSummary}</p>
              <p className="text-gray-400 text-sm"><span className="text-gray-500">Plazo:</span> {campaignDetailModal.startDate} – {campaignDetailModal.endDate}</p>
              {campaignDetailModal.platform && <p className="text-gray-500 text-sm">Plataforma: {campaignDetailModal.platform}</p>}
              <p className="text-gray-500 text-xs italic">Material adjunto (videos, imágenes, PDF) se podrá agregar en futuras versiones.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Nueva campaña */}
      <Dialog open={newCampaignOpen} onOpenChange={setNewCampaignOpen}>
        <DialogContent className="bg-[#141414] border-[#2A2A2A] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Publicar campaña</DialogTitle>
            <DialogDescription className="text-gray-400">
              Los influencers podrán ver la campaña y postularse con un mensaje breve.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Nombre de la campaña</Label>
              <Input value={newCampaignForm.name} onChange={(e) => setNewCampaignForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ej: Lanzamiento producto X" className="bg-[#1E1E1E] border-[#2A2A2A] text-white mt-1" />
            </div>
            <div>
              <Label className="text-gray-300">Objetivo</Label>
              <textarea value={newCampaignForm.objective} onChange={(e) => setNewCampaignForm((f) => ({ ...f, objective: e.target.value }))} placeholder="Qué buscás lograr..." className="w-full min-h-[80px] rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white p-3 mt-1 resize-none" />
            </div>
            <div>
              <Label className="text-gray-300">Presupuesto (USD)</Label>
              <Input type="number" min={0} value={newCampaignForm.budget} onChange={(e) => setNewCampaignForm((f) => ({ ...f, budget: e.target.value }))} placeholder="Ej: 1000" className="bg-[#1E1E1E] border-[#2A2A2A] text-white mt-1" />
            </div>
            <div>
              <Label className="text-gray-300">Entregables (resumen)</Label>
              <Input value={newCampaignForm.deliverablesSummary} onChange={(e) => setNewCampaignForm((f) => ({ ...f, deliverablesSummary: e.target.value }))} placeholder="Ej: 1 reel + 3 stories" className="bg-[#1E1E1E] border-[#2A2A2A] text-white mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Fecha inicio</Label>
                <Input type="date" value={newCampaignForm.startDate} onChange={(e) => setNewCampaignForm((f) => ({ ...f, startDate: e.target.value }))} className="bg-[#1E1E1E] border-[#2A2A2A] text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-300">Fecha fin</Label>
                <Input type="date" value={newCampaignForm.endDate} onChange={(e) => setNewCampaignForm((f) => ({ ...f, endDate: e.target.value }))} className="bg-[#1E1E1E] border-[#2A2A2A] text-white mt-1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-[#2A2A2A] text-gray-400" onClick={() => setNewCampaignOpen(false)}>Cancelar</Button>
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium" onClick={handleCreateCampaign}>
              <Plus className="h-4 w-4 mr-2" />
              Publicar campaña
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        campaign={selectedCampaign}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default BrandDashboard;
