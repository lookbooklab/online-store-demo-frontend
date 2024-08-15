import { useQuery } from "@tanstack/react-query";
import { SkeletonProduct } from "../skeleton";
import { ErrorCard } from "../errors/error-card";
import useAdsService from "@/services/ads";
import NextImage from "@/components/next-image";
import { IMAGE_URL } from "@/static/const";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageAds() {
  const { getAdContent } = useAdsService();

  const {
    data: adContent,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      return getAdContent();
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
    <div className="grid grid-cols-12 m-auto px-5 max-w-[2000px] h-full">
      <div className="col-span-12 lg:col-span-6 h-full">
        <NextImage
          src={IMAGE_URL + adContent.image.url}
          alt="bg-auth"
          width={adContent.image.width}
          height={adContent.image.height}
          className="object-cover w-full h-full"
          classNames={{
            image: "object-cover h-full",
          }}
        ></NextImage>
      </div>
      <div className="bg-primary-foreground  col-span-12 lg:col-span-6 flex items-center py-10 px-5 md:px-14">
        <div>
          <h3 className={"bold text-2xl mb-6"}>{adContent.heading}</h3>
          <p className={"mb-4 md:max-w-[75%]"}>{adContent.text}</p>
          <Link href={`mailto:team@envvia.com?subject=Private Consultation`}>
            <Button>{adContent.cta_text}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
