import { WalletContextState } from '@solana/wallet-adapter-react';
import { signIn } from 'next-auth/react';

export async function signInWithSolana(wallet: WalletContextState) {
  try {
    if (!wallet.connected || !wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    // Create a message for the user to sign
    const message = new TextEncoder().encode(
      `Sign this message to authenticate with Onix\nTimestamp: ${Date.now()}`,
    );

    // Request signature from the wallet
    const signature = await wallet.signMessage(message);

    // Sign in with NextAuth using the Solana provider
    const result = await signIn('solana', {
      message: new TextDecoder().decode(message),
      signature: Buffer.from(signature).toString('base64'),
      publicKey: wallet.publicKey.toBase58(),
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error('Error signing in with Solana:', error);
    throw error;
  }
}
