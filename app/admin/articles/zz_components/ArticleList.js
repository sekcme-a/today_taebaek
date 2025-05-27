import { useState } from "react";
import { fetchArticlesWithPage, publishArticle } from "../service";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ArticleList = ({ page }) => {
  const queryClient = useQueryClient();
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles", page],
    queryFn: () => fetchArticlesWithPage(page),
  });
  const publishedMutation = useMutation({
    mutationFn: ({ id, isPublished }) => publishArticle(id, isPublished),
    onSuccess: () => queryClient.invalidateQueries(["articles", page]),
  });

  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchArticles(page);
  // }, [page]);
  // const fetchArticles = async (page) => {
  //   const articles = await fetchArticlesWithPage(page);
  //   setArticles(articles);
  //   setLoading(false);
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {articles?.map((article) => (
        <div
          key={article.id}
          className="p-4 border-b cursor-pointer 
            hover:bg-gray-400 hover:bg-opacity-50
              flex justify-between flex-col md:flex-row
            "
        >
          <Link href={`/admin/articles/${article.id}`} key={article.id}>
            <div>
              <h2 className="text-lg font-bold">{article.title}</h2>
              <p className="text-sm">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <div className="flex items-center">
                {article.is_headline && (
                  <p className="text-purple-300 mr-4 font-bold">헤드라인</p>
                )}
                {article.is_breaking_news && (
                  <p className="text-purple-300 mr-4 font-bold">속보</p>
                )}
                {article.is_editor_pick && (
                  <p className="text-purple-300 mr-4 font-bold">에디터 픽</p>
                )}
                {!article.category_id && (
                  <p className="text-red-300 mr-4 ">카테고리 없음</p>
                )}
                <p
                  className={`${
                    article.is_published ? "text-green-300" : "text-red-300"
                  } mr-4`}
                >
                  {article.is_published ? "게제 중" : "미게재"}
                </p>
                {!article.images ||
                  (article.images.length === 0 && (
                    <p className="text-red-300">이미지 없음</p>
                  ))}
              </div>
            </div>
          </Link>
          <div className="mt-4">
            <Button
              onClick={() =>
                publishedMutation.mutate({
                  id: article.id,
                  isPublished: article.is_published,
                })
              }
              disabled={publishedMutation.isPending}
            >
              {article.is_published ? "게재 취소" : "게재하기"}
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ArticleList;
