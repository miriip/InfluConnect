import { useState, useEffect } from 'react';
import {
  loadStripe,
  type Stripe,
  type StripeElementsOptions,
} from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard } from 'lucide-react';

// NOTA: En producción, esta key debe venir de variables de entorno
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder';

let stripePromise: Promise<Stripe | null> | null = null;

if (STRIPE_PUBLIC_KEY && STRIPE_PUBLIC_KEY !== 'pk_test_placeholder') {
  stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
}

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function StripePaymentForm({ amount, currency, onSuccess, onCancel }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // En producción, esto confirmaría el pago con el client_secret del backend
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Ocurrió un error al procesar el pago');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (error) {
      setErrorMessage('Error inesperado al procesar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement 
        options={{
          layout: {
            type: 'tabs',
            defaultCollapsed: false,
          },
        }}
      />
      
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            `Pagar ${currency === 'USD' ? '$' : ''}${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
}

interface StripePaymentProps {
  amount: number;
  currency: string;
  clientSecret?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function StripePayment({ amount, currency, clientSecret, onSuccess, onCancel }: StripePaymentProps) {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Verificar si Stripe está configurado
    const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    setIsConfigured(!!key && key !== 'pk_test_placeholder');
  }, []);

  // Opciones para Elements
  const options: StripeElementsOptions = {
    clientSecret: clientSecret || 'pi_placeholder_secret',
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#D4AF37',
        colorBackground: '#141414',
        colorText: '#FFFFFF',
        colorDanger: '#EF4444',
        borderRadius: '8px',
      },
    },
  };

  // Modo demo: simular pago exitoso
  const handleDemoPayment = () => {
    // Simular procesamiento
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  // Si Stripe no está configurado, mostrar modo demo
  if (!isConfigured || !stripePromise) {
    return (
      <Card className="bg-[#141414] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#D4AF37]" />
            Pago con Tarjeta (Demo)
          </CardTitle>
          <CardDescription className="text-gray-400">
            Modo de prueba - Stripe no configurado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-[#1E1E1E] rounded-lg space-y-3">
            <p className="text-sm text-gray-400">Tarjetas de prueba:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white">
                <span>Visa (éxito)</span>
                <code className="bg-[#2A2A2A] px-2 py-1 rounded">4242 4242 4242 4242</code>
              </div>
              <div className="flex justify-between text-white">
                <span>Mastercard (éxito)</span>
                <code className="bg-[#2A2A2A] px-2 py-1 rounded">5555 5555 5555 4444</code>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-[#2A2A2A] text-white hover:bg-[#1E1E1E]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDemoPayment}
              className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold"
            >
              Simular Pago de ${amount.toFixed(2)}
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
          <CreditCard className="h-5 w-5 text-[#D4AF37]" />
          Pago con Tarjeta
        </CardTitle>
        <CardDescription className="text-gray-400">
          Pago seguro procesado por Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise} options={options}>
          <StripePaymentForm
            amount={amount}
            currency={currency}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </Elements>
      </CardContent>
    </Card>
  );
}

export default StripePayment;
