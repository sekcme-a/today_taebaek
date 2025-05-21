"use client";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Room from "./componets/Room";

export default function CrawledLinks() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState("2025-05-21");
  const [end, setEnd] = useState("2025-05-21");
  const [loading, setLoading] = useState(false);

  const [openRoom, setOpenRoom] = useState(false);

  const handleCrawl = async () => {
    setLoading(true);
    const res = await fetch(`/api/crawl?start=${start}&end=${end}`);
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
  };

  if (openRoom) return <Room setOpenRoom={setOpenRoom} posts={posts} />;
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
