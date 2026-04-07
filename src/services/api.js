import { supabase } from "../supabaseClient";

// Fetch all categories (Skin, Hair, etc.)
export const getCategories = async () => {
  return await supabase.from("categories").select("*");
};

// Fetch types dependent on the chosen category
export const getTypes = async (categoryId) => {
  return await supabase
    .from("types")
    .select("*")
    .eq("category_id", categoryId);
};

// Fetch issues dependent on the chosen category
export const getIssues = async (categoryId) => {
  return await supabase
    .from("issues")
    .select("*")
    .eq("category_id", categoryId);
};

// Fetch the specific solution and its deeply nested products
export const getSolution = async (categoryId, typeId, issueId) => {
  return await supabase
    .from("solutions")
    .select(`
      remedy,
      solution_products (
        products (
          id,
          name,
          brand,
          price,
          image_url,
          link
        )
      )
    `)
    .eq("category_id", categoryId)
    .eq("type_id", typeId)
    .eq("issue_id", issueId);
};