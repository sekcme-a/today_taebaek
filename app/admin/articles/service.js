"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export const fetchArticlesWithPage = async (page) => {
  const PAGE_SIZE = 10;
  console.log("asdf", page);
  const supabase = await createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from("articles")
    .select()
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
  return data;
};

export const fetchPageCount = async () => {
  const supabase = await createBrowserSupabaseClient();
  const { count } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });
  return Math.ceil(count / 10);
};

export const publishArticle = async (postId, isPublished) => {
  const supabase = await createBrowserSupabaseClient();
  const { error } = await supabase
    .from("articles")
    .update({ is_published: !isPublished })
    .eq("id", postId);

  if (error) throw error;
};
