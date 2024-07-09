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
import { Swiper, SwiperSlide } from "swiper/react";

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
            search: activeBrand === slug ? undefined : slug,
          };

          if (activeBrand === slug) {
            delete newQuery.search;
          }

          return newQuery;
        } else {
          const newQuery = {
            ...router.query,
            search: activeBrand === slug ? undefined : slug,
          };

          if (activeBrand === slug) {
            delete newQuery.search;
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
    <Swiper
      spaceBetween={5}
      grabCursor={true}
      slidesPerView={2.5}
      className="max-w-[1300px]"
      breakpoints={{
        "620": {
          slidesPerView: 2.5,
        },
        "1024": {
          slidesPerView: 5,
        },
      }}
    >
      {categories?.map((item) => {
        const categoryIndex = item.appearance_order - 1;
        const categoryItem = categories[categoryIndex];
        if (categoryItem) {
          return (
            <SwiperSlide
              key={"category-" + categoryItem.id}
              className={"aspect-square mb-5"}
            >
              <Link
                href={categoryLinkPath(categoryItem.slug)}
                className={"w-full h-full"}
              >
                <div
                  className={cn(
                    "flex justify-center items-center bg-primary-foreground rounded-full aspect-square border hover:shadow-md hover:border-slate-300 relative mx-2",
                    activeBrand === categoryItem.slug
                      ? "border-black"
                      : "border-transparent",
                  )}
                >
                  {categoryItem.image && (
                    <NextImage
                      className={"max-w-[60%]"}
                      src={IMAGE_URL + (categoryItem.image.url ?? "")}
                      height={categoryItem.image.height}
                      width={categoryItem.image.width}
                      alt={categoryItem.name}
                    ></NextImage>
                  )}
                </div>
              </Link>
              <p className="absolute -bottom-5 w-full text-center capitalize">
                {categoryItem.name}
              </p>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
}
