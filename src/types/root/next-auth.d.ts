import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      stripeCustomerId: string;
      hasActiveSubscription?: boolean;
      subscriptions: {
        id: string;
        status: string;
        startDate: string;
        currentPeriodStart: string;
        currentPeriodEnd: string;
      }[];
    } & DefaultSession['user'];
  }
}
