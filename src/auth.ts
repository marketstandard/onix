import * as ed25519 from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
import bs58 from 'bs58';
import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import Resend from 'next-auth/providers/resend';
import { HasuraAdapter } from 'services/server/graphql/auth';

// Configure ed25519 with SHA-512 for Solana signature verification
ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));

interface SolanaCredentials {
  message: string;
  signature: string;
  publicKey: string;
}

const providers: Provider[] = [
  Resend({
    apiKey: process.env.RESEND_API_KEY,
    from: 'Onix <no-reply@onix.chat>',
  }),
  CredentialsProvider({
    id: 'solana',
    name: 'Solana Wallet',
    credentials: {
      message: { type: 'text' },
      signature: { type: 'text' },
      publicKey: { type: 'text' },
    },
    async authorize(credentials) {
      const { message, signature, publicKey } = credentials as SolanaCredentials;

      if (!message || !signature || !publicKey) {
        return null;
      }

      try {
        // Verify the signature
        const signatureUint8Array = new Uint8Array(Buffer.from(signature, 'base64'));
        const messageUint8Array = new TextEncoder().encode(message);
        const publicKeyBytes = bs58.decode(publicKey);

        const isValid = await ed25519.verify(
          signatureUint8Array,
          messageUint8Array,
          publicKeyBytes,
        );

        if (!isValid) {
          return null;
        }

        // Return user object that will be encoded in the JWT
        return {
          id: publicKey,
          publicKey: publicKey,
          name: `Wallet ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
          signatureMessage: message,
        };
      } catch (error) {
        console.error('Solana auth error:', error);
        return null;
      }
    },
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
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('user', user);
      if (user) {
        token = { ...token, ...user };
      }
      if (user?.publicKey) {
        token.publicKey = user.publicKey;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, ...token };
      }
      if (token.publicKey) {
        session.user.publicKey = token.publicKey as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
