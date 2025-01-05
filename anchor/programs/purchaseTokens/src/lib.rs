use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};

declare_id!("8WTBR9PBTWcrWV6zntn5Rt5RYFcwMfNnMQsi3XgiGhZr");

const CONFIG_PDA_SEED: &[u8] = b"config";

#[program]
pub mod purchase_tokens {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>, rate: u64, bump: u8) -> Result<()> {
        let config: &mut Account<Config> = &mut ctx.accounts.config;

        config.mint = ctx.accounts.mint.key();
        config.authority = ctx.accounts.authority.key();
        config.rate_lamports = rate;
        config.bump = bump;

        Ok(())
    }

    pub fn set_rate(ctx: Context<SetRate>, new_rate_lamports: u64) -> Result<()> {
        let config: &mut Account<Config> = &mut ctx.accounts.config;

        require!(
            ctx.accounts.authority.key() == config.authority,
            ErrorCode::InvalidAuthority
        );

        config.rate_lamports = new_rate_lamports;

        Ok(())
    }

    pub fn fund(ctx: Context<Fund>, amount: u64) -> Result<()> {
        let config: &mut Account<Config> = &mut ctx.accounts.config;

        require!(
            ctx.accounts.authority.key() == config.authority,
            ErrorCode::InvalidAuthority
        );

        config.escrow = ctx.accounts.escrow.key();

        transfer(ctx.accounts.into_transfer_ctx(), amount)?;

        Ok(())
    }

    pub fn swap(ctx: Context<Swap>, amount: u64) -> Result<()> {
        let rate_lamports = ctx.accounts.config.rate_lamports;
        let amount_lamports = rate_lamports * amount;

        // transfer lamports to the authority
        invoke(
            &system_instruction::transfer(
                &ctx.accounts.authority.key(),
                &ctx.accounts.config.authority,
                amount_lamports,
            ),
            &[
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.owner.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // transfer $ONIX to the authority
        let transfer_ctx = ctx.accounts.clone();
        transfer(
            transfer_ctx
                .into_transfer_ctx()
                .with_signer(&[&[CONFIG_PDA_SEED, &[ctx.accounts.config.bump]]]),
            amount,
        )?;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let transfer_ctx = ctx.accounts.clone();
        transfer(
            transfer_ctx
                .into_transfer_ctx()
                .with_signer(&[&[CONFIG_PDA_SEED, &[ctx.accounts.config.bump]]]),
            amount,
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(rate: u64, bump: u8)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    pub mint: Account<'info, Mint>,
    #[account(
        init,
        payer = authority,
        space = Config::LEN,
        seeds = [CONFIG_PDA_SEED],
        bump,
    )]
    pub config: Account<'info, Config>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = authority,
    )]
    pub authority_token_account: Account<'info, TokenAccount>,
}

#[derive(Accounts)]
#[instruction(new_rate_lamports: u64)]
pub struct SetRate<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [CONFIG_PDA_SEED],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct Fund<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [CONFIG_PDA_SEED],
        bump = config.bump,
        constraint = config.authority == authority.key() @ ErrorCode::InvalidAuthority,
    )]
    pub config: Account<'info, Config>,
    pub mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = config,
    )]
    pub escrow: Account<'info, TokenAccount>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = authority,
    )]
    pub authority_token_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl<'info> Fund<'info> {
    fn into_transfer_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_accounts = Transfer {
            authority: self.authority.to_account_info(),
            from: self.authority_token_account.to_account_info(),
            to: self.escrow.to_account_info(),
        };

        CpiContext::new(cpi_program, cpi_accounts)
    }
}

#[derive(Accounts, Clone)]
#[instruction(amount: u64)]
pub struct Swap<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub config: Account<'info, Config>,
    #[account(
        mut,
        associated_token::mint = config.mint,
        associated_token::authority = config,
    )]
    pub escrow: Account<'info, TokenAccount>,
    #[account(mut, constraint = config.mint == mint.key() @ ErrorCode::InvalidMint)]
    pub mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = authority,
    )]
    pub authority_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = owner.key() == config.authority @ ErrorCode::InvalidAuthority,
    )]
    /// CHECK: Using the constraint above, we verify that the pubkey of this account matches the auction authority
    pub owner: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl<'info> Swap<'info> {
    fn into_transfer_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_accounts = Transfer {
            authority: self.config.to_account_info(),
            from: self.escrow.to_account_info(),
            to: self.authority_token_account.to_account_info(),
        };

        CpiContext::new(cpi_program, cpi_accounts)
    }
}

#[derive(Accounts, Clone)]
#[instruction(amount: u64)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        constraint = authority.key() == config.authority @ ErrorCode::InvalidOwner,
    )]
    pub authority: Signer<'info>,
    #[account(
        seeds = [CONFIG_PDA_SEED],
        bump = config.bump,
        constraint = config.authority == authority.key() @ ErrorCode::InvalidOwner,
    )]
    pub config: Account<'info, Config>,
    #[account(
        mut,
        associated_token::mint = config.mint,
        associated_token::authority = config,
    )]
    pub escrow: Account<'info, TokenAccount>,
    #[account(
        mut,
        associated_token::mint = config.mint,
        associated_token::authority = config.authority,
    )]
    pub authority_token_account: Account<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> Withdraw<'info> {
    fn into_transfer_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_accounts = Transfer {
            authority: self.config.to_account_info(),
            from: self.authority_token_account.to_account_info(),
            to: self.escrow.to_account_info(),
        };

        CpiContext::new(cpi_program, cpi_accounts)
    }
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const U64_LENGTH: usize = 8;
const U8_LENGTH: usize = 1;

#[account]
pub struct Config {
    pub mint: Pubkey,
    pub authority: Pubkey,
    pub escrow: Pubkey,
    pub rate_lamports: u64,
    pub bump: u8,
}

impl Config {
    const LEN: usize = DISCRIMINATOR_LENGTH // discriminator
        + PUBLIC_KEY_LENGTH // authority
        + PUBLIC_KEY_LENGTH // mint
        + PUBLIC_KEY_LENGTH // escrow
        + U64_LENGTH // rate
        + U8_LENGTH; // bump
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid authority")]
    InvalidAuthority,
    #[msg("Invalid owner")]
    InvalidOwner,
    #[msg("Invalid mint")]
    InvalidMint,
}
