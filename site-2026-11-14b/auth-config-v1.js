/* auth-config-v1.js — public, non-secret sign-in config for tkhub.app/account/ (Nov 13).
   Apple and X sign-in go through Supabase Auth (it does the provider token exchange a static site cannot do).
   Fill these in only after the provider is set up and tested (HANDOFF H22). All three values are public by design:
   the project URL, the project's publishable "anon" key (the one Supabase says is safe in a browser; never the
   service_role key), and which providers are switched on. Empty = Apple and X stay visibly off. */
window.TK_AUTH_CFG = window.TK_AUTH_CFG || {
  supabaseUrl: "",          /* e.g. "https://<project-ref>.supabase.co" */
  anonKey: "",              /* the project's anon / publishable key */
  providers: []             /* add "apple" and/or "x" once each one works end to end */
};
