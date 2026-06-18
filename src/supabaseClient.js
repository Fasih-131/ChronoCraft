import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client = null;

try {
  // Only attempt to initialize if BOTH keys are present and valid
  if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL_HERE') {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } else if (supabaseUrl || supabaseAnonKey) {
    console.warn("Supabase initialization skipped: Missing one or more VITE_ environment variables.");
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
}

export const supabase = client;
