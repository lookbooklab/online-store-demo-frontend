import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterServices from "@/services/filters";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";

const ProductListFilter = () => {
  const { getProductListFilters } = useFilterServices();

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
  const [selected, setSelected] = useState([]);

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
    if (!query.search) {
      query.search = undefined;
    }
    router.push({
      pathname: "/product",
      query: query,
    });
  };

  useEffect(() => {
    const updatedFilters = query.search?.split(",");
    setSelected(updatedFilters);
  }, [query]);

  return (
    <div className={"w-1/4 p-5"}>
      <div className={"flex justify-between"}>
        <span className={"font-semibold"}>Applied Filters</span>
        <button
          className={"flex items-center hover:underline"}
          onClick={() => {
            query.search = undefined;

            submitFilter();
          }}
        >
          Clear All{" "}
          <img
            className={"w-5"}
            alt={"close"}
            src={"/images/icons/close_icon.svg"}
          />
        </button>
      </div>
      <div className={"flex flex-wrap gap-2 pt-2 pb-5"}>
        {query.search?.split(",").map((tag) => {
          if (query.search) {
            const chip = tag.replace(/-/g, " ").replace("and", "&");

            return (
              <button
                className={
                  "flex whitespace-nowrap items-center capitalize bg-gray-100 px-2 py-1 hover:underline"
                }
                key={tag}
                onClick={() => {
                  submitFilter(tag);
                }}
              >
                {chip}
                <img
                  className={"w-5"}
                  alt={"close"}
                  src={"/images/icons/close_icon.svg"}
                />
              </button>
            );
          } else {
            return "None";
          }
        })}
      </div>

      {filter_group &&
        filter_group.filter_list_group.map((group) => {
          let filterCount = 0;

          group.tags.map((tag) => {
            if (query.search?.split(",").includes(tag.slug)) {
              filterCount = filterCount + 1;
            }
          });

          return (
            <div key={"filter-list-group-" + group.filter_category}>
              <div className="capitalize font-semibold border-b border-[#DEDEDE] my-5 pb-2 flex justify-between">
                <span>
                  {group.filter_category} ({filterCount})
                </span>
                <div>
                  <button
                    className={"flex items-center font-normal hover:underline"}
                    onClick={() => {
                      query.search = undefined;
                    }}
                  >
                    <img
                      className={"w-2 rotate-[90deg]"}
                      alt={"close"}
                      src={"/images/icons/caret.svg"}
                    />
                  </button>
                </div>
              </div>
              {group.tags.map((tag) => {
                return (
                  <div key={"product-filter-" + tag.slug}>
                    <Checkbox
                      checked={selected?.includes(tag.slug)}
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
