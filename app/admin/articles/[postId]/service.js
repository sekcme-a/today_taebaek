"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export const fetchArticlesImages = async (id) => {
  console.log("asdf");
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("articles")
    .select("images")
    .eq("id", id)
    .single();

  handleError(error);

  if (error) throw error;

  return data.images || [];
};

export const updateArticlesImages = async (id, imageUrls) => {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("articles")
    .update({ images: imageUrls })
    .eq("id", id);

  if (error) throw error;
};

// ISO8601 UTC 포맷으로 변환 (명확한 시각을 붙여서 Supabase에 저장)
const toIsoData = (dateString) => {
  const isoDate = new Date(dateString + "T00:00:00Z").toISOString();
  return isoDate;
};

export const insertArticle = async ({
  title,
  subtitle,
  author,
  createdAt,
  content,
  isHeadline,
  isPublished,
  selectedCategory,
  isEditorPick,
  isBreakingNews,
}) => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title,
      subtitle,
      author,
      ...(createdAt && { created_at: toIsoData(createdAt) }),
      content,
      is_headline: isHeadline,
      is_published: isPublished,
      thumbnail_text: content.slice(
        0,
        Math.floor(Math.random() * (125 - 75 + 1)) + 70
      ),
      category_id: selectedCategory,
      is_editor_pick: isEditorPick,
      is_breaking_news: isBreakingNews,
    })
    .select("id");

  handleError(error);

  return data[0].id;
};

export const updateArticle = async ({
  id,
  title,
  subtitle,
  author,
  createdAt,
  content,
  isHeadline,
  isPublished,
  selectedCategory,
  isBreakingNews,
  isEditorPick,
}) => {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("articles")
    .update({
      title,
      subtitle,
      author,
      created_at: toIsoData(createdAt),
      content,
      is_headline: isHeadline,
      is_published: isPublished,
      thumbnail_text: content.slice(
        0,
        Math.floor(Math.random() * (125 - 75 + 1)) + 70
      ),
      category_id: selectedCategory,
      is_editor_pick: isEditorPick,
      is_breaking_news: isBreakingNews,
    })
    .eq("id", id);

  handleError(error);
};

export const fetchArticle = async (id) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  handleError(error);

  return data;
};
export const deleteArticle = async (id) => {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);

  handleError(error);
};
