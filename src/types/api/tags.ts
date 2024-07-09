import { ProductInterface } from "@/types/api/product";

export interface TagsInterface {
  name: string;
  products: ProductInterface;
  type: string;
  slug: string;
  featured: boolean;
  color: string;
  text_to_display: string;
}
