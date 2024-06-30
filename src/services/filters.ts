import axios from "axios";
import { BASE_URL } from "@/static/const";
import { FiltersInterface } from "@/types/api/filters";

export default function useFilterServices() {
  const getProductListFilters = async () => {
    const req = await axios.get(BASE_URL + "product-list-filter", {
      params: {
        populate: ["filter_list_group", "filter_list_group.tags"],
      },
    });

    return req.data.data as FiltersInterface;
  };

  return {
    getProductListFilters,
  };
}
