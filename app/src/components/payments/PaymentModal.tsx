import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  FileText, 
  Shield 
} from 'lucide-react';
import { StripePayment } from './StripePayment';
import { MercadoPagoPayment } from './MercadoPagoPayment';
import type { Campaign } from '@/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
  onPaymentSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, campaign, onPaymentSuccess }: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState<'stripe' | 'mercadopago'>('stripe');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  if (!campaign) return null;

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setTimeout(() => {
      onPaymentSuccess();
      setPaymentCompleted(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setPaymentCompleted(false);
    onClose();
  };

  // Calcular comisiones
  const platformFeePercentage = 15;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-[#0A0A0A] border-[#2A2A2A] text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            {paymentCompleted ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-500" />
                ¡Pago Completado!
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 text-[#D4AF37]" />
                Confirmar Pago
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {paymentCompleted 
              ? 'Tu pago ha sido procesado exitosamente.' 
              : 'Revisa los detalles y elige tu método de pago'}
          </DialogDescription>
        </DialogHeader>

        {paymentCompleted ? (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-semibold text-green-400">Pago Exitoso</p>
                  <p className="text-sm text-gray-400">La campaña ha sido activada</p>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              Redirigiendo al dashboard...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Resumen de la campaña */}
            <Card className="bg-[#141414] border-[#2A2A2A]">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Campaña</span>
                  <span className="font-medium text-white">{campaign.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Influencer</span>
                  <span className="font-medium text-white">@{campaign.influencerId}</span>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown de comisiones */}
            <Card className="bg-[#141414] border-[#2A2A2A]">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#D4AF37]" />
                  Desglose del Pago
                </h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compensación influencer</span>
                    <span className="text-white">${campaign.baseAmount.toFixed(2)} {campaign.currency}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Comisión plataforma ({platformFeePercentage}%)</span>
                    <span className="text-gray-400">${campaign.platformFee.toFixed(2)} {campaign.currency}</span>
                  </div>

                  <div className="pt-2 border-t border-[#2A2A2A] flex justify-between items-center">
                    <span className="font-semibold text-white">Total a pagar</span>
                    <span className="text-xl font-bold text-[#D4AF37]">
                      ${campaign.brandPays.toFixed(2)} {campaign.currency}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-gray-500 flex items-start gap-2">
                  <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <p>
                    La comisión cubre: verificación de identidad, pagos seguros con escrow, 
                    generación de contratos y soporte dedicado.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Métodos de pago */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'stripe' | 'mercadopago')}>
              <TabsList className="grid w-full grid-cols-2 bg-[#1E1E1E]">
                <TabsTrigger value="stripe" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Tarjeta
                </TabsTrigger>
                <TabsTrigger value="mercadopago" className="data-[state=active]:bg-[#00B1EA] data-[state=active]:text-white">
                  <Wallet className="h-4 w-4 mr-2" />
                  Mercado Pago
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stripe" className="mt-4">
                <StripePayment
                  amount={campaign.brandPays}
                  currency={campaign.currency}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handleClose}
                />
              </TabsContent>

              <TabsContent value="mercadopago" className="mt-4">
                <MercadoPagoPayment
                  amount={campaign.brandPays}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handleClose}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
