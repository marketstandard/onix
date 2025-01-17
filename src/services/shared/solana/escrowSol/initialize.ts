import * as anchor from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { BaseParams, getConfigPda, initEscrowSolProgram } from '.';

interface Params extends BaseParams {
  holdTimeoutSeconds: number;
  rateLamports: number;
}

export const initialize = async ({
  provider,
  holdTimeoutSeconds,
  rateLamports,
  signer,
}: Params) => {
  const program = initEscrowSolProgram(provider);

  const { configPda } = getConfigPda();

  if (signer) {
    await program.methods
      .initialize(new anchor.BN(rateLamports), new anchor.BN(holdTimeoutSeconds))
      .accountsStrict({
        signer: provider.publicKey,
        config: configPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc({ commitment: 'confirmed' });
  } else {
    await program.methods
      .initialize(new anchor.BN(rateLamports), new anchor.BN(holdTimeoutSeconds))
      .accountsStrict({
        signer: provider.publicKey,
        config: configPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({ commitment: 'confirmed' });
  }

  const config = await program.account.configAccount.fetch(configPda);

  return { config };
};
