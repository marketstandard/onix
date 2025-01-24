import * as anchor from '@coral-xyz/anchor';
import { BaseParams, getConfigPda, getEscrowPda, getHoldPda, initEscrowSolProgram } from '.';

interface Params extends BaseParams {
  holdCounter: number;
}

export const releaseHold = async ({ provider, signer, holdCounter }: Params) => {
  const program = initEscrowSolProgram(provider);
  const { escrowPda } = getEscrowPda(signer.publicKey);
  const { holdPda } = getHoldPda(escrowPda, holdCounter);
  const { configPda } = getConfigPda();

  if (signer) {
    await program.methods
      .releaseHold()
      .accountsStrict({
        signer: signer.publicKey,
        hold: holdPda,
        config: configPda,
        escrow: escrowPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc({ commitment: 'confirmed' });
  } else {
    await program.methods
      .releaseHold()
      .accountsStrict({
        signer: provider.publicKey,
        hold: holdPda,
        config: configPda,
        escrow: escrowPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({ commitment: 'confirmed' });
  }

  const holdAccount = await program.account.holdAccount.fetch(holdPda);

  if (holdAccount !== null) throw new Error('Hold account not properly closed');

  const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);

  return { escrowAccount };
};
