import { supabase } from "../supabaseClient";
const API_KEY = "AIzaSyAmRHj3emnzhpmCXPpB91Guvliy_1dbKQA";
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

export const getYoutubeVideos = async (query) => {
  try {
    const API_KEY = "AIzaSyDpAE3yppNYxlRnOrM4Jg1YGc_rYCNek1A";

    if (!API_KEY) {
      throw new Error("API key missing");
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=6&type=video`
    );

    const data = await res.json();

    if (data.error) {
      console.error("YouTube API Error:", data.error.message);
      return { data: null, error: data.error };
    }

    return { data: data.items, error: null };

  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error };
  }
};

// 🎯 Filter + Rank
export const processVideos = (videos) => {
  return videos
    .filter(v => {
      const title = v.snippet.title.toLowerCase();
      return (
        !title.includes("shorts") &&
        !title.includes("reaction") &&
        v.snippet.thumbnails
      );
    })
    .sort((a, b) => {
      const score = (v) => {
        let s = 0;
        const title = v.snippet.title.toLowerCase();

        if (title.includes("dermatologist")) s += 3;
        if (title.includes("routine")) s += 2;
        if (title.includes("treatment")) s += 2;

        return s;
      };
      return score(b) - score(a);
    })
    .slice(0, 4);
};