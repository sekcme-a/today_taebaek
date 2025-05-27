"use client";

import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  return (
    <div className="p-4">
      <Button onClick={() => router.push("/admin/articles")}>기사 관리</Button>
      <Button
        onClick={() => router.push("/admin/articles/bodo")}
        className="ml-4"
      >
        보도자료 추출
      </Button>
      <Button
        onClick={() => router.push("/admin/settings/category")}
        className="ml-4"
      >
        카테고리 관리
      </Button>
      <Button
        onClick={() => router.push("/admin/settings/mainpage")}
        className="ml-4"
      >
        메인페이지 관리
      </Button>
      <Button onClick={() => router.push("/admin/routine")} className="ml-4">
        평일 루틴
      </Button>
      <Button
        onClick={() => router.push("/admin/crawling/ansan")}
        className="ml-4"
      >
        안산인터넷뉴스 업로드
      </Button>
      <Button
        onClick={() => router.push("/admin/crawling")}
        className="ml-4"
        color=""
      >
        시흥인터넷뉴스 업로드
      </Button>
    </div>
  );
}
