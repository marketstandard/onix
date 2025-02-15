use anchor_lang::prelude::*;
use anchor_lang::solana_program::{clock::Clock, program::invoke, system_instruction};

declare_id!("AwPNA8uVGpLkksaomZ6Y8uomcjyNAA4JhDm41oSH7nmi");

const CONFIG_PDA_SEED: &[u8] = b"config";

#[program]
pub mod escrow_sol {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, rate_lamports: u64, hold_timeout_seconds: i64) -> Result<()> {
        let config: &mut Account<ConfigAccount> = &mut ctx.accounts.config;

        config.authority = ctx.accounts.signer.key();
        config.bump = ctx.bumps.config;
        config.rate_lamports = rate_lamports;
        config.hold_timeout_seconds = hold_timeout_seconds;

        Ok(())
    }

    pub fn adjust_rate(ctx: Context<AdjustRate>, new_rate_lamports: u64) -> Result<()> {
        let config: &mut Account<ConfigAccount> = &mut ctx.accounts.config;

        config.rate_lamports = new_rate_lamports;

        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount_lamports: u64) -> Result<()> {
        // transfer sol from signer to escrow
        invoke(
            &system_instruction::transfer(
                &ctx.accounts.signer.key(),
                &ctx.accounts.escrow.key(),
                amount_lamports,
            ),
            &[
                ctx.accounts.signer.to_account_info(),
                ctx.accounts.escrow.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        let escrow: &mut Account<EscrowAccount> = &mut ctx.accounts.escrow;
        escrow.authority = ctx.accounts.signer.key();
        escrow.bump = ctx.bumps.escrow;
        escrow.amount_lamports = escrow
            .amount_lamports
            .checked_add(amount_lamports)
            .ok_or(ErrorCode::ArithmeticOverflow)?;
        escrow.hold_counter = 0;

        Ok(())
    }

    pub fn hold(ctx: Context<Hold>, amount_llm_tokens: u64) -> Result<()> {
        let escrow: &mut Account<EscrowAccount> = &mut ctx.accounts.escrow;
        let config: &Account<ConfigAccount> = &ctx.accounts.config;
        let hold: &mut Account<HoldAccount> = &mut ctx.accounts.hold;
        let clock = Clock::get()?;

        let lamports_to_hold = amount_llm_tokens
            .checked_mul(config.rate_lamports)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        require!(
            escrow.amount_lamports >= lamports_to_hold,
            ErrorCode::InsufficientFunds
        );

        escrow.amount_lamports = escrow
            .amount_lamports
            .checked_sub(lamports_to_hold)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        escrow.hold_counter = escrow
            .hold_counter
            .checked_add(1)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        hold.amount_lamports = lamports_to_hold;
        hold.escrow_authority = escrow.authority;
        hold.created_at = clock.unix_timestamp;
        hold.bump = ctx.bumps.hold;

        **ctx.accounts.escrow.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .escrow
            .to_account_info()
            .lamports()
            .checked_sub(lamports_to_hold)
            .ok_or(ErrorCode::ArithmeticOverflow)?;
        **ctx.accounts.hold.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .hold
            .to_account_info()
            .lamports()
            .checked_add(lamports_to_hold)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        Ok(())
    }

    pub fn debit(ctx: Context<Debit>, amount_llm_tokens: u64) -> Result<()> {
        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.authority,
            ErrorCode::InvalidAuthority
        );

        let hold: &Account<HoldAccount> = &ctx.accounts.hold;
        let config: &Account<ConfigAccount> = &ctx.accounts.config;

        let lamports_to_debit = amount_llm_tokens
            .checked_mul(config.rate_lamports)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        require!(
            hold.amount_lamports >= lamports_to_debit,
            ErrorCode::NotEnoughLamportsOnHold
        );

        // transfer sol from hold to authority
        **ctx.accounts.hold.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .hold
            .to_account_info()
            .lamports()
            .checked_sub(lamports_to_debit)
            .ok_or(ErrorCode::ArithmeticOverflow)?;
        **ctx.accounts.signer.try_borrow_mut_lamports()? = ctx
            .accounts
            .signer
            .lamports()
            .checked_add(lamports_to_debit)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        // close the hold account after successful debit
        let hold_starting_lamports = ctx.accounts.hold.to_account_info().lamports();
        **ctx.accounts.hold.to_account_info().try_borrow_mut_lamports()? = 0;
        **ctx.accounts.signer.try_borrow_mut_lamports()? = ctx
            .accounts
            .signer
            .lamports()
            .checked_add(hold_starting_lamports)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        Ok(())
    }

    pub fn release_hold(ctx: Context<ReleaseHold>) -> Result<()> {
        let hold: &Account<HoldAccount> = &ctx.accounts.hold;
        let clock = Clock::get()?;

        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.authority
                || (ctx.accounts.signer.key() == hold.escrow_authority
                    && clock.unix_timestamp - hold.created_at > ctx.accounts.config.hold_timeout_seconds),
            ErrorCode::InvalidAuthority
        );

        let hold_amount = hold.amount_lamports;

        // transfer sol back to escrow
        **ctx.accounts.hold.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .hold
            .to_account_info()
            .lamports()
            .checked_sub(hold_amount)
            .ok_or(ErrorCode::ArithmeticOverflow)?;
        **ctx.accounts.escrow.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .escrow
            .to_account_info()
            .lamports()
            .checked_add(hold_amount)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        let escrow: &mut Account<EscrowAccount> = &mut ctx.accounts.escrow;
        escrow.amount_lamports = escrow
            .amount_lamports
            .checked_add(hold_amount)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        // close the hold account after successful release
        let hold_starting_lamports = ctx.accounts.hold.to_account_info().lamports();
        **ctx.accounts.hold.to_account_info().try_borrow_mut_lamports()? = 0;
        **ctx.accounts.signer.try_borrow_mut_lamports()? = ctx
            .accounts
            .signer
            .lamports()
            .checked_add(hold_starting_lamports)
            .ok_or(ErrorCode::ArithmeticOverflow)?;

        Ok(())
    }

    pub fn set_storage_url(ctx: Context<SetStorageUrl>, url: Option<String>) -> Result<()> {
        let escrow: &mut Account<EscrowAccount> = &mut ctx.accounts.escrow;

        if url.is_none() {
            escrow.storage_url = None;
            return Ok(());
        }

        let url_string = url.clone().unwrap();
        let storage_url_as_bytes: &[u8] = url_string.as_bytes();
        require!(
            storage_url_as_bytes.len() <= URL_LENGTH,
            ErrorCode::InvalidUrl
        );

        let mut storage_url_fixed_size_array = [0u8; URL_LENGTH];
        storage_url_fixed_size_array[..storage_url_as_bytes.len()].copy_from_slice(storage_url_as_bytes);

        escrow.storage_url = Some(storage_url_fixed_size_array);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(rate_lamports: u64, hold_timeout_seconds: i64)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        space = ConfigAccount::LEN,
        seeds = [CONFIG_PDA_SEED],
        bump,
    )]
    pub config: Account<'info, ConfigAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(new_rate_lamports: u64)]
