import { Button } from "@material-tailwind/react";
import { useState } from "react";

const Room = ({ setOpenRoom, posts }) => {
  const [page, setPage] = useState(0);
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
          navigator.clipboard.writeText(posts[page]?.content?.split("\n")[0])
        }
      >
        내용 일부분 붙혀넣기
      </Button>
      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh" }}
        onClick={() => navigator.clipboard.writeText(posts[page]?.content)}
      >
        내용 붙혀넣기
      </Button>
      <Button
        fullWidth
        style={{ height: "15vh", marginBottom: "2vh" }}
        onClick={() => window.open(posts[page]?.images[0])}
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
        onClick={() =>
          window.open(
            "https://www.siheung.go.kr/common/imgView.do?attachId=8741cf8204b7a3431bba64fc8c2e790c2dff237e2b1202560ff493650461dd4d&fileSn=f9a1967c526603d17ab488b9d2747cda&mode=origin"
          )
        }
      >
        asdf
      </Button>

      <img
        src="https://siheung.go.kr/common/imgView.do?attachId=8741cf8204b7a3431bba64fc8c2e790c2dff237e2b1202560ff493650461dd4d&amp;fileSn=f9a1967c526603d17ab488b9d2747cda&amp;mode=origin"
        alt="대야ㆍ정왕평생학습관, 2025년 단기과정 평생학습 프로그램 수강생 모집"
        data-attach-id="8741cf8204b7a3431bba64fc8c2e790c2dff237e2b1202560ff493650461dd4d"
        data-file-sn="f9a1967c526603d17ab488b9d2747cda"
      ></img>
    </div>
  );
};

export default Room;
