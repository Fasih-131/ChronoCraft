import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export null if keys aren't set so the app can fallback to mock data if needed during setup
export const supabase = (supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_URL_HERE') 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
