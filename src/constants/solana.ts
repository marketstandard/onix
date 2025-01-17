import { PublicKey } from '@solana/web3.js';

const APP_STAGE = process.env.APP_STAGE!;

const ESCROW_SOL_PROGRAM_ID_DEVNET = new PublicKey('2JBCYeo1xvw1g2QVY1YCMc1obro975ykkXh92bsKCyrD');
const ESCROW_SOL_PROGRAM_ID_MAINNET = new PublicKey('');

export const ESCROW_SOL_PROGRAM_ID =
  APP_STAGE === 'production' ? ESCROW_SOL_PROGRAM_ID_MAINNET : ESCROW_SOL_PROGRAM_ID_DEVNET;

export const CONFIG_PDA_SEED = Buffer.from('config');
