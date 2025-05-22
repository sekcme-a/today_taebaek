"use client";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AnsanRoom from "./componets/AnsanRoom";

const todayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
export default function CrawledLinks() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(todayDate());
  const [end, setEnd] = useState(todayDate());
  const [loading, setLoading] = useState(false);

  const [openRoom, setOpenRoom] = useState(false);

  const handleCrawl = async () => {
    if (new Date(start) > new Date(end)) {
      alert("시작일이 종료일보다 큽니다.");
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/ansan?start=${start}&end=${end}`);
    const data = await res.json();
    console.log(data);
    setPosts(data.articles);
    setLoading(false);
  };

  if (openRoom) return <AnsanRoom setOpenRoom={setOpenRoom} posts={posts} />;
  return (
    <div className="p-5">
      <p>형식에 맞게! 입력해주세요.</p>
      <div className="mt-2" />
      <Input
        label="시작"
        placeholder="2025-09-13"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <div className="mt-4" />
      <Input
        label="끝"
        placeholder="2025-09-13"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <div className="mt-4" />
      <Button
        onClick={() =>
          window.open(
            "http://www.asinews.co.kr/adm/news/addArticleForm.do?vStartP=123415184",
            "_blank"
          )
        }
        fullWidth
        style={{ marginBottom: 10 }}
      >
        기사 등록 페이지 열기
      </Button>
      <Button onClick={handleCrawl} fullWidth disabled={loading}>
        {loading ? "받아오는 중 " : "크롤링"}
      </Button>
      <h1 className="text-2xl font-bold mt-10">크롤링된 링크</h1>
      <p>총{posts?.length}개</p>
      <ul>
        {posts.map((post, idx) => (
          <li key={idx} className="py-5">
            {/* <strong>{link.text}</strong>
            <br />
            <code>{link.onClick}</code> */}
            <p>{post.title}</p>
            {/* <p>{post.content}</p>
            <p>{post.images[0]}</p> */}
          </li>
        ))}
      </ul>
      {posts.length > 0 && (
        <Button onClick={() => setOpenRoom(true)} fullWidth>
          이동
        </Button>
      )}
    </div>
  );
}
