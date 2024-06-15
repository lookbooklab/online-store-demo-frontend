import NextImage from "@/components/next-image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useQuery } from "@tanstack/react-query";
import { SkeletonBanner } from "../skeleton";
import { IMAGE_URL } from "@/static/const";
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
              <a
                href="https://envvia.com"
                className={"banner-link flex relative"}
              >
                <div className={"absolute bottom-0 left-0 max-w-2xl"}>
                  <div
                    style={{
                      backgroundColor: item.bgColor,
                      opacity: item.backgroundOpacity + "%",
                    }}
                    className={`w-full h-full absolute left-0 top-0 banner-bg`}
                  />
                  {item.heading && (
                    <h2
                      style={{ color: item.textColor }}
                      className={"text-white text-4xl mb-6 relative z-10 p-5"}
                    >
                      {item.heading}
                    </h2>
                  )}
                  {item.text && (
                    <p
                      style={{ color: item.textColor }}
                      className={
                        "text-white text-2xl mb-6 relative z-10 px-5 w-full"
                      }
                    >
                      {item.text}
                    </p>
                  )}
                  {item.cta && (
                    <Button
                      className={
                        "text-white text-xl relative z-10 m-5 mt-0 py-7 px-10"
                      }
                    >
                      {item.cta}
                    </Button>
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
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
