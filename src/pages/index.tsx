import LayoutMain from "@/components/layouts";
import CategoryList from "@/components/categories";
import HeroSlider from "@/components/home/hero-slider";
import NewProducts from "@/components/home/new-products";
import FeaturedCategories from "@/components/home/featured-categories";
import HomePageAds from "@/components/home/ads";

export default function Home() {
  return (
    <LayoutMain>
      <>
        <HeroSlider></HeroSlider>

        <div className="my-20 mb-36">
          <div className="container-fluid">
            <h2 className="text-3xl mb-7 text-center">Jewelry By Category</h2>
            <CategoryList></CategoryList>
          </div>
        </div>

        <div className="my-20 mb-36">
          <div className="container-fluid">
            <h2 className="text-3xl mb-7 text-center">New Arrivals</h2>
            <NewProducts></NewProducts>
          </div>
        </div>

        <div className="my-20 mb-36">
          <div className="container-fluid">
            <h2 className="text-3xl mb-7 text-center">Featured Categories</h2>
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
