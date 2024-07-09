import React from "react";
import Link from "next/link";
import { IMAGE_URL } from "@/static/const";
import NextImage from "@/components/next-image";
import { ImageInterface } from "@/types/api/image";

export interface CategoryCardInterface {
  category: string;
  image: ImageInterface;
  url: string;
}

const CategoryCard = ({ category, image, url }: CategoryCardInterface) => {
  return (
    <Link href={url} className={"text-center underline-on-hover"}>
      <NextImage
        src={IMAGE_URL + image.url}
        height={image.height}
        width={image.width}
        classNames={{
          image: "object-cover aspect-square",
        }}
        alt={category}
        className="w-full rounded-md"
      ></NextImage>
      <p className={"capitalize py-3 merriweather text-2xl"}>{category}</p>
      <span className={"block text-center hover:underline"}>View All</span>
    </Link>
  );
};

export default CategoryCard;
