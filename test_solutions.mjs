import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkbqefynjsngqdgifvbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYnFlZnluanNuZ3FkZ2lmdmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMDE3NDMsImV4cCI6MjA4OTU3Nzc0M30.Xa9CNCO4PmPBEK8gVOaZVYIKxFMEyE5GznWCYWzfbaw";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: solutions, error: solError } = await supabase.from("solutions").select("type_id, issue_id");
  const { data: issues, error: issError } = await supabase.from("issues").select("id, name");
  const { data: types, error: typError } = await supabase.from("types").select("id, name");

  if (solError || issError || typError) {
    console.log("Error:", solError, issError, typError);
    return;
  }

  const issueDict = {};
  issues.forEach(i => issueDict[i.id] = i.name);
  
  const typeDict = {};
  types.forEach(t => typeDict[t.id] = t.name);

  // Group by issue
  const mapping = {};
  solutions.forEach(s => {
    const iName = issueDict[s.issue_id] || s.issue_id;
    const tName = typeDict[s.type_id] || s.type_id;
    if (!mapping[iName]) mapping[iName] = new Set();
    mapping[iName].add(tName);
  });

  for (const [key, val] of Object.entries(mapping)) {
    console.log(`Issue '${key}' has solutions for Types: ${Array.from(val).join(", ")}`);
  }
}

test();
