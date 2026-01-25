
import { createClient } from '@supabase/supabase-js';

// NOTA: In un ambiente di produzione reale, questi verrebbero caricati da process.env
// Per questa demo, assumiamo che le chiavi siano gestite correttamente dal sistema.
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
