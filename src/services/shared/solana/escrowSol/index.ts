import * as anchor from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { CONFIG_PDA_SEED, ESCROW_SOL_PROGRAM_ID } from 'constants/solana';
import { EscrowSol } from 'types/generated/solana/escrowSol';
import idl from 'types/generated/solana/escrowSol.json';

type InitEscrowSolProgram = (provider?: anchor.Provider) => anchor.Program<EscrowSol>;

export interface BaseParams {
  provider: anchor.Provider;
  signer?: Keypair;
}

export const initEscrowSolProgram: InitEscrowSolProgram = (provider) => {
  const program = new anchor.Program(idl as EscrowSol, provider);
  return program;
};

export const getConfigPda = () => {
  const [configPda, configPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [CONFIG_PDA_SEED],
    ESCROW_SOL_PROGRAM_ID,
  );
  return { configPda, configPdaBump };
};

export const getConfigAccount = async ({ provider }: { provider: anchor.Provider }) => {
  const program = initEscrowSolProgram(provider);
  const { configPda } = getConfigPda();

  const configAccount = await program.account.configAccount.fetch(configPda);

  return { configAccount };
};

export const getEscrowPda = (authority: PublicKey) => {
  const [escrowPda, escrowPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [authority.toBuffer()],
    ESCROW_SOL_PROGRAM_ID,
  );
  return { escrowPda, escrowPdaBump };
};

export const getEscrowAccount = async ({
  provider,
  signer,
}: {
  provider: anchor.Provider;
  signer?: Keypair;
}) => {
  const program = initEscrowSolProgram(provider);
  const { escrowPda } = getEscrowPda(signer?.publicKey || provider.publicKey);

  const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);

  return { escrowAccount };
};

export const getHoldPda = (escrow: PublicKey, holdCounter: number) => {
  const [holdPda, holdPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [escrow.toBuffer(), new anchor.BN(holdCounter).toBuffer('le', 8)],
    ESCROW_SOL_PROGRAM_ID,
  );
  return { holdPda, holdPdaBump };
};

export const getHoldAccount = async ({
  provider,
  signer,
  holdCounter,
}: {
  provider: anchor.Provider;
  signer?: Keypair;
  holdCounter: number;
}) => {
  const program = initEscrowSolProgram(provider);
  const { holdPda } = getHoldPda(signer?.publicKey || provider.publicKey, holdCounter);

  const holdAccount = await program.account.holdAccount.fetch(holdPda);

  return { holdAccount };
};

export { deposit } from './deposit';
export { initialize } from './initialize';
export { adjustRate } from './adjustRate';
export { debit } from './debit';
export { releaseHold } from './releaseHold';
export { hold } from './hold';
