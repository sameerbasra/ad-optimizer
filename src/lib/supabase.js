import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://safkwoziagpkxxliedow.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZmt3b3ppYWdwa3h4bGllZG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNDAzMDcsImV4cCI6MjA5MjcxNjMwN30.lYhROJoP6WxrsEoDf7KW8JPYEeXJnDfW7fIzlahhw4k"

export const supabase = createClient(supabaseUrl, supabaseKey)