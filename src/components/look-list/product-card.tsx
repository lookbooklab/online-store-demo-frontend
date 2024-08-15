import { useState } from "react";
import Link from "next/link";
import NextImage from "../next-image";
import { CategoryInterface } from "@/types/api/category";
import { IMAGE_URL } from "@/static/const";
import { BrandInterface } from "@/types/api/brand";
import { TagsInterface } from "@/types/api/tags";
import * as React from "react";
import { ProductInterface } from "@/types/api/product";

export interface LookCardInterface {
  name: string;
  newItem: boolean;
  imageOnHover: string | undefined;
  category?: Pick<CategoryInterface, "name" | "slug">;
  brand?: Pick<BrandInterface, "name" | "slug">;
  thumbnail: string | null;
  variantPrice: number[];
  slug: string;
  featuredTags: Array<TagsInterface>;
  item: ProductInterface;
}

const imageFileTypes = ["png", "jpg", "jpeg", "webp"];

export default function ProductCard({
  name,
  imageOnHover,
  thumbnail,
  slug,
  item,
}: LookCardInterface) {
  const [lookOnHover, setLookOnHover] = useState(false);
  const thumbnailImage = IMAGE_URL + (thumbnail ?? "");
  const onHoverImage = imageOnHover
    ? IMAGE_URL + (imageOnHover ?? "")
    : "/images/missing_product_image.webp";

  const itemImage = lookOnHover ? onHoverImage : thumbnailImage;
  const fileType = itemImage.split(".").pop()?.toLowerCase();

  return (
    <Link
      href={`/look/${slug}`}
      className={"relative block h-full"}
      onMouseOver={() => setLookOnHover(true)}
      onMouseOut={() => setLookOnHover(false)}
    >
      {fileType && imageFileTypes.includes(fileType) && (
        <NextImage
          src={itemImage}
          height={500}
          width={500}
          classNames={{
            image: "w-full h-full object-cover aspect-[1/1.2]",
          }}
          alt={name}
          className="w-full h-full rounded-md bg-accent-foreground flex flex-col items-center justify-center"
        ></NextImage>
      )}
      {fileType && !imageFileTypes.includes(fileType) && (
        <video
          key={"image-product-" + item.id}
          className="hover:border-black border object-cover cursor-pointer aspect-square h-full"
          height={item.height}
          width={item.width}
          autoPlay
          muted
          controls={false}
          playsInline
          loop
        >
          <source src={itemImage} type="video/mp4" />
        </video>
      )}
      <div className="mt-3">
        <h3 className={"mb-2"}>{name}</h3>
      </div>
    </Link>
  );
}
