import { useEffect, useState } from 'react';
import stripe from 'stripe';
import { noop } from 'utils/shared/noop';

interface UseStripeParams {
  onLoad?: (stripe?: stripe) => void;
  onError?: () => void;
}

export const useStripe = ({ onLoad = noop, onError = noop }: UseStripeParams) => {
  const [stripe, setStripe] = useState<stripe>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    document.getElementsByTagName('head')[0].appendChild(script);

    script.onload = () => {
      // @ts-ignore using global stripe
      setStripe(Stripe(process.env.STRIPE_PUBLISHABLE_KEY!, {}));
      onLoad(stripe);
    };
    script.onerror = onError;
  }, []);

  return stripe;
};
