import { ImageInterface } from "@/types/api/image";

export interface FiltersInterface {
  filter_list_group: Array<FilterGroup>;
}

export interface FilterCategoriesInterface {
  filter: Array<FeatureFitlers>;
}

type FilterGroup = {
  tags: Array<FilterTags>;
  filter_category: string;
};

type FilterTags = {
  name: string;
  slug: string;
};

type FeatureFitlers = {
  id: number;
  name: string;
  image: ImageInterface;
  url: string;
};
