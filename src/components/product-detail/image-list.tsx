import NextImage from "@/components/next-image";
import { IMAGE_URL } from "@/static/const";
import { ImageInterface } from "@/types/api/image";
import LightboxGallery from "@/components/lightbox";

import { useState } from "react";
import * as React from "react";

export default function ImageListProduct({
  imageList,
}: {
  imageList?: ImageInterface[];
}) {
  const [selectedImage, setSelectedImage] = useState(
    imageList?.[0]?.url
      ? IMAGE_URL + imageList[0].url
      : "/images/fallback-image.png",
  );
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 sticky top-5">
      {/* --{JSON.stringify(imageList)} */}
      <div className="flex flex-row md:flex-col gap-2 md:gap-5 flex-wrap">
        {imageList?.map((item) => {
          return (
            <NextImage
              key={"image-product-" + item.id}
              onMouseEnter={() => setSelectedImage(IMAGE_URL + item.url)}
              src={IMAGE_URL + item.url}
              height={100}
              width={100}
              classNames={{
                image: "object-cover w-full",
              }}
              className="hover:border-black border w-[calc(100%/3-8px)] md:w-full object-cover aspect-square cursor-pointer bg-accent-foreground"
              alt="product"
            ></NextImage>
          );
        })}
        <NextImage
          onMouseEnter={() =>
            setSelectedImage("/images/missing_product_image.webp")
          }
          src={"/images/missing_product_image.webp"}
          height={100}
          width={100}
          classNames={{
            image: "object-cover w-full",
          }}
          className="hover:border-black border w-[calc(100%/3-8px)] md:w-full object-cover aspect-square"
          alt="product"
        ></NextImage>
      </div>

      <NextImage
        onClick={() => setOpen(true)}
        src={selectedImage}
        height={1000}
        width={1000}
        className="w-full cursor-pointer hover:border border-primary bg-accent-foreground"
        alt="product"
      ></NextImage>
      {imageList && (
        <LightboxGallery images={imageList} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
