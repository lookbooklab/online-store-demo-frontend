import LayoutMain from "@/components/layouts";
import CategoryList from "@/components/categories";
import HeroSlider from "@/components/home/hero-slider";
import NewProducts from "@/components/home/new-products";
import FeaturedCategories from "@/components/home/featured-categories";
import HomePageAds from "@/components/home/ads";
import { useQuery } from "@tanstack/react-query";
import usePagesService from "@/services/pages";

export default function Home() {
  const { getPageInfo } = usePagesService();

  const {
    data: homePageSections,
    //isLoading,
    //isError,
    //error,
  } = useQuery({
    queryKey: ["brand-list"],
    queryFn: async () => {
      return await getPageInfo("home-page");
    },
  });

  return (
    <LayoutMain>
      <>
        <HeroSlider></HeroSlider>

        <div className="my-20 mb-36">
          <div className="container-fluid">
            <h2 className="text-3xl mb-7 text-center">
              {homePageSections?.sections[0].title}
            </h2>
            <CategoryList></CategoryList>
          </div>
        </div>

        <div className="my-20 mb-36">
          <div className="container-fluid">
            <h2 className="text-3xl mb-7 text-center">
              {homePageSections?.sections[1].title}
            </h2>
            <NewProducts></NewProducts>
          </div>
        </div>

        <div className="my-20 mb-36">
          <div className="container-fluid">
            <h2 className="text-3xl mb-7 text-center">
              {homePageSections?.sections[2].title}
            </h2>
            <FeaturedCategories></FeaturedCategories>
          </div>
        </div>

        <div className="my-20 mb-36">
          <div className="container-fluid">
            <HomePageAds></HomePageAds>
          </div>
        </div>
      </>
    </LayoutMain>
  );
}
