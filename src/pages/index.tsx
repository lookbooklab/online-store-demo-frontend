import LayoutMain from "@/components/layouts";
import CategoryList from "@/components/categories";
import HeroSlider from "@/components/home/hero-slider";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedCategories from "@/components/home/featured-categories";
import HomePageAds from "@/components/home/ads";
import { useQuery } from "@tanstack/react-query";
import usePagesService from "@/services/pages";
import Link from "next/link";

export default function Home() {
  const { getPageInfo } = usePagesService();

  const {
    data: homePageSections,
    //isLoading,
    //isError,
    //error,
  } = useQuery({
    queryKey: ["home-page"],
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
          <div className="container-fluid px-2">
            <h2 className="text-3xl mb-7 text-center">
              {homePageSections?.sections[1].title}
            </h2>
            <FeaturedProducts></FeaturedProducts>
            <div
              className={
                "flex w-full justify-center items-center mv-10 relative md:top-[-65px] top-[-30px]"
              }
            >
              <Link
                className={
                  "bg-primary border-primary border-2 px-5 py-2 text-secondary hover:bg-transparent hover:text-primary transition"
                }
                href={"/product"}
              >
                View All Jewelry
              </Link>
            </div>
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
