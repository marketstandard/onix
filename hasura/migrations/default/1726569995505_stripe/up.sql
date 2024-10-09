-- Create table to store subscription statuses
CREATE TABLE subscription_statuses (
    value text PRIMARY KEY,
    description text NULL
);

INSERT INTO subscription_statuses (value, description) VALUES
('incomplete', NULL),
('incomplete_expired', NULL),
('trialing', NULL),
('active', NULL),
('past_due', NULL),
('canceled', NULL),
('unpaid', NULL);

-- Create table to store invoice statuses
CREATE TABLE invoice_statuses (
    value text PRIMARY KEY,
    description text NULL
);

INSERT INTO invoice_statuses (value, description) VALUES
('draft', NULL),
('open', NULL),
('paid', NULL),
('uncollectible', NULL),
('void', NULL);

CREATE TABLE checkout_session_statuses (
    value text PRIMARY KEY,
    description text NULL
);

INSERT INTO checkout_session_statuses (value, description) VALUES
('complete', NULL),
('expired', NULL),
('open', NULL);

-- Create table to store subscriptions
CREATE TABLE subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    stripe_subscription_id text NOT NULL,
    user_id uuid NOT NULL,
    status text NOT NULL REFERENCES subscription_statuses(value) ON UPDATE RESTRICT ON DELETE RESTRICT,
    start_date timestamptz NOT NULL,
    current_period_start timestamptz NOT NULL,
    current_period_end timestamptz NOT NULL,
    cancel_at_period_end boolean DEFAULT false,
    canceled_at timestamptz,
    trial_start timestamptz,
    trial_end timestamptz,
    metadata jsonb,
    PRIMARY KEY (id),
    UNIQUE (stripe_subscription_id)
);

-- Create table to store invoices
CREATE TABLE invoices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    stripe_invoice_id text NOT NULL,
    user_id uuid NOT NULL,
    subscription_id uuid,
    status text NOT NULL REFERENCES invoice_statuses(value) ON UPDATE RESTRICT ON DELETE RESTRICT,
    amount_due integer NOT NULL,
    amount_paid integer NOT NULL,
    amount_remaining integer NOT NULL,
    attempted boolean NOT NULL,
    attempt_count integer NOT NULL,
    paid boolean NOT NULL,
    created timestamptz NOT NULL,
    due_date timestamptz,
    hosted_invoice_url text,
    invoice_pdf text,
    metadata jsonb,
    PRIMARY KEY (id),
    UNIQUE (stripe_invoice_id)
);

-- Create table to store checkout sessions
CREATE TABLE checkout_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    stripe_checkout_session_id text NOT NULL,
    user_id uuid NOT NULL,
    subscription_id uuid,
    stripe_customer_id text NOT NULL,
    stripe_subscription_id text,
    stripe_invoice_id text,
    status text NOT NULL,
    mode text,
    amount_total integer,
    currency text,
    metadata jsonb,
    PRIMARY KEY (id),
    UNIQUE (stripe_checkout_session_id)
);

-- Add foreign key constraints
ALTER TABLE ONLY subscriptions
    ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY invoices
    ADD CONSTRAINT invoices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY invoices
    ADD CONSTRAINT invoices_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON UPDATE RESTRICT ON DELETE SET NULL;

ALTER TABLE checkout_sessions
    ADD CONSTRAINT checkout_sessions_status_fkey FOREIGN KEY (status) REFERENCES checkout_session_statuses(value) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY checkout_sessions
  ADD CONSTRAINT checkout_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY checkout_sessions
  ADD CONSTRAINT checkout_sessions_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON UPDATE RESTRICT ON DELETE CASCADE;

-- Optional: Create indexes to improve query performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions (user_id);
CREATE INDEX idx_invoices_user_id ON invoices (user_id);
CREATE INDEX idx_checkout_sessions_user_id ON checkout_sessions (user_id);

CREATE TRIGGER set_public_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_subscriptions_updated_at ON public.subscriptions IS 'Trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_public_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_invoices_updated_at ON public.invoices IS 'Trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_public_checkout_sessions_updated_at
BEFORE UPDATE ON public.checkout_sessions
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_checkout_sessions_updated_at ON public.checkout_sessions IS 'Trigger to set value of column "updated_at" to current timestamp on row update';