import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { BaseParams, getConfigPda, getHoldAccount, initEscrowSolProgram } from '.';

interface Params extends BaseParams {
  amountLlmTokens: number;
  holdPda: PublicKey;
}

export const debit = async ({ provider, amountLlmTokens, signer, holdPda }: Params) => {
  const program = initEscrowSolProgram(provider);
  const { configPda } = getConfigPda();

  if (signer) {
    await program.methods
      .debit(new anchor.BN(amountLlmTokens))
      .accountsStrict({
        signer: signer.publicKey,
        hold: holdPda,
        config: configPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc({ commitment: 'confirmed' });
  } else {
    await program.methods
      .debit(new anchor.BN(amountLlmTokens))
      .accountsStrict({
        signer: provider.publicKey,
        hold: holdPda,
        config: configPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({ commitment: 'confirmed' });
  }

  const holdAccount = await getHoldAccount({ provider, holdPda });

  return { holdAccount };
};
