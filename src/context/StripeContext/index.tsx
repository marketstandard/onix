import { FunctionComponent, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Stripe as StripeType, loadStripe } from '@stripe/stripe-js';

export const StripeContext = createContext({ stripe: null });

const StripeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [stripe, setStripe] = useState<StripeType | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
      setStripe(stripeInstance);
    };
    initializeStripe();
  }, []);

  return (
    <StripeContext.Provider value={{ stripe }}>
      <>{children}</>
    </StripeContext.Provider>
  );
};
export default StripeProvider;
