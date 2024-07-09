import { useState } from "react";
import Link from "next/link";
import NextImage from "../next-image";
import { CategoryInterface } from "@/types/api/category";
import { IMAGE_URL } from "@/static/const";
import { BrandInterface } from "@/types/api/brand";
import { currencyFormat } from "@/lib/use-currency";
import { TagsInterface } from "@/types/api/tags";

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
}

export default function ProductCard({
  name,
  imageOnHover,
  featuredTags,
  thumbnail,
  variantPrice,
  slug,
}: ProductCardInterface) {
  const [productOnHover, setProductOnHover] = useState(false);
  const thumbnailImage = IMAGE_URL + (thumbnail ?? "");
  const onHoverImage = imageOnHover
    ? IMAGE_URL + (imageOnHover ?? "")
    : "/images/missing_product_image.webp";

  const itemImage = productOnHover ? onHoverImage : thumbnailImage;

  const getCheapestPrice = () => {
    if (variantPrice.length <= 0) {
      return 0;
    }
    return Math.min(...variantPrice);
  };

  const getHighestPrice = () => {
    if (variantPrice.length <= 0) {
      return 0;
    }

    return Math.max(...variantPrice);
  };

  return (
    <Link
      href={`/product/${slug}`}
      className={"relative block"}
      onMouseOver={() => setProductOnHover(true)}
      onMouseOut={() => setProductOnHover(false)}
    >
      <div className={"absolute top-0 w-full m-2"}>
        {featuredTags?.map((tag) => {
          return (
            <span
              key={"tag-icon-" + tag.color + name}
              className={`bg-[${tag.color}] px-2 py-1 rounded top-2 left-2 uppercase text-xs mr-2`}
            >
              {tag.text_to_display ? tag.text_to_display : tag.name}
            </span>
          );
        })}
      </div>

      <NextImage
        src={itemImage}
        height={500}
        width={500}
        classNames={{
          image: "object-cover aspect-[1/1.2]",
        }}
        alt={name}
        className="w-full rounded-md bg-accent-foreground"
      ></NextImage>
      <div className="mt-3">
        <h3 className={"mb-2"}>{name}</h3>

        <div className="flex">
          <p className="text-sm">{currencyFormat(getCheapestPrice())}</p>
          {getCheapestPrice() !== getHighestPrice() && (
            <p className="text-sm"> - {currencyFormat(getHighestPrice())}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
