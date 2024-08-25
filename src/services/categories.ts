import axios from "axios";
import { BASE_URL } from "@/static/const";
import { CategoryInterface } from "@/types/api/category";
import { FilterCategoriesInterface } from "@/types/api/filters";

export default function useCategoriesService() {
  /**
   * Retrieves the categories from the server.
   *
   * @return {Promise<CategoryInterface[]>} An array of CategoryInterface objects representing the categories.
   */
  const getCategories = async () => {
    const req = await axios.get(BASE_URL + "categories", {
      params: {
        populate: ["image"],
        sort: "appearance_order",
      },
    });

    return req.data.data as CategoryInterface[];
  };

  const getFeaturedCategories = async () => {
    const req = await axios.get(BASE_URL + "featured-filter", {
      params: {
        populate: ["filter", "filter.image"],
      },
    });

    return req.data.data as FilterCategoriesInterface;
  };

  return {
    getCategories,
    getFeaturedCategories,
  };
}
