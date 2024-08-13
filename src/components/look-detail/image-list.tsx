import NextImage from "@/components/next-image";
import { IMAGE_URL } from "@/static/const";
import { ImageInterface } from "@/types/api/image";
import LightboxGallery from "@/components/lightbox";

import { useState } from "react";
import * as React from "react";

const imageFileTypes = ["png", "jpg", "jpeg", "webp"];

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fileType = selectedImage.split(".").pop()?.toLowerCase();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 sticky top-5 justify-center">
      <div className="flex flex-row md:flex-col gap-2 md:gap-5 flex-wrap">
        {imageList?.map((item, index) => {
          if (item.mime.includes("video")) {
            return (
              <video
                key={"image-product-" + item.id}
                onClick={() => {
                  setSelectedImage(IMAGE_URL + item.url);
                  setSelectedImageIndex(index);
                }}
                className="hover:border-black border object-cover cursor-pointer aspect-square product-thumbnail"
                height={item.height}
                width={item.width}
                autoPlay
                muted
                controls={false}
                playsInline
                loop
              >
                <source src={item.url} type="video/mp4" />
              </video>
            );
          }

          if (!item.mime.includes("video")) {
            return (
              <NextImage
                key={"image-product-" + item.id}
                onClick={() => {
                  setSelectedImage(IMAGE_URL + item.url);
                  setSelectedImageIndex(index);
                }}
                src={IMAGE_URL + item.url}
                height={100}
                width={100}
                classNames={{
                  image: "object-cover",
                }}
                className="hover:border-black border object-cover cursor-pointer aspect-square product-thumbnail"
                alt="product"
              ></NextImage>
            );
          }
        })}
        <NextImage
          onClick={() => setSelectedImage("/images/missing_product_image.webp")}
          src={"/images/missing_product_image.webp"}
          height={100}
          width={100}
          classNames={{
            image: "object-cover h-full",
          }}
          className="hover:border-black border object-cover cursor-pointer aspect-square product-thumbnail"
          alt="product"
        ></NextImage>
      </div>

      <div className={`flex w-full h-full min-h-[500px aspect-square`}>
        {fileType && imageFileTypes.includes(fileType) && (
          <NextImage
            onClick={() => setOpen(true)}
            src={selectedImage}
            height={imageList?.[0]?.height || 1000}
            width={imageList?.[0]?.width || 1000}
            className="w-full h-full cursor-pointer hover:border border-primary bg-accent-foreground object-cover "
            classNames={{
              image: "object-cover aspect-square w-full h-full",
            }}
            alt="product"
          ></NextImage>
        )}

        {fileType && !imageFileTypes.includes(fileType) && (
          <video
            onClick={() => setOpen(true)}
            className="w-full h-full cursor-pointer hover:border border-primary bg-accent-foreground object-cover"
            height={imageList?.[0]?.height}
            width={imageList?.[0]?.width}
            autoPlay
            muted
            controls={false}
            playsInline
            loop
          >
            <source src={selectedImage} type="video/mp4" />
          </video>
        )}
      </div>
      {imageList && (
        <LightboxGallery
          images={imageList}
          open={open}
          setOpen={setOpen}
          selecteedImageIndex={selectedImageIndex}
        />
      )}
    </div>
  );
}
