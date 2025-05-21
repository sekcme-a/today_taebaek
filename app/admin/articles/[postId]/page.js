"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DragDropZone from "@/components/DragDropZone";
import {
  deleteArticle,
  fetchArticle,
  fetchArticlesImages,
  insertArticle,
  updateArticle,
  updateArticlesImages,
} from "./service";
import { deleteImages, uploadImages } from "@/actions/storageActions";
import { Input } from "@material-tailwind/react";
import InputForm from "./components/InputForm";
import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../settings/category/service";
import { Checkbox } from "@material-tailwind/react";

const EditPostPage = () => {
  const router = useRouter();
  const { postId } = useParams();
  const imageRef = useRef([]);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const [initialImages, setInitialImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("심수연 기자 bkshim21s@naver.com");
  const [createdAt, setCreatedAt] = useState(
    new Date().toISOString().slice(0, 10)
  ); // YYYY-MM-DD 형식
  const [content, setContent] = useState("");
  const [selectedCategory, setselectedCategory] = useState({});
  const [isHeadline, setIsHeadline] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [isEditorPick, setIsEditorPick] = useState(false);
  const [isBreakingNews, setIsBreakingNews] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        if (postId !== "new") {
          const articleData = await fetchArticle(postId);
          setTitle(articleData.title);
          setSubtitle(articleData.subtitle);
          setAuthor(articleData.author);
          setCreatedAt(articleData.created_at.slice(0, 10));
          setContent(articleData.content);
          setIsHeadline(articleData.is_headline);
          setIsPublished(articleData.is_published);
          setselectedCategory(articleData.category_id);
          setIsEditorPick(articleData.is_editor_pick);
          setIsBreakingNews(articleData.is_breaking_news);

          const urls = await fetchArticlesImages(postId);
          const formatted = urls.map((url) => ({ url, id: url }));
          setInitialImages(formatted);
          imageRef.current = formatted;
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
        alert("없는 게시물입니다.");
        router.back();
      }
    };
    load();
  }, [postId]);

  const handleImageChange = (files) => {
    imageRef.current = files;
  };

  const handleSave = async () => {
    if (!title || !author || !createdAt || !content) {
      alert("제목, 기자, 작성일, 내용을 모두 입력해주세요.");
      return;
    }
    if (!selectedCategory || selectedCategory?.length === 0) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    setSubmitting(true);
    let currentPostId = postId;
    if (currentPostId === "new") {
      const newPostId = await insertArticle({
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
      }).catch((e) => {
        alert("실패: " + e.message);
        return;
      });
      currentPostId = newPostId;
    } else {
      await updateArticle({
        id: currentPostId,
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
      }).catch((e) => {
        alert("실패: " + e.message);
      });

      setSubmitting(false);
    }

    const current = imageRef.current;
    const newFiles = current.filter((f) => f.file);
    const remainingUrls = current.filter((f) => !f.file).map((f) => f.url);
    const deleted = initialImages
      .filter((f) => !remainingUrls.includes(f.url))
      .map((f) => f.url);

    try {
      const uploaded = await uploadImages({
        files: newFiles,
        folder: `/admin/articles/${currentPostId}`,
      });
      const allUrls = [...remainingUrls, ...uploaded.map((f) => f.url)];

      if (deleted.length) await deleteImages(deleted);
      await updateArticlesImages(currentPostId, allUrls);

      if (postId === "new") router.replace(`/admin/articles/${currentPostId}`);
    } catch (e) {
      alert("실패: " + e.message);
    }
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      await deleteArticle(postId);
      await deleteImages(initialImages.map((f) => f.url));
      router.back();
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">
        게시물 {postId === "new" ? "작성" : "수정"}
      </h1>

      <div className="flex flex-wrap items-center">
        <p className="text-md font-bold mr-3">카테고리 선택</p>
        {categories?.map((cat) => (
          <div key={cat.id} className="flex items-center mr-5">
            <Checkbox
              checked={selectedCategory === cat.id}
              onChange={() => setselectedCategory(cat.id)}
            />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
      <InputForm
        {...{
          title,
          subtitle,
          author,
          createdAt,
          content,
          setTitle,
          setSubtitle,
          setAuthor,
          setCreatedAt,
          setContent,
          isHeadline,
          setIsHeadline,
          isPublished,
          setIsPublished,
          isEditorPick,
          setIsEditorPick,
          isBreakingNews,
          setIsBreakingNews,
        }}
      />
      <p className="text-sm">*첫번째 사진이 썸네일로 등록됩니다.</p>
      <DragDropZone
        initialFiles={initialImages}
        onChange={handleImageChange}
        maxMB={3}
      />
      <Button
        onClick={handleSave}
        fullWidth
        style={{ marginTop: "2rem" }}
        disabled={submitting}
      >
        {submitting ? "저장 중..." : "저장"}
      </Button>
      {postId !== "new" && (
        <Button
          onClick={handleDelete}
          fullWidth
          style={{ marginTop: "1rem" }}
          color="red"
        >
          기사 삭제
        </Button>
      )}
    </div>
  );
};

export default EditPostPage;
