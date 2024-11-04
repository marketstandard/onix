import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Resend from 'next-auth/providers/resend';
import { HasuraAdapter } from 'services/server/graphql/auth';

const providers: Provider[] = [
  Resend({
    apiKey: process.env.RESEND_API_KEY,
    from: 'Onix <no-reply@onix.chat>',
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  providers: providers,
  adapter: HasuraAdapter({
    endpoint: process.env.AUTH_HASURA_GRAPHQL,
    adminSecret: process.env.AUTH_HASURA_SECRET,
  }),
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/signin',
  },
});
