import { BrandInterface } from "./brand";
import { CategoryInterface } from "./category";
import { ImageInterface } from "./image";
import { MetaInterface } from "@/types/api/meta";

export interface ProductInterface {
  id: number;
  name: string;
  new_item: boolean;
  description: string;
  short_description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  product_variant: {
    id: number;
    variant_name: string;
    variant_price: number;
    width: number;
    length: number;
    height: number;
    weight: number;
  }[];
  thumbnail: ImageInterface;
  images: ImageInterface[];
  brand?: Pick<BrandInterface, "name" | "slug">;
  category?: Pick<CategoryInterface, "name" | "slug">;
  pagination: {
    page: number;
    pageCount: number;
  };
}

export interface FilterProductInterface {
  brand?: string;
  category?: string;
  name?: string;
  collection?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  tags?: string;
  search?: string;
}

export interface ProductData {
  data: Array<ProductInterface>;
  pagination: MetaInterface;
}
