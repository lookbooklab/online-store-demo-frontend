import { useQuery } from "@tanstack/react-query";
import { SkeletonProduct } from "../skeleton";
import { ErrorCard } from "../errors/error-card";
import useCategoriesService from "@/services/categories";
import CategoryCard from "@/components/categories/category-card";

export default function FeaturedCategories() {
  const { getFeaturedCategories } = useCategoriesService();

  const {
    data: catgories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featured-categories"],
    queryFn: async () => {
      return getFeaturedCategories();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
        {[...Array(6)].map((item, index) => {
          return (
            <div
              key={"skeleton-product-" + index}
              className="col-span-6 md:col-span-4 lg:col-span-2"
            >
              <SkeletonProduct></SkeletonProduct>
            </div>
          );
        })}
      </div>
    );
  }

  if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <div className="grid grid-cols-12 gap-[20px] lg:gap-[20px] px-5">
      {catgories.filter.map((category) => {
        return (
          <div
            key={"category-featured-" + category.id}
            className="col-span-4 md:col-span-4 lg:col-span-4"
          >
            <CategoryCard
              category={category.name}
              image={category.image}
              url={category.url}
            />
          </div>
        );
      })}
    </div>
  );
}
