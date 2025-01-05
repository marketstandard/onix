import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import * as spl from '@solana/spl-token';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import assert from 'assert';
import { PurchaseTokens } from '../target/types/purchase_tokens';

const CONFIG_PDA_SEED = Buffer.from('config');

describe('purchaseTokens', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const SYSTEM_PROGRAM_ID = anchor.web3.SystemProgram.programId;
  const SYSVAR_RENT_PUBKEY = anchor.web3.SYSVAR_RENT_PUBKEY;

  const program = anchor.workspace.PurchaseTokens as Program<PurchaseTokens>;

  const sellerWallet = anchor.web3.Keypair.generate();
  const buyerWallet = anchor.web3.Keypair.generate();

  let mint: PublicKey;

  let sellerTokenAccount: spl.Account;
  let buyerTokenAccount: spl.Account;

  const deriveAccountPDA = async () => {
    const programAddress = anchor.web3.PublicKey.findProgramAddressSync(
      [CONFIG_PDA_SEED],
      program.programId,
    );
    return programAddress;
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  it('Initialization', async () => {
    /* Airdrop 25 SOL to each wallet */
    const sellerAirdropSignature = await program.provider.connection.requestAirdrop(
      sellerWallet.publicKey,
      25 * LAMPORTS_PER_SOL,
    );

    await program.provider.connection.confirmTransaction({
      signature: sellerAirdropSignature,
      blockhash: (await program.provider.connection.getLatestBlockhash()).blockhash,
      lastValidBlockHeight: (
        await program.provider.connection.getLatestBlockhash()
      ).lastValidBlockHeight,
    });

    const buyerAirdropSignature = await program.provider.connection.requestAirdrop(
      buyerWallet.publicKey,
      25 * LAMPORTS_PER_SOL,
    );

    await program.provider.connection.confirmTransaction({
      signature: buyerAirdropSignature,
      blockhash: (await program.provider.connection.getLatestBlockhash()).blockhash,
      lastValidBlockHeight: (
        await program.provider.connection.getLatestBlockhash()
      ).lastValidBlockHeight,
    });

    const balance1 = await program.provider.connection.getBalance(sellerWallet.publicKey);
    console.log('sellerBalance', balance1);
    assert(balance1 === 25000000000, 'sellerWallet incorrectly accredited');
    const balance2 = await program.provider.connection.getBalance(buyerWallet.publicKey);
    console.log('buyerBalance', balance2);
    assert(balance2 === 25000000000, 'buyerWallet incorrectly accredited');

    /* CREATE A TOKEN AND MINT 20 TO WALLET 1 */
    console.log("Creating mint...");
    
    mint = await spl.createMint(
      program.provider.connection,
      sellerWallet,
      sellerWallet.publicKey,
      undefined,
      0
    );

    sellerTokenAccount = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      sellerWallet,
      mint,
      sellerWallet.publicKey
    );

    await spl.mintTo(
      program.provider.connection,
      sellerWallet,
      mint,
      sellerTokenAccount.address,
      sellerWallet.publicKey,
      20
    );

    console.log("Mint created:", mint.toBase58());

    // Add a delay to ensure the transaction is confirmed
    await delay(1000);

    // Verify the mint was created
    try {
      const mintInfo = await program.provider.connection.getAccountInfo(mint);
      console.log("Mint account exists:", !!mintInfo);
    } catch (error) {
      console.error("Error verifying mint:", error);
      throw error;
    }

    console.log("Verifying token supply...");
    /* confirm that we have these tokens in the seller wallet */
    const supply = await program.provider.connection.getTokenSupply(mint);
    console.log("Token supply:", supply.value);
    assert(supply.value.uiAmount === 20, 'sellerWallet does not have 20 tokens');
    assert(supply.value.decimals === 0, 'sellerWallet does not have 20 tokens');

    const tokenAccounts = await program.provider.connection.getTokenAccountsByOwner(
      sellerWallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      },
    );
    const decodedTokenAccounts = tokenAccounts.value.map((account) =>
      spl.AccountLayout.decode(new Uint8Array(account.account.data)),
    );
    assert(decodedTokenAccounts[0].amount.toString() === '20');
  });

  it('Can initialize the swap', async () => {
    const [configAccountPda, configAccountPdaBump] = await deriveAccountPDA();

    const sellerTokenAccount = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      sellerWallet,
      mint,
      sellerWallet.publicKey,
    );
    
    await program.methods
      .initialize(new anchor.BN(100), configAccountPdaBump)
      .accountsStrict({
        authority: sellerWallet.publicKey,
        mint,
        config: configAccountPda,
        systemProgram: SYSTEM_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        authorityTokenAccount: sellerTokenAccount.address,
      })
      .signers([sellerWallet])
      .rpc({ commitment: 'confirmed' });

    const configAccount = await program.account.config.fetch(configAccountPda);
    assert(configAccount.rateLamports.toString() === '100', 'Incorrect Rate');
    assert(configAccount.bump === configAccountPdaBump, 'Incorrect Bump');
    assert(
      configAccount.authority.toString() === sellerWallet.publicKey.toString(),
      'Incorrect Authority',
    );
    assert(configAccount.mint.toString() === mint.toString(), 'Incorrect Mint');
  });

  it('Can change the rate', async () => {
    const [configAccountPda, configAccountPdaBump] = await deriveAccountPDA();

    const configBefore = await program.account.config.fetch(configAccountPda);
    console.log('Rate before:', configBefore.rateLamports.toString());

    const tx = await program.methods
      .setRate(new anchor.BN(50))
      .accountsStrict({
        authority: sellerWallet.publicKey,
        config: configAccountPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([sellerWallet])
      .rpc({ commitment: 'confirmed' });
    
    console.log('Transaction signature:', tx);

    const configAfter = await program.account.config.fetch(configAccountPda);
    console.log('Rate after:', configAfter.rateLamports.toString());

    assert(configAfter.rateLamports.toString() === '50', 'Incorrect Rate');
  });

  it('Can deposit more tokens', async () => {
    const [configAccountPda, configAccountPdaBump] = await deriveAccountPDA();
    const escrowTokenAccount = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      sellerWallet,
      mint,
      configAccountPda,
      true,
    );
    
    const sellerTokenAccount = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      sellerWallet,
      mint,
      sellerWallet.publicKey,
    );

    await program.methods
      .fund(new anchor.BN(10))
      .accountsStrict({
        authority: sellerWallet.publicKey,
        config: configAccountPda,
        escrow: escrowTokenAccount.address,
        authorityTokenAccount: sellerTokenAccount.address,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SYSTEM_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        mint,
      })
      .signers([sellerWallet])
      .rpc({ commitment: 'confirmed' });

    const escrowTokenAccountAfter = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      sellerWallet,
      mint,
      configAccountPda,
      true,
    );

    console.log('Escrow token account after:', escrowTokenAccountAfter.amount.toString());
    assert(
      escrowTokenAccountAfter.amount.toString() === '10',
      'Escrow was not credited the proper amount of tokens',
    );
  });

  it('Can purchase tokens', async () => {
    const [configAccountPda, configAccountPdaBump] = await deriveAccountPDA();
    const escrowAccount = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      sellerWallet,
      mint,
      configAccountPda,
      true,
    );
    const buyerTokenAccount = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      buyerWallet,
      mint,
      buyerWallet.publicKey,
    );
    await program.methods
      .swap(new anchor.BN(10))
      .accountsStrict({
        authority: buyerWallet.publicKey,
        config: configAccountPda,
        escrow: escrowAccount.address,
        authorityTokenAccount: buyerTokenAccount.address,
        systemProgram: SYSTEM_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        owner: sellerWallet.publicKey,
        mint,
      })
      .signers([buyerWallet])
      .rpc({ commitment: 'confirmed' });

    const buyerTokenAccountPostPurchase = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      buyerWallet,
      mint,
      buyerWallet.publicKey,
    );

    assert(
      buyerTokenAccountPostPurchase.amount.toString() === '10',
      'Buyer was not credited the proper amount of tokens',
    );

    const escrowTokenAccountPostPurchase = await spl.getOrCreateAssociatedTokenAccount(
      program.provider.connection,
      sellerWallet,
      mint,
      escrowAccount.address,
      true,
    );
    assert(
      escrowTokenAccountPostPurchase.amount.toString() === '0',
      'Escrow was not debited the proper amount of tokens',
    );
  });
});
