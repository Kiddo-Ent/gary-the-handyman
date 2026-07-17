import { createClient } from "@supabase/supabase-js";

console.log("====================================");
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "SERVICE KEY STARTS:",
  process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20)
);
console.log("====================================");

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);