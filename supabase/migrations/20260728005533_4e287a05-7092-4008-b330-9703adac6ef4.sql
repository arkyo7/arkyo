-- 1) Additive columns on public.leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS package text,
  ADD COLUMN IF NOT EXISTS submission_id uuid,
  ADD COLUMN IF NOT EXISTS internal_email_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS customer_email_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS internal_email_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_email_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS internal_email_provider_id text,
  ADD COLUMN IF NOT EXISTS customer_email_provider_id text,
  ADD COLUMN IF NOT EXISTS internal_email_error text,
  ADD COLUMN IF NOT EXISTS customer_email_error text,
  ADD COLUMN IF NOT EXISTS internal_email_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS customer_email_attempts integer NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX IF NOT EXISTS leads_submission_id_key
  ON public.leads (submission_id) WHERE submission_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS leads_email_created_at_idx
  ON public.leads (email, created_at DESC);

-- 2) Content constraints (NOT VALID: applies to new rows only, existing data untouched)
ALTER TABLE public.leads
  ADD CONSTRAINT leads_content_check CHECK (
    char_length(name) BETWEEN 2 AND 80
    AND char_length(email) BETWEEN 5 AND 120
    AND phone ~ '^\+[1-9][0-9]{6,17}$'
    AND char_length(message) BETWEEN 10 AND 1000
    AND char_length(project_type) BETWEEN 1 AND 60
    AND char_length(budget) BETWEEN 1 AND 60
    AND char_length(deadline) BETWEEN 1 AND 60
    AND language IN ('pt','en','fr')
    AND (company IS NULL OR char_length(company) <= 80)
    AND (instagram IS NULL OR char_length(instagram) <= 60)
    AND (package IS NULL OR char_length(package) <= 60)
    AND internal_email_status IN ('pending','sent','failed','skipped')
    AND customer_email_status IN ('pending','sent','failed','skipped')
  ) NOT VALID;

-- 3) Lock down anonymous direct writes; submissions now go through the server only
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
REVOKE ALL ON public.leads FROM anon;
REVOKE ALL ON public.leads FROM authenticated;
GRANT ALL ON public.leads TO service_role;

-- 4) Rate-limit ledger (server-only, no public policies)
CREATE TABLE IF NOT EXISTS public.lead_throttle (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.lead_throttle TO service_role;
ALTER TABLE public.lead_throttle ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS lead_throttle_ip_created_idx
  ON public.lead_throttle (ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS lead_throttle_created_idx
  ON public.lead_throttle (created_at);