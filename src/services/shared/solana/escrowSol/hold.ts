import {
  BaseParams,
  getConfigPda,
  getEscrowAccount,
  getEscrowPda,
  getHoldPda,
  initEscrowSolProgram,
} from '.';

interface Params extends Omit<BaseParams, 'signer'> {
  amountLlmTokens: number;
}

export const hold = async ({ provider, amountLlmTokens }: Params) => {
  const program = initEscrowSolProgram(provider);
  const { escrowPda } = getEscrowPda(provider.publicKey);

  const { escrowAccount } = await getEscrowAccount({ provider });
  const holdCounter = escrowAccount.holdCounter;
  const { holdPda } = getHoldPda(escrowPda, holdCounter.toNumber());
  const { configPda } = getConfigPda();

  await program.methods
    .hold(new anchor.BN(amountLlmTokens))
    .accountsStrict({
      signer: provider.publicKey,
      escrow: escrowPda,
      hold: holdPda,
      config: configPda,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc({ commitment: 'confirmed' });

  const holdAccount = await program.account.holdAccount.fetch(holdPda);

  return { holdAccount, holdCounter };
};
