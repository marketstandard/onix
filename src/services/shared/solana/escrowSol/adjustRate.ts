import * as anchor from '@coral-xyz/anchor';
import { BaseParams, getConfigAccount, getConfigPda, initEscrowSolProgram } from '.';

interface Params extends BaseParams {
  newRateLamports: number;
}

export const adjustRate = async ({ provider, newRateLamports, signer }: Params) => {
  const program = initEscrowSolProgram(provider);
  const { configPda } = getConfigPda();

  if (signer) {
    await program.methods
      .adjustRate(new anchor.BN(newRateLamports))
      .accountsStrict({
        signer: signer.publicKey,
        config: configPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc({ commitment: 'confirmed' });
  } else {
    await program.methods
      .adjustRate(new anchor.BN(newRateLamports))
      .accountsStrict({
        signer: provider.publicKey,
        config: configPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({ commitment: 'confirmed' });
  }

  const config = await getConfigAccount({ provider });

  return { config };
};
