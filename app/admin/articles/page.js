"use client";

import { Button } from "@material-tailwind/react";
import ArticleList from "./zz_components/ArticleList";
import Pagination from "./zz_components/Pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Articles = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">기사 관리</h1>
      <Button
        className="mt-4"
        onClick={() => router.push("/admin/articles/new")}
      >
        새 기사 작성
      </Button>
      <div className="mt-4" />
      {/* <Suspense fallback={<div>데이터를 받아오고 있습니다...</div>}>
        <ArticleList />
      </Suspense> */}

      <ArticleList page={page} />
      <Pagination {...{ page, setPage }} />
    </div>
  );
};

export default Articles;
