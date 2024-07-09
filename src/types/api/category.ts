import { ImageInterface } from "@/types/api/image";

export interface CategoryInterface {
  appearance_order: number;
  id: number;
  name: string;
  slug: string;
  image: ImageInterface;
  short_description: string;
  createdAt: string;
  updatedAt: string;
}
