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
        return (
          <SwiperSlide
            key={"category-" + item.id}
            className={"aspect-square mb-5"}
          >
            <Link
              href={categoryLinkPath(item.slug)}
              className={"w-full h-full"}
            >
              <div
                className={cn(
                  "flex justify-center items-center bg-primary-foreground rounded-full aspect-square border hover:shadow-md hover:border-slate-300 relative mx-2",
                  activeBrand === item.slug
                    ? "border-black"
                    : "border-transparent",
                )}
              >
                {item.image && (
                  <NextImage
                    className={"max-w-[60%]"}
                    src={IMAGE_URL + (item.image.url ?? "")}
                    height={item.image.height}
                    width={item.image.width}
                    alt={item.name}
                  ></NextImage>
                )}
              </div>
            </Link>
            <p className="absolute -bottom-5 w-full text-center capitalize">
              {item.name}
            </p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
