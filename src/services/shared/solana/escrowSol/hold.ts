import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import {
  BaseParams,
  getConfigPda,
  getEscrowAccount,
  getEscrowPda,
  getHoldPda,
  initEscrowSolProgram,
} from '.';

interface Params extends BaseParams {
  amountLlmTokens: number;
  ownerPublicKey: PublicKey;
}

export const hold = async ({ provider, signer, amountLlmTokens, ownerPublicKey }: Params) => {
  const program = initEscrowSolProgram(provider);

  console.log('ownerPublicKey', ownerPublicKey.toBase58());

  const { escrowPda } = getEscrowPda(ownerPublicKey);

  const { escrowAccount } = await getEscrowAccount({ provider, signerPublicKey: ownerPublicKey });

  console.log('escrow account', escrowAccount);

  const holdCounter = escrowAccount.holdCounter;

  const { holdPda } = getHoldPda(escrowPda, holdCounter.toNumber());
  const { configPda } = getConfigPda();

  await program.methods
    .hold(new anchor.BN(amountLlmTokens))
    .accountsStrict({
      signer: signer.publicKey,
      escrow: escrowPda,
      hold: holdPda,
      config: configPda,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([signer])
    .rpc({ commitment: 'confirmed' });

  const holdAccount = await program.account.holdAccount.fetch(holdPda);

  return { holdAccount, holdCounter, holdPda };
};