pub struct AdjustRate<'info> {
    #[account(
        mut, 
        constraint = signer.key() == config.authority @ ErrorCode::InvalidAuthority
    )]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub config: Account<'info, ConfigAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(amount_lamports: u64)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init_if_needed,
        payer = signer,
        space = EscrowAccount::LEN,
        seeds = [signer.key().as_ref()],
        bump,
    )]
    pub escrow: Account<'info, EscrowAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(amount_llm_tokens: u64)]
pub struct Hold<'info> {
    #[account(mut, constraint = signer.key() == config.authority @ ErrorCode::InvalidAuthority)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub escrow: Account<'info, EscrowAccount>,
    pub config: Account<'info, ConfigAccount>,
    #[account(
        init,
        payer = signer,
        space = HoldAccount::LEN,
        seeds = [escrow.key().as_ref(), &escrow.hold_counter.to_le_bytes()],
        bump
    )]
    pub hold: Account<'info, HoldAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(amount_llm_tokens: u64)]
pub struct Debit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        close = signer
    )]
    pub hold: Account<'info, HoldAccount>,
    pub config: Account<'info, ConfigAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ReleaseHold<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        close = signer
    )]
    pub hold: Account<'info, HoldAccount>,
    #[account(mut)]
    pub escrow: Account<'info, EscrowAccount>,
    pub config: Account<'info, ConfigAccount>,
    pub system_program: Program<'info, System>,
} 

#[derive(Accounts)]
#[instruction(url: Option<String>)]
pub struct SetStorageUrl<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub escrow: Account<'info, EscrowAccount>,
    #[account(mut, constraint = signer.key() == config.authority @ ErrorCode::InvalidAuthority)]
    pub config: Account<'info, ConfigAccount>,
    pub system_program: Program<'info, System>,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const U64_LENGTH: usize = 8;
const U8_LENGTH: usize = 1;
const I64_LENGTH: usize = 8;
const URL_LENGTH: usize = 200;
const OPTION_DISCRIMINATOR_LENGTH: usize = 1;

#[account]
pub struct ConfigAccount {
    pub authority: Pubkey,
    pub bump: u8,
    pub rate_lamports: u64,
    pub hold_timeout_seconds: i64,
}

impl ConfigAccount {
    const LEN: usize = DISCRIMINATOR_LENGTH 
        + PUBLIC_KEY_LENGTH // Authority
        + U8_LENGTH // Bump
        + U64_LENGTH // Rate lamports
        + I64_LENGTH; // Hold timeout seconds
}

#[account]
pub struct EscrowAccount {
    pub authority: Pubkey,
    pub bump: u8,
    pub amount_lamports: u64,
    pub hold_counter: u64,
    pub storage_url: Option<[u8; URL_LENGTH]>,
}

impl EscrowAccount {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Authority
        + U8_LENGTH // Bump
        + U64_LENGTH // Amount lamports
        + U64_LENGTH // Hold counter
        + OPTION_DISCRIMINATOR_LENGTH // Option discriminator
        + URL_LENGTH; // Fixed size byte array for URL
}

#[account]
pub struct HoldAccount {
    pub escrow_authority: Pubkey,
    pub amount_lamports: u64,
    pub created_at: i64,
    pub bump: u8,
}

impl HoldAccount {
    const LEN: usize = DISCRIMINATOR_LENGTH
     + PUBLIC_KEY_LENGTH // Escrow authority
     + U64_LENGTH // Amount lamports
     + I64_LENGTH // Created at
     + U8_LENGTH; // Bump
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid authority")]
    InvalidAuthority,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Not enough lamports on hold")]
    NotEnoughLamportsOnHold,
    #[msg("Arithmetic overflow")]
    ArithmeticOverflow,
    #[msg("Invalid URL")]
    InvalidUrl,
}
