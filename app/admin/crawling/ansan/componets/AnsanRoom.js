import { Button } from "@material-tailwind/react";
import { useState } from "react";

const AnsanRoom = ({ setOpenRoom, posts }) => {
  const [page, setPage] = useState(0);

  function cleanText(raw) {
    let text = raw;

    // 1. "사진 확대보기" 이후 첫 줄글자 나올 때까지 줄바꿈 제거
    const photoIndex = text.indexOf("사진 확대보기");
    if (photoIndex !== -1) {
      const before = text.slice(0, photoIndex);
      let after = text.slice(photoIndex + "사진 확대보기".length);

      // 줄바꿈/공백/탭만 제거하고, 첫 문장 시작 지점 찾기
      const firstContentMatch = after.match(/[^\n\s]/); // 처음으로 줄바꿈/공백 아닌 문자
      if (firstContentMatch) {
        const firstContentIndex = after.indexOf(firstContentMatch[0]);
        after = after.slice(firstContentIndex); // 그 이후부터 사용
        text = before + after; // 다시 조합
      }
    }

    // 2. &nbsp; → 일반 공백
    text = text.replace(/&nbsp;/g, " ");

    // 3. 줄바꿈 3번 이상 → 2번으로
    text = text.replace(/\n{3,}/g, "\n\n");

    // 4. "줄바꿈 + 담당부서 + 줄바꿈" 이후는 삭제
    text = text.replace(/\n담당부서\n[\s\S]*/g, "");

    return text.trim(); // 앞뒤 공백 제거
  }

  // 담당부서 문구 빼고 기자명 삽입
  const refineContent = () => {
    const AUTHORS = [
      "심수연 기자",
      "심수연 기자",
      "심수연 기자",
      "심수연 기자",
      "김균식 기자",
    ];
    const randomNum = Math.floor(Math.random() * AUTHORS.length);

    return cleanText(posts[page]?.content) + `\n\n${randomNum}`;
  };

  return (
    <div className="p-5 pt-1">
      <Button onClick={() => setOpenRoom(false)} fullWidth>
        뒤로가기
      </Button>

      <p className="font-bold text-lg m-2">
        {page + 1}/{posts.length} 번째
      </p>

      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh" }}
        onClick={() => navigator.clipboard.writeText(posts[page]?.title)}
      >
        제목 붙혀넣기
      </Button>
      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh" }}
        onClick={() =>
          navigator.clipboard.writeText(refineContent().split("\n")[0])
        }
      >
        내용 일부분 붙혀넣기
      </Button>
      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh" }}
        onClick={() => navigator.clipboard.writeText(refineContent())}
      >
        내용 붙혀넣기
      </Button>
      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh" }}
        onClick={() => window.open(posts[page]?.attachments[0])}
      >
        이미지 다운로드
      </Button>
      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh" }}
        onClick={() => setPage((prev) => prev + 1)}
      >
        다음 페이지
      </Button>
      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh", marginTop: "5vh" }}
        onClick={() => setPage((prev) => prev - 1)}
      >
        전 페이지
      </Button>
    </div>
  );
};

export default AnsanRoom;
