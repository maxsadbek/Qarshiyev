/**
 * src/types/database.ts
 * Supabase database type. Replace with `supabase gen types typescript` output
 * once the Supabase schema is finalized. Kept minimal so the client compiles.
 */

export interface Database {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
    CompositeTypes: Record<string, unknown>;
  };
}
