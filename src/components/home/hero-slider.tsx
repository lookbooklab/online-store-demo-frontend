import NextImage from "@/components/next-image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useQuery } from "@tanstack/react-query";
import { SkeletonBanner } from "../skeleton";
import { IMAGE_URL } from "@/static/const";
import Link from "next/link";
import { ErrorCard } from "../errors/error-card";
import useBannersService from "@/services/banners";
import { Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";

export default function HeroSlider() {
  const { getBanners } = useBannersService();

  const {
    data: banners,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["hero-slider"],
    queryFn: async () => {
      return await getBanners();
    },
  });

  if (isLoading) {
    return <SkeletonBanner></SkeletonBanner>;
  } else if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination
      >
        {banners?.map((item) => {
          return (
            <SwiperSlide key={"banner-home-" + item.id}>
              <Link href={item.url} className={"banner-link"}>
                <div className={"absolute bottom-32 left-20"}>
                  {item.heading && (
                    <h2 className={"text-white text-4xl mb-6"}>
                      {item.heading}
                    </h2>
                  )}
                  {item.text && (
                    <p className={"text-white text-2xl mb-6"}>{item.text}</p>
                  )}
                  {item.cta && (
                    <Button className={"text-white text-xl"}>{item.cta}</Button>
                  )}
                </div>
                {item.image && (
                  <NextImage
                    src={IMAGE_URL + (item.image.url ?? "")}
                    width={2400}
                    height={800}
                    className="w-full hero-banner"
                    alt="hero-banner"
                    useSkeleton
                  ></NextImage>
                )}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
