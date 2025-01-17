import {
  BaseParams,
  getConfigPda,
  getEscrowPda,
  getHoldAccount,
  getHoldPda,
  initEscrowSolProgram,
} from '.';

interface Params extends BaseParams {
  amountLlmTokens: number;
  holdCounter: number;
}

export const debit = async ({ provider, amountLlmTokens, signer, holdCounter }: Params) => {
  const program = initEscrowSolProgram(provider);
  const { escrowPda } = getEscrowPda(signer.publicKey);
  const { holdPda } = getHoldPda(escrowPda, holdCounter);
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

  const holdAccount = await getHoldAccount({ provider, signer, holdCounter });

  return { holdAccount };
};
