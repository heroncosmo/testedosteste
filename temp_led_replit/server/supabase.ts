import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jeiuatygpnisjxlemgpe.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaXVhdHlncG5pc2p4bGVtZ3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTQzNzYsImV4cCI6MjA2MzY3MDM3Nn0.MDEn6jlAr5gOQj-3zDyXih7jcsvKaZX9bVG6sse-BkA';

export const supabase = createClient(supabaseUrl, supabaseKey);