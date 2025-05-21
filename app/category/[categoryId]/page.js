import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Headline from "./zz_components/Headline";
import HotArticle from "@/app/zz_components/HotArticle";
import MontlyHotArticles from "@/app/zz_components/MonthlyHotArticles";
import EditorPick from "@/app/zz_components/EditorPick";
import LeftBody from "@/components/LeftBody";
import RecentArticles from "./zz_components/RecentArticles";

const Category = ({ params }) => {
  const { categoryId } = params;

  return (
    <main className="lg:mx-[5%]">
      <Header selectedCategoryId={categoryId} />
      <div className="w-full flex justify-center px-3 md:px-0">
        <div className="w-full pt-6 ">
          <Headline {...{ categoryId }} />
          <div className="py-4 md:flex mt-5">
            <div className="w-full md:w-3/4">
              <RecentArticles {...{ categoryId }} />
            </div>
            <div className="w-full md:w-1/4">
              <MontlyHotArticles categoryId={categoryId} withoutBorder />
              <div className="mt-10" />
              <HotArticle pageSize={7} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Category;
