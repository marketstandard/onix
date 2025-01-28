import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      publicKey?: string;
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

  interface User extends DefaultUser {
    publicKey?: string;
  }

  interface JWT {
    publicKey?: string;
  }
}
