import { useState } from "react";
import Link from "next/link";
import NextImage from "../next-image";
import { CategoryInterface } from "@/types/api/category";
import { IMAGE_URL } from "@/static/const";
import { BrandInterface } from "@/types/api/brand";
import { TagsInterface } from "@/types/api/tags";

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
}

export default function ProductCard({
  name,
  imageOnHover,
  thumbnail,
  slug,
}: LookCardInterface) {
  const [lookOnHover, setLookOnHover] = useState(false);
  const thumbnailImage = IMAGE_URL + (thumbnail ?? "");
  const onHoverImage = imageOnHover
    ? IMAGE_URL + (imageOnHover ?? "")
    : "/images/missing_product_image.webp";

  const itemImage = lookOnHover ? onHoverImage : thumbnailImage;

  return (
    <Link
      href={`/look/${slug}`}
      className={"relative block"}
      onMouseOver={() => setLookOnHover(true)}
      onMouseOut={() => setLookOnHover(false)}
    >
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
      <div className="mt-3">
        <h3 className={"mb-2"}>{name}</h3>
      </div>
    </Link>
  );
}
