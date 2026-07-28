REVOKE ALL ON public.lead_throttle FROM anon;
REVOKE ALL ON public.lead_throttle FROM authenticated;
GRANT ALL ON public.lead_throttle TO service_role;