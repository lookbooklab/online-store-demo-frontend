import React from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterServices from "@/services/filters";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";

const ProductListFilter = () => {
  const { getProductListFilters } = useFilterServices();
  const [filterForm, setFilterForm] = React.useState({
    search: "",
  });
  //const fitlerCount = filterForm.search.split(",").length;

  const {
    data: filter_group,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product-list-filter"],
    queryFn: async () => {
      return await getProductListFilters();
    },
  });

  const router = useRouter();
  const { query } = router;

  const submitFilter = (tag) => {
    const searchArray = query.search?.split(",") || [];

    if (searchArray.includes(tag)) {
      searchArray.splice(searchArray.indexOf(tag), 1);
    } else {
      searchArray.push(tag);
    }

    query.search = searchArray.toString();

    if (query.search[0] == ",") {
      query.search = query.search.substring(1);
    }

    if (query.search) {
      setFilterForm((prevState) => ({
        ...prevState,
        search: query.search as string,
      }));
    }

    router.push({
      pathname: "/product",
      query: query,
    });
  };

  return (
    <div className={"w-1/4 p-5"}>
      {filter_group &&
        filter_group.filter_list_group.map((group) => {
          return (
            <div key={"filter-list-group-" + group.filter_category}>
              <div className="capitalize font-semibold border-b border-[#DEDEDE] my-5 pb-2">
                <span>{group.filter_category}</span>
              </div>
              {group.tags.map((tag) => {
                return (
                  <div key={"product-filter-" + tag.slug}>
                    <Checkbox
                      defaultChecked={query.search
                        ?.split(",")
                        .includes(tag.slug)}
                      onClick={() => submitFilter(tag.slug)}
                    />
                    <span className="capitalize p-3">{tag.name}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default ProductListFilter;
