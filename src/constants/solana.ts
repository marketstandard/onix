import { PublicKey } from '@solana/web3.js';

const APP_STAGE = process.env.APP_STAGE!;

const ESCROW_SOL_PROGRAM_ID_DEVNET = new PublicKey('BUHpXM8QXNixSt4snCxLUKC7DnGdar3Vrch4EDs7Acz5');
const ESCROW_SOL_PROGRAM_ID_MAINNET = new PublicKey('11111111111111111111111111111111');

export const ESCROW_SOL_PROGRAM_ID =
  APP_STAGE === 'production' ? ESCROW_SOL_PROGRAM_ID_MAINNET : ESCROW_SOL_PROGRAM_ID_DEVNET;

export const CONFIG_PDA_SEED = Buffer.from('config');
