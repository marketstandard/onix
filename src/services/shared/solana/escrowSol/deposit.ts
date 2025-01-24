import * as anchor from '@coral-xyz/anchor';
import { BaseParams, getEscrowAccount, getEscrowPda, initEscrowSolProgram } from '.';

interface Deposit extends Omit<BaseParams, 'signer'> {
  amountLamports: number;
}

export const deposit = async ({ provider, amountLamports }: Deposit) => {
  const program = initEscrowSolProgram(provider);

  const { escrowPda } = getEscrowPda(provider.publicKey);
  await program.methods
    .deposit(new anchor.BN(amountLamports))
    .accountsStrict({
      signer: provider.publicKey,
      escrow: escrowPda,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc({ commitment: 'confirmed' });

  const escrowAccount = await getEscrowAccount({ provider });

  return { escrowAccount };
};
