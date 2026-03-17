import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — client is created on first use, not at module load time.
// This prevents build-time crashes when env vars are only available at runtime.
let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_URL");
  if (!key) throw new Error("Missing env var: SUPABASE_SERVICE_ROLE_KEY");

  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

// Convenience proxy — keeps all existing `supabaseAdmin.from(...)` calls working unchanged.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseAdmin() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
