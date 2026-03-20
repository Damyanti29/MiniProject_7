import { supabase } from "../supabaseClient";

export const getCategories = () =>
  supabase.from("categories").select("*");

export const getTypes = (categoryId) =>
  supabase.from("types").select("*").eq("category_id", categoryId);

export const getIssues = (categoryId) =>
  supabase.from("issues").select("*").eq("category_id", categoryId);


    export const getSolution = async (categoryId, typeId, issueId) => {
  return await supabase
    .from("solutions")
    .select(`
      remedy,
      solution_products (
        products (
          name,
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