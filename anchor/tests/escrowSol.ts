import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import assert from 'assert';
import { EscrowSol } from '../target/types/escrow_sol';
import { SYSTEM_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/native/system';

const HOLD_TIMEOUT_SECONDS = 5;
const RATE_LAMPORTS = 100;

const CONFIG_PDA_SEED = Buffer.from('config');

describe('Escrow Sol', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.escrow_sol as Program<EscrowSol>;

  const authorityWallet = anchor.web3.Keypair.generate();
  const userWallet = anchor.web3.Keypair.generate();
  const thirdPartyWallet = anchor.web3.Keypair.generate();
  
  const [configPda, configPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [CONFIG_PDA_SEED],
    program.programId,
  );
  
  const deriveEscrowPda = (authority: PublicKey) => anchor.web3.PublicKey.findProgramAddressSync(
    [authority.toBuffer()],
    program.programId,
  );

  const deriveHoldPda = (escrow: PublicKey, holdCounter: number) => anchor.web3.PublicKey.findProgramAddressSync(
    [
      escrow.toBuffer(),
      new anchor.BN(holdCounter).toBuffer('le', 8),
    ],
    program.programId,
  );

  it('Initialize Tests', async () => {
    const authorityAirdropSignature = await program.provider.connection.requestAirdrop(
      authorityWallet.publicKey,
      25 * LAMPORTS_PER_SOL,
    );
    const userAirdropSignature = await program.provider.connection.requestAirdrop(
      userWallet.publicKey,
      25 * LAMPORTS_PER_SOL,
    );
    const thirdPartyAirdropSignature = await program.provider.connection.requestAirdrop(
      thirdPartyWallet.publicKey,
      25 * LAMPORTS_PER_SOL,
    );

    await Promise.all([authorityAirdropSignature, userAirdropSignature, thirdPartyAirdropSignature].map(async (signature) => {
      return program.provider.connection.confirmTransaction({
        signature,
        blockhash: (await program.provider.connection.getLatestBlockhash()).blockhash,
        lastValidBlockHeight: (await program.provider.connection.getLatestBlockhash()).lastValidBlockHeight,
      });
    }));

    const balanceAuthority = await program.provider.connection.getBalance(authorityWallet.publicKey);
    const balanceUser = await program.provider.connection.getBalance(userWallet.publicKey);
    const balanceThirdParty = await program.provider.connection.getBalance(thirdPartyWallet.publicKey);

    assert(balanceAuthority === 25 * LAMPORTS_PER_SOL, 'Authority wallet incorrectly credited');
    assert(balanceUser === 25 * LAMPORTS_PER_SOL, 'User wallet incorrectly credited');
    assert(balanceThirdParty === 25 * LAMPORTS_PER_SOL, 'Third party wallet incorrectly credited');
  });

  it('Can initialize the config account', async () => {
    await program.methods.initialize(
      new anchor.BN(90),
      new anchor.BN(HOLD_TIMEOUT_SECONDS
    )).accountsStrict({
      signer: authorityWallet.publicKey,
      config: configPda,
      systemProgram: SYSTEM_PROGRAM_ID,
    }).signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    const configAccount = await program.account.configAccount.fetch(configPda);
    assert(configAccount.rateLamports.toString() === '90', 'Incorrect Rate');
    assert(configAccount.bump === configPdaBump, 'Incorrect Bump');
    assert(configAccount.authority.toString() === authorityWallet.publicKey.toString(), 'Incorrect Authority');
  });

  it('Can adjust the rate', async () => {
    await program.methods
      .adjustRate(new anchor.BN(RATE_LAMPORTS))
      .accountsStrict({
        signer: authorityWallet.publicKey,
        config: configPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    const configAccount = await program.account.configAccount.fetch(configPda);
    assert(configAccount.rateLamports.toString() === '100', 'Incorrect Rate');
  });

  it('Can initialize an escrow account', async () => {
    const [escrowPda, escrowBump] = deriveEscrowPda(userWallet.publicKey);
    const depositAmount = new anchor.BN(5 * LAMPORTS_PER_SOL);

    await program.methods.deposit(depositAmount)
      .accountsStrict({
        signer: userWallet.publicKey,
        escrow: escrowPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([userWallet])
      .rpc({ commitment: 'confirmed' });

    const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);
    assert(escrowAccount.authority.toString() === userWallet.publicKey.toString(), 'Incorrect Authority');
    assert(escrowAccount.bump === escrowBump, 'Incorrect Bump');
    assert(escrowAccount.amountLamports.toString() === depositAmount.toString(), 'Incorrect Amount');
    assert(escrowAccount.holdCounter.toString() === '0', 'Hold counter should be 0');
  });

  it('Can make a multiple deposits', async () => {
     const [escrowPda, escrowBump] = deriveEscrowPda(userWallet.publicKey);
    const depositAmount = new anchor.BN(5 * LAMPORTS_PER_SOL);

    await program.methods.deposit(depositAmount)
      .accountsStrict({
        signer: userWallet.publicKey,
        escrow: escrowPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([userWallet])
      .rpc({ commitment: 'confirmed' });

    const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);
    assert(escrowAccount.authority.toString() === userWallet.publicKey.toString(), 'Incorrect Authority');
    assert(escrowAccount.bump === escrowBump, 'Incorrect Bump');
    assert(escrowAccount.amountLamports.toString() === (depositAmount.mul(new anchor.BN(2))).toString(), 'Incorrect Amount');
    assert(escrowAccount.holdCounter.toString() === '0', 'Hold counter should be 0');
  })

  it('Can initialize a hold account', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);

    const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);
    const holdCounter = escrowAccount.holdCounter.toNumber();

    const [holdPda, holdBump] = deriveHoldPda(escrowPda, holdCounter);
    const holdAmount = new anchor.BN(1);

    await program.methods.hold(holdAmount)
      .accountsStrict({
        signer: authorityWallet.publicKey,
        escrow: escrowPda,
        config: configPda,
        hold: holdPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    const holdAccount = await program.account.holdAccount.fetch(holdPda);
    assert(holdAccount.escrowAuthority.toString() === userWallet.publicKey.toString(), 'Incorrect Escrow Authority');
    assert(holdAccount.amountLamports.toString() === holdAmount.mul(new anchor.BN(RATE_LAMPORTS)).toString(), 'Incorrect Amount');
    assert(holdAccount.bump === holdBump, 'Incorrect Bump');
  });

  it('Can initialize a concurrent hold account', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);
    const holdCounter = escrowAccount.holdCounter.toNumber();
    const [holdPda, holdBump] = deriveHoldPda(escrowPda, holdCounter);
    const holdAmount = new anchor.BN(1);

    await program.methods.hold(holdAmount)
      .accountsStrict({
        signer: authorityWallet.publicKey,
        escrow: escrowPda,
        config: configPda,
        hold: holdPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    const holdAccount = await program.account.holdAccount.fetch(holdPda);
    assert(holdAccount.escrowAuthority.toString() === userWallet.publicKey.toString(), 'Incorrect Escrow Authority');
    assert(holdAccount.amountLamports.toString() === holdAmount.mul(new anchor.BN(RATE_LAMPORTS)).toString(), 'Incorrect Amount');
    assert(holdAccount.bump === holdBump, 'Incorrect Bump');
  });

  it('Cannot release hold before hold timeout', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);
    const holdCounter = escrowAccount.holdCounter.toNumber();
    const [holdPda, holdBump] = deriveHoldPda(escrowPda, holdCounter - 1);

    try {
      await program.methods.releaseHold()
        .accountsStrict({
          signer: userWallet.publicKey,
          escrow: escrowPda,
          hold: holdPda,
          config: configPda,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .signers([userWallet])
        .rpc({ commitment: 'confirmed' });
      assert(false, 'Should not be able to release hold before timeout');
    } catch (error) {
      assert(error.toString().includes('InvalidAuthority'));
    }
  });

  it('Can release hold after hold timeout', async () => {
    await new Promise(resolve => setTimeout(resolve, HOLD_TIMEOUT_SECONDS * 1250));

    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);
    const holdCounter = escrowAccount.holdCounter.toNumber();
    const [holdPda, holdBump] = deriveHoldPda(escrowPda, holdCounter - 1);
    const escrowBefore = await program.account.escrowAccount.fetch(escrowPda);
    const holdBefore = await program.account.holdAccount.fetch(holdPda);

    await program.methods.releaseHold()
      .accountsStrict({
        signer: userWallet.publicKey,
        escrow: escrowPda,
        hold: holdPda,
        config: configPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([userWallet])
      .rpc({ commitment: 'confirmed' });

    const escrowAfter = await program.account.escrowAccount.fetch(escrowPda);
    assert(
      escrowAfter.amountLamports.toString() === escrowBefore.amountLamports.add(holdBefore.amountLamports).toString(),
      'Incorrect amount after release'
    );
  });

  it('3rd party cannot release hold', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const [holdPda] = deriveHoldPda(escrowPda, 0);

    try {
      await program.methods.releaseHold()
        .accountsStrict({
          signer: thirdPartyWallet.publicKey,
          escrow: escrowPda,
          hold: holdPda,
          config: configPda,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .signers([thirdPartyWallet])
        .rpc({ commitment: 'confirmed' });
      assert(false, 'Third party should not be able to withdraw');
    } catch (error) {
      assert(error.toString().includes('InvalidAuthority'));
    }
  });

  it('3rd party cannot deposit', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const depositAmount = new anchor.BN(1 * LAMPORTS_PER_SOL);

    try {
      await program.methods.deposit(depositAmount)
        .accountsStrict({
          signer: thirdPartyWallet.publicKey,
          escrow: escrowPda,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .signers([thirdPartyWallet])
        .rpc({ commitment: 'confirmed' });
      assert(false, 'Third party should not be able to deposit');
    } catch (error) {
      assert(error.toString().includes('Error'));
    }
  });

  it('Cannot hold more than the escrow account has', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const [holdPda] = deriveHoldPda(escrowPda, 2);
    const holdAmount = new anchor.BN(11 * LAMPORTS_PER_SOL / RATE_LAMPORTS);

    try {
      await program.methods.hold(holdAmount)
        .accountsStrict({
          signer: authorityWallet.publicKey,
          escrow: escrowPda,
          config: configPda,
          hold: holdPda,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .signers([authorityWallet])
        .rpc({ commitment: 'confirmed' });
      assert(false, 'Should not be able to hold more than escrow balance');
    } catch (error) {
      assert(error.toString().includes('InsufficientFunds'));
    }
  });

  it('Can debit from hold account', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const [holdPda] = deriveHoldPda(escrowPda, 2);
    const holdAmount = new anchor.BN(1);

    await program.methods.hold(holdAmount)
      .accountsStrict({
        signer: authorityWallet.publicKey,
        escrow: escrowPda,
        config: configPda,
        hold: holdPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    await program.methods.debit(holdAmount)
      .accountsStrict({
        signer: authorityWallet.publicKey,
        hold: holdPda,
        config: configPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    // Verify hold account is closed
    const holdAccountInfo = await program.provider.connection.getAccountInfo(holdPda);
    assert(holdAccountInfo === null, 'Hold account should be closed after debit');
  });

  it('Cannot debit more than hold amount', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const [holdPda] = deriveHoldPda(escrowPda, 3);
    const holdAmount = new anchor.BN(1);
    const debitAmount = new anchor.BN(2); // More than held

    // First create a hold
    await program.methods.hold(holdAmount)
      .accountsStrict({
        signer: authorityWallet.publicKey,
        escrow: escrowPda,
        config: configPda,
        hold: holdPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    // Try to debit more than held
    try {
      await program.methods.debit(debitAmount)
        .accountsStrict({
          signer: authorityWallet.publicKey,
          hold: holdPda,
          config: configPda,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .signers([authorityWallet])
        .rpc({ commitment: 'confirmed' });
      assert(false, 'Should not be able to debit more than hold amount');
    } catch (error) {
      assert(error.toString().includes('NotEnoughLamportsOnHold'));
    }
  });

  it('Non-authority cannot debit', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const [holdPda] = deriveHoldPda(escrowPda, 4);
    const holdAmount = new anchor.BN(1);

    // First create a hold
    await program.methods.hold(holdAmount)
      .accountsStrict({
        signer: authorityWallet.publicKey,
        escrow: escrowPda,
        config: configPda,
        hold: holdPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    // Try to debit with non-authority
    try {
      await program.methods.debit(holdAmount)
        .accountsStrict({
          signer: userWallet.publicKey,
          hold: holdPda,
          config: configPda,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .signers([userWallet])
        .rpc({ commitment: 'confirmed' });
      assert(false, 'Non-authority should not be able to debit');
    } catch (error) {
      assert(error.toString().includes('InvalidAuthority'));
    }
  });

  it('Authority can release hold', async () => {
    const [escrowPda] = deriveEscrowPda(userWallet.publicKey);
    const [holdPda] = deriveHoldPda(escrowPda, 5);
    const holdAmount = new anchor.BN(1);

    // First create a hold
    await program.methods.hold(holdAmount)
      .accountsStrict({
        signer: authorityWallet.publicKey,
        escrow: escrowPda,
        config: configPda,
        hold: holdPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    const escrowBefore = await program.account.escrowAccount.fetch(escrowPda);
    const holdBefore = await program.account.holdAccount.fetch(holdPda);

    // Authority can release immediately
    await program.methods.releaseHold()
      .accountsStrict({
        signer: authorityWallet.publicKey,
        escrow: escrowPda,
        hold: holdPda,
        config: configPda,
        systemProgram: SYSTEM_PROGRAM_ID,
      })
      .signers([authorityWallet])
      .rpc({ commitment: 'confirmed' });

    const escrowAfter = await program.account.escrowAccount.fetch(escrowPda);
    assert(
      escrowAfter.amountLamports.toString() === escrowBefore.amountLamports.add(holdBefore.amountLamports).toString(),
      'Incorrect amount after release'
    );

    // Verify hold account is closed
    const holdAccountInfo = await program.provider.connection.getAccountInfo(holdPda);
    assert(holdAccountInfo === null, 'Hold account should be closed after release');
  });
});
