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
import Link from "next/link";

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

  function hexToRgb(hex: string | undefined) {
    const result = hex
      ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      : null;
    return result
      ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
      : null;
  }

  return (
    <div className={"md:pt-[121px] pt-[67px]"}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination
        className={"max-h-[800px] h-[500px] md:h-auto"}
      >
        {banners?.map((item) => {
          return (
            <SwiperSlide key={"banner-home-" + item.id}>
              <div className={"banner-link flex relative"}>
                <div className={"absolute bottom-0 left-0 w-full"}>
                  <div
                    style={{
                      background: `linear-gradient(0deg, rgba(${hexToRgb(item.bgColor)},0.6) 0%, rgba(${hexToRgb(item.bgColor)},0.5) 50%, rgba(${hexToRgb(item.bgColor)},0) 100%)`,
                    }}
                    className={`w-full h-full absolute left-0 bottom-0 banner-bg`}
                  />
                  {item.heading && (
                    <h2
                      style={{ color: item.textColor }}
                      className={
                        "text-white text-[35px] mb-2 relative z-10 p-1 pl-20 w-1/3"
                      }
                    >
                      {item.heading}
                    </h2>
                  )}
                  {item.text && (
                    <p
                      style={{ color: item.textColor }}
                      className={
                        "text-white text-lg font-normal mb-6 relative z-10 px-5 pl-20 max-w-[600px]"
                      }
                    >
                      {item.text}
                    </p>
                  )}
                  {item.cta && (
                    <Button
                      className={
                        "text-white text-xl relative z-10 mt-0 py-6 px-9 ml-20 mb-10"
                      }
                    >
                      <Link href={item.url}>{item.cta}</Link>
                    </Button>
                  )}
                </div>
                {item.image && (
                  <NextImage
                    src={IMAGE_URL + (item.image.url ?? "")}
                    width={item.image.width}
                    height={item.image.height}
                    className="w-full hero-banner cover-fill"
                    alt="hero-banner"
                    useSkeleton
                  ></NextImage>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
