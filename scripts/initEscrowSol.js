const { Keypair, Connection } = require('@solana/web3.js');
const { AnchorProvider } = require('@coral-xyz/anchor');
const { initialize } = require('../src/services/shared/solana/escrowSol/initialize');
const fs = require('fs');

const IS_PROD = false;

const main = async () => {
  const endpoint = IS_PROD
    ? 'https://api.mainnet-beta.solana.com'
    : 'https://api.devnet.solana.com';

  const connection = new Connection(endpoint, 'confirmed');

  const walletPath = IS_PROD ? './secrets/wallet-prod.json' : './secrets/wallet-dev.json';

  const rawWallet = fs.readFileSync(walletPath);
  const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(rawWallet)));

  const provider = new AnchorProvider(
    connection,
    {
      publicKey: keypair.publicKey,
      signTransaction: (tx) => tx.sign(keypair),
      signAllTransactions: (txs) => txs.map((tx) => tx.sign(keypair)),
    },
    { commitment: 'confirmed' },
  );

  const holdTimeoutSeconds = 600; // 10 minutes
  const rateLamports = 1_000_000; // 0.001 SOL

  try {
    const { config } = await initialize({
      provider,
      holdTimeoutSeconds,
      rateLamports,
      signer: keypair,
    });

    console.log('Escrow initialized successfully');
    console.log('Config:', config);
  } catch (error) {
    console.error('Failed to initialize escrow:', error);
  }
};

main().catch(console.error);
