import { AnchorProvider } from '@coral-xyz/anchor';
import { Connection, Keypair, Transaction, VersionedTransaction } from '@solana/web3.js';

export const getStaticAnchorProvider = (keypair: Keypair) => {
  const connection = new Connection(
    process.env.APP_STAGE === 'production'
      ? 'https://api.mainnet-beta.solana.com'
      : 'https://api.devnet.solana.com',
    'confirmed',
  );

  const provider = new AnchorProvider(
    connection,
    {
      publicKey: keypair.publicKey,
      signTransaction: async <T extends Transaction | VersionedTransaction>(tx: T) => {
        if (tx instanceof Transaction) {
          tx.sign(keypair);
        } else {
          tx.sign([keypair]);
        }
        return tx;
      },
      signAllTransactions: async <T extends Transaction | VersionedTransaction>(txs: T[]) => {
        return txs.map((tx) => {
          if (tx instanceof Transaction) {
            tx.sign(keypair);
          } else {
            tx.sign([keypair]);
          }
          return tx;
        });
      },
    },
    { commitment: 'confirmed' },
  );

  return provider;
};
