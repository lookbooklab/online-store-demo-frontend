import axios from "axios";
import { BASE_URL } from "@/static/const";
import { CategoryInterface, CategoryFilter } from "@/types/api/category";

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

    return req.data.data as CategoryFilter;
  };

  return {
    getCategories,
    getFeaturedCategories,
  };
}
