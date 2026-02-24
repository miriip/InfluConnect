import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Wallet, CheckCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// NOTA: En producción, cargar el SDK de Mercado Pago desde CDN
// <script src="https://sdk.mercadopago.com/js/v2"></script>

declare global {
  interface Window {
    MercadoPago?: any;
  }
}

interface MercadoPagoPaymentProps {
  amount: number;
  preferenceId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MercadoPagoPayment({ amount, preferenceId, onSuccess, onCancel }: MercadoPagoPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Verificar si Mercado Pago está configurado
    const key = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
    setIsConfigured(!!key && key !== 'TEST-placeholder');

    // Cargar SDK de Mercado Pago
    if (!window.MercadoPago && isConfigured) {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.onload = () => setSdkLoaded(true);
      script.onerror = () => setErrorMessage('Error al cargar Mercado Pago');
      document.body.appendChild(script);
    } else if (window.MercadoPago) {
      setSdkLoaded(true);
    }
  }, [isConfigured]);

  const initializeCheckout = useCallback(() => {
    if (!window.MercadoPago || !isConfigured) return;

    const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
      locale: 'es-AR',
    });

    mp.checkout({
      preference: {
        id: preferenceId || 'placeholder',
      },
      autoOpen: true,
      render: {
        container: '.cho-container',
        label: 'Pagar',
      },
    });
  }, [preferenceId, isConfigured]);

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (isConfigured && sdkLoaded) {
        // En producción: inicializar checkout de Mercado Pago
        initializeCheckout();
      } else {
        // Modo demo: simular pago
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      setErrorMessage('Error al procesar el pago con Mercado Pago');
    } finally {
      setIsLoading(false);
    }
  };

  // Modo demo: mostrar información de prueba
  if (!isConfigured) {
    return (
      <Card className="bg-[#141414] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="h-5 w-5 text-[#00B1EA]" />
            Mercado Pago (Demo)
          </CardTitle>
          <CardDescription className="text-gray-400">
            Modo de prueba - Mercado Pago no configurado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-[#1E1E1E] rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#00B1EA] text-white">Argentina</Badge>
              <span className="text-sm text-gray-400">Pagos locales</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Métodos disponibles:</p>
              <ul className="text-sm text-white space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Tarjetas de crédito/débito
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Saldo Mercado Pago
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Cuotas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Pago Fácil / Rapipago
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-[#2A2A2A]">
              <p className="text-sm text-gray-400">Usuario de prueba:</p>
              <code className="text-xs bg-[#2A2A2A] px-2 py-1 rounded text-white block mt-1">
                test_user_123@testuser.com
              </code>
            </div>
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-[#2A2A2A] text-white hover:bg-[#1E1E1E]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="flex-1 bg-[#00B1EA] hover:bg-[#0099CC] text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                `Pagar $${amount.toFixed(2)} ARS`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#141414] border-[#2A2A2A]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wallet className="h-5 w-5 text-[#00B1EA]" />
          Mercado Pago
        </CardTitle>
        <CardDescription className="text-gray-400">
          Pagos locales de Argentina
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-[#00B1EA] text-white">Tarjetas</Badge>
          <Badge className="bg-[#00B1EA] text-white">Saldo MP</Badge>
          <Badge className="bg-[#00B1EA] text-white">Cuotas</Badge>
          <Badge className="bg-[#00B1EA] text-white">Pago Fácil</Badge>
        </div>

        <div className="cho-container" />

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 border-[#2A2A2A] text-white hover:bg-[#1E1E1E]"
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="flex-1 bg-[#00B1EA] hover:bg-[#0099CC] text-white font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              `Pagar $${amount.toFixed(2)}`
            )}
          </Button>
        </div>

        <div className="flex items-start gap-2 text-xs text-gray-500">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>
            Al pagar, serás redirigido a Mercado Pago para completar el pago de forma segura.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default MercadoPagoPayment;
