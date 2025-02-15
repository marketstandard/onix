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
  signerPublicKey,
}: {
  provider: anchor.Provider;
  signerPublicKey?: PublicKey;
}) => {
  const program = initEscrowSolProgram(provider);
  const { escrowPda } = getEscrowPda(signerPublicKey || provider.publicKey);

  try {
    const escrowAccount = await program?.account?.escrowAccount?.fetch(escrowPda);

    return { escrowAccount };
  } catch (e) {
    return { escrowAccount: null };
  }
};

export const getHoldPda = (escrow: PublicKey, holdCounter: number) => {
  const holdCounterBuffer = new anchor.BN(holdCounter).toArrayLike(Buffer, 'le', 8);

  const [holdPda, holdPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [escrow.toBuffer(), holdCounterBuffer],
    ESCROW_SOL_PROGRAM_ID,
  );
  return { holdPda, holdPdaBump };
};

export const getHoldAccount = async (
  params:
    | {
        provider: anchor.Provider;
        owner: PublicKey;
        holdCounter: number;
      }
    | {
        provider: anchor.Provider;
        holdPda: PublicKey;
      },
) => {
  const program = initEscrowSolProgram(params.provider);
  const holdPda =
    'holdPda' in params ? params.holdPda : getHoldPda(params.owner, params.holdCounter).holdPda;

  try {
    const holdAccount = await program.account.holdAccount.fetch(holdPda);
    return { holdAccount };
  } catch (e) {
    return { holdAccount: null };
  }
};

export const decodeStorageUrl = (storageUrl: number[]) => {
  return new TextDecoder().decode(new Uint8Array(storageUrl)).replace(/\0/g, '');
};

export { deposit } from './deposit';
export { initialize } from './initialize';
export { adjustRate } from './adjustRate';
export { debit } from './debit';
export { releaseHold } from './releaseHold';
export { hold } from './hold';
export { setStorageUrl } from './setStorageUrl';
