import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterServices from "@/services/filters";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";

const ProductListFilter = () => {
  const { getProductListFilters } = useFilterServices();
  const [filterForm, setFilterForm] = React.useState({
    search: "",
  });

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
    const searchArray = query.search?.split(",");

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

  useEffect(() => {}, [query]);

  return (
    <div className={"w-1/3 p-5"}>
      {filter_group &&
        filter_group.filter_list_group.map((group) => {
          return (
            <div key={"filter-list-group-" + group.filter_category}>
              <span>{group.filter_category}</span>
              {group.tags.map((tag) => {
                return (
                  <div key={"product-filter-" + tag.slug}>
                    {tag.name}
                    <Checkbox
                      defaultChecked={query.search?.includes(tag.slug)}
                      onClick={() => submitFilter(tag.slug)}
                    />
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
