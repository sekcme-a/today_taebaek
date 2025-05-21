"use client";

import DragDropZone from "@/components/DragDropZone";
import { Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { insertArticle, updateArticlesImages } from "../[postId]/service";
import { uploadImages } from "@/actions/storageActions";
import { useRouter } from "next/navigation";
const Bodo = () => {
  const router = useRouter();
  const imageRef = useRef([]);

  const [cropBy, setCropBy] = useState("www.taebaek.go.kr\n");
  const [input, setInput] = useState(``);

  const [articles, setArticles] = useState([]);

  const [images, setImages] = useState([]);

  const onTranformClick = () => {
    const currentImages = imageRef.current;

    const list = input.split(cropBy);
    const transformed = list.slice(1).map((item, index) => {
      const trimmed = item.replace(/^\s+/, "");
      const seperated = trimmed.split("\n\n");
      const titleAndSubtitle = seperated[0]?.split("-");
      const title = titleAndSubtitle[0]?.trim();
      const subtitle = titleAndSubtitle[1]?.trim();
      const content = seperated[1].replace(/\n+$/, "");

      const imgs = currentImages.filter(
        (img) => img.file.name[0] === (index + 1).toString()
      );
      console.log(imgs);
      return {
        title,
        subtitle,
        content,
        images: imgs,
      };
    });

    setArticles(transformed);
  };

  // useEffect(() => {
  //   console.log(articles);
  // }, [articles]);

  const handleImageChange = (files) => {
    imageRef.current = files;
  };

  const [saving, setSaving] = useState(false);
  const onSaveClick = async () => {
    setSaving(true);
    await Promise.all(
      articles.map(async (article) => {
        const newPostId = await insertArticle({
          title: article.title,
          subtitle: article.subtitle,
          author: "심수연 기자 bkshim21s@naver.com",
          content: article.content,
          isHeadline: false,
          isPublished: false,
          isEditorPick: false,
          isBreakingNews: false,
        });
        const uploaded = await uploadImages({
          files: article.images,
          folder: `admin/articles/${newPostId}`,
        });
        await updateArticlesImages(
          newPostId,
          uploaded.map((f) => f.url)
        );
      })
    );
    setSaving(false);
    router.refresh();
  };

  return (
    <div className="p-4">
      <p className="mb-2">*기사 제목이 시작되기 바로 전 문장을 입력해주세요.</p>
      <Input
        label="분할 기준"
        value={cropBy}
        onChange={(e) => setCropBy(e.target.value)}
        rows={20}
      />
      <div className="h-4" />
      <p className="mt-4 mb-2">
        *보도기사 파일을 연 후, 글자가 있는곳 아무곳이나 클릭한후, ctrl+a 로
        텍스트 전체를 선택해줍니다. 전체가 선택되었다면 ctrl+c 로 복사 후, 아래
        텍스트창에 ctrl+v로 붙혀넣기 해주세요.
      </p>
      <Textarea
        label="기사"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={20}
      />
      <DragDropZone
        initialFiles={images}
        onChange={handleImageChange}
        maxMB={3}
      />
      <Button onClick={onTranformClick} className="mt-3" fullWidth>
        추출
      </Button>
      {articles.map((item, index) => {
        return (
          <div key={index} className="my-20 flex">
            <h3 className="mr-5 text-3xl">{index + 1}.</h3>
            <div className="flex-1">
              <Input
                label="제목"
                value={item.title}
                onChange={(e) => {
                  const newArticles = [...articles];
                  newArticles[index] = {
                    ...newArticles[index],
                    title: e.target.value,
                  };
                  setArticles(newArticles);
                }}
              />
              <div className="h-2" />
              <Input
                label="부제목"
                value={item.subtitle}
                onChange={(e) => {
                  const newArticles = [...articles];
                  newArticles[index] = {
                    ...newArticles[index],
                    subtitle: e.target.value,
                  };
                  setArticles(newArticles);
                }}
              />
              <div className="h-2" />
              <Input
                label="내용"
                value={item.content}
                onChange={(e) => {
                  const newArticles = [...articles];
                  newArticles[index] = {
                    ...newArticles[index],
                    content: e.target.value,
                  };
                  setArticles(newArticles);
                }}
              />
              <p className="mt-3 text-sm">
                *이미지는 여기서 수정하실 수 없습니다.
              </p>
              <div className="flex">
                {item.images?.map((img, index) => (
                  <div key={index} className="relative w-72 aspect-[3/2] mr-5">
                    <Image
                      src={img.preview}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <Button
        fullWidth
        className="mb-10 mt-4"
        onClick={onSaveClick}
        disabled={saving || articles.length === 0}
      >
        일괄 저장하기
      </Button>
    </div>
  );
};

export default Bodo;
