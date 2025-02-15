import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { BaseParams, getConfigPda, getEscrowPda, initEscrowSolProgram } from '.';

interface Params extends BaseParams {
  storageUrl: string | null;
  userPublicKey: PublicKey;
}

export const setStorageUrl = async ({ provider, storageUrl, signer, userPublicKey }: Params) => {
  const program = initEscrowSolProgram(provider);
  const { configPda } = getConfigPda();

  if (!signer) {
    throw new Error('Signer is required');
  }

  const { escrowPda } = getEscrowPda(userPublicKey);

  await program.methods
    .setStorageUrl(storageUrl)
    .accountsStrict({
      signer: signer.publicKey,
      config: configPda,
      escrow: escrowPda,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([signer])
    .rpc({ commitment: 'confirmed' });

  const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);

  return { escrowAccount };
};
