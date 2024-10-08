import { useState } from "react";
import Link from "next/link";
import NextImage from "../next-image";
import { CategoryInterface } from "@/types/api/category";
import { IMAGE_URL } from "@/static/const";
import { BrandInterface } from "@/types/api/brand";
import { currencyFormat } from "@/lib/use-currency";
import { TagsInterface } from "@/types/api/tags";
import * as React from "react";
import { ProductInterface } from "@/types/api/product";

export interface ProductCardInterface {
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
  //featuredTags,
  thumbnail,
  variantPrice,
  slug,
  item,
}: ProductCardInterface) {
  const [productOnHover, setProductOnHover] = useState(false);
  const thumbnailImage = IMAGE_URL + (thumbnail ?? "");
  const onHoverImage = imageOnHover
    ? IMAGE_URL + (imageOnHover ?? "")
    : "/images/missing_product_image.webp";

  const itemImage = productOnHover ? onHoverImage : thumbnailImage;
  const fileType = itemImage.split(".").pop()?.toLowerCase();

  const getCheapestPrice = () => {
    if (variantPrice.length <= 0) {
      return 0;
    }
    return Math.min(...variantPrice);
  };

  const productPrice = currencyFormat(getCheapestPrice());

  return (
    <Link
      href={`/product/${slug}`}
      className={"relative block"}
      onMouseOver={() => setProductOnHover(true)}
      onMouseOut={() => setProductOnHover(false)}
    >
      {fileType && imageFileTypes.includes(fileType) && (
        <NextImage
          src={itemImage}
          height={500}
          width={500}
          classNames={{
            image: "object-cover aspect-[1/1.2]",
          }}
          alt={name}
          className="w-full rounded-md bg-accent-foreground flex flex-col items-center justify-center"
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

        <div className="flex">
          <p className="text-sm">
            {productPrice === "$0" ? "Price Upon Request" : `${productPrice}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
