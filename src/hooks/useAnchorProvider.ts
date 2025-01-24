import { useMemo } from 'react';
import { AnchorProvider } from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';

export const useAnchorProvider = () => {
  const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction, connected } = useWallet();

  const provider = useMemo(() => {
    if (!publicKey || !signTransaction || !signAllTransactions) {
      return null;
    }
    return new AnchorProvider(
      connection,
      {
        publicKey,
        signTransaction,
        signAllTransactions,
      },
      { commitment: 'confirmed' },
    );
  }, [connection, publicKey, signTransaction, signAllTransactions]);

  return { provider, isConnected: connected };
};
