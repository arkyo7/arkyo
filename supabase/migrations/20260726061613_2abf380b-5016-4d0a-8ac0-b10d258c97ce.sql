CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  company text,
  phone text NOT NULL,
  email text NOT NULL,
  instagram text,
  project_type text NOT NULL,
  budget text NOT NULL,
  deadline text NOT NULL,
  message text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  language text NOT NULL DEFAULT 'pt',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon;
GRANT INSERT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent = true
  AND status = 'new'
  AND char_length(name) BETWEEN 2 AND 80
  AND char_length(email) BETWEEN 5 AND 120
  AND email ~* '^[^@\s]+@[^@\s]+\.[a-z]{2,}$'
  AND phone ~ '^\+[1-9][0-9]{6,17}$'
  AND char_length(message) BETWEEN 10 AND 1000
  AND char_length(project_type) BETWEEN 1 AND 60
  AND char_length(budget) BETWEEN 1 AND 60
  AND char_length(deadline) BETWEEN 1 AND 60
  AND language IN ('pt','en','fr')
  AND (company IS NULL OR char_length(company) <= 80)
  AND (instagram IS NULL OR char_length(instagram) <= 60)
);

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);