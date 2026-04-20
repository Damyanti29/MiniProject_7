import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkbqefynjsngqdgifvbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYnFlZnluanNuZ3FkZ2lmdmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMDE3NDMsImV4cCI6MjA4OTU3Nzc0M30.Xa9CNCO4PmPBEK8gVOaZVYIKxFMEyE5GznWCYWzfbaw";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from("issues").select("id, name");
  const names = data.map(d => d.name);
  console.log("Issue names:", JSON.stringify(names, null, 2));
}

test();
