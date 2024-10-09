SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;

CREATE TABLE accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "provider_account_id" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "user_id" uuid NOT NULL
);
 
CREATE TABLE sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "session_token" text NOT NULL,
    "user_id" uuid NOT NULL,
    expires timestamptz NOT NULL
);
 
CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text,
    email text NOT NULL,
    "email_verified" timestamptz,
    image text,
    stripe_customer_id text
);
 
CREATE TABLE verification_tokens (
    token text NOT NULL,
    identifier text NOT NULL,
    expires timestamptz NOT NULL
);
 
CREATE TABLE provider_type (
    value text NOT NULL
);
 
ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
 
ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY ("session_token");
 
ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_stripe_customer_id_key UNIQUE (stripe_customer_id);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 
ALTER TABLE ONLY verification_tokens
    ADD CONSTRAINT verification_tokens_pkey PRIMARY KEY (token);
 
ALTER TABLE ONLY provider_type
    ADD CONSTRAINT provider_type_pkey PRIMARY KEY (value);
 
ALTER TABLE ONLY accounts
    ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 
ALTER TABLE ONLY sessions
    ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 
INSERT INTO provider_type (value) VALUES ('credentials'), ('email'), ('oauth'), ('oidc');
 
ALTER TABLE ONLY accounts
    ADD CONSTRAINT "accounts_type_fkey" FOREIGN KEY ("type") REFERENCES public.provider_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;

CREATE TRIGGER set_public_accounts_updated_at
BEFORE UPDATE ON public.accounts
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_accounts_updated_at ON public.accounts IS 'Trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_public_sessions_updated_at
BEFORE UPDATE ON public.sessions
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_sessions_updated_at ON public.sessions IS 'Trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_public_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'Trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_public_verification_tokens_updated_at
BEFORE UPDATE ON public.verification_tokens
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

COMMENT ON TRIGGER set_public_verification_tokens_updated_at ON public.verification_tokens IS 'Trigger to set value of column "updated_at" to current timestamp on row update';