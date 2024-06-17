import { useState } from "react";
import Link from "next/link";
import NextImage from "../next-image";
import { CategoryInterface } from "@/types/api/category";
import { IMAGE_URL } from "@/static/const";
import { BrandInterface } from "@/types/api/brand";
import { currencyFormat } from "@/lib/use-currency";

export interface ProductCardInterface {
  name: string;
  newItem: boolean;
  imageOnHover: string;
  category?: Pick<CategoryInterface, "name" | "slug">;
  brand?: Pick<BrandInterface, "name" | "slug">;
  thumbnail: string | null;
  variantPrice: number[];
  slug: string;
}

export default function ProductCard({
  name,
  newItem,
  imageOnHover,
  category,
  brand,
  thumbnail,
  variantPrice,
  slug,
}: ProductCardInterface) {
  const [productOnHover, setProductOnHover] = useState(false);

  const itemImage = productOnHover
    ? IMAGE_URL + (imageOnHover ?? "")
    : IMAGE_URL + (thumbnail ?? "");

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
      {newItem && (
        <span
          className={
            "absolute bg-green-200 px-2 py-1 rounded top-2 left-2 uppercase text-xs"
          }
        >
          new
        </span>
      )}
      <NextImage
        src={itemImage}
        height={500}
        width={500}
        classNames={{
          image: "object-cover aspect-[1/1.2]",
        }}
        alt={name}
        className="w-full rounded-md"
      ></NextImage>
      <div className="mt-3">
        <div className="flex items-center">
          {category && <p className="text-xs">{category.name}</p>}
          {brand && (
            <div className="flex items-center">
              <span className="mx-1">-</span>
              <p className="text-xs">{brand.name}</p>
            </div>
          )}
        </div>
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
