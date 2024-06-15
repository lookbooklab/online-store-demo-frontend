import Link from "next/link";

import { SkeletonBrand } from "../skeleton";
import "swiper/css";

import { useQuery } from "@tanstack/react-query";
import { ErrorCard } from "../errors/error-card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import useCategoriesService from "@/services/categories";
import { IMAGE_URL } from "@/static/const";
import NextImage from "@/components/next-image";

export default function CategoryList({
  activeBrand,
  clearQuerySearch = true,
}: {
  activeBrand?: string;
  clearQuerySearch?: boolean;
}) {
  const router = useRouter();
  const { getCategories } = useCategoriesService();

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category-list"],
    queryFn: async () => {
      return await getCategories();
    },
  });

  const categoryLinkPath = (slug: string) => {
    return {
      pathname: "/product",
      query: (() => {
        if (clearQuerySearch) {
          const newQuery = {
            category: activeBrand === slug ? undefined : slug,
          };

          if (activeBrand === slug) {
            delete newQuery.category;
          }

          return newQuery;
        } else {
          const newQuery = {
            ...router.query,
            category: activeBrand === slug ? undefined : slug,
          };

          if (activeBrand === slug) {
            delete newQuery.category;
          }

          return newQuery;
        }
      })(),
    };
  };

  if (isLoading) {
    return (
      <div className="mb-10">
        <SkeletonBrand></SkeletonBrand>
      </div>
    );
  } else if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <div className={"flex place-content-evenly max-w-[1300px] m-auto"}>
      {categories?.map((item) => {
        return (
          <div
            key={"category-" + item.id}
            className={cn(
              "bg-primary-foreground w-1/6 rounded-full aspect-square border hover:shadow-md hover:border-slate-300",
              activeBrand === item.slug ? "border-black" : "border-transparent",
            )}
          >
            <Link
              href={categoryLinkPath(item.slug)}
              className="flex justify-center items-center w-full h-full"
            >
              <NextImage
                className="w-2/3"
                src={IMAGE_URL + (item.image.url ?? "")}
                height={item.image.height}
                width={item.image.width}
                alt={item.name}
              ></NextImage>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
