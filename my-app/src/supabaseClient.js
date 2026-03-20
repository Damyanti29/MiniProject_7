import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkbqefynjsngqdgifvbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYnFlZnluanNuZ3FkZ2lmdmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMDE3NDMsImV4cCI6MjA4OTU3Nzc0M30.Xa9CNCO4PmPBEK8gVOaZVYIKxFMEyE5GznWCYWzfbaw";

export const supabase = createClient(supabaseUrl, supabaseKey);