import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterServices from "@/services/filters";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SkeletonProduct } from "@/components/skeleton";
import { ErrorCard } from "@/components/errors/error-card";

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

  const submitFilter = (tag: string | undefined) => {
    const searchArray =
      typeof query.search === "string" ? query.search?.split(",") : [];

    if (tag && searchArray.includes(tag)) {
      searchArray.splice(searchArray.indexOf(tag), 1);
    } else {
      searchArray.push(tag || "");
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
    const searchParams = query.search;

    if (typeof searchParams === "string") {
      const splitFilters = searchParams.split(",");
      // @ts-expect-error TODO Not sure why this type gives an error. Will revisit.
      setSelected(splitFilters);
    } else {
      setSelected([]);
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
        {[...Array(6)].map((item, index) => {
          return (
            <div
              key={"skeleton-product-" + index}
              className="col-span-6 md:col-span-4 lg:col-span-2"
            >
              <SkeletonProduct></SkeletonProduct>
            </div>
          );
        })}
      </div>
    );
  }

  if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <div
      className={
        "absolute w-full h-full z-10 bg-white md:relative md:w-1/4 py-5 px-5"
      }
    >
      <div className={"flex justify-between"}>
        <span className={"font-semibold"}>Applied Filters</span>
        <button
          className={"flex items-center hover:underline"}
          onClick={() => {
            query.search = undefined;

            submitFilter("");
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
        {typeof query.search === "string" &&
          query.search?.split(",").map((tag) => {
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

      <Accordion type={"multiple"} defaultValue={["delivery", "reviews"]}>
        {filter_group?.filter_list_group.map((group) => {
          let filterCount = 0;

          group.tags.map((tag: { slug: string }) => {
            if (
              typeof query.search === "string" &&
              query.search?.split(",").includes(tag.slug)
            ) {
              filterCount = filterCount + 1;
            }
          });

          return (
            <AccordionItem
              key={"filter-group-" + group.filter_category}
              value={group.filter_category}
              data-state="open"
            >
              <AccordionTrigger>
                <span className={"font-semibold capitalize jost"}>
                  {group.filter_category} ({filterCount})
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {group.tags.map((tag) => {
                  return (
                    <div key={"product-filter-" + tag.slug} className={"mb-1"}>
                      <Checkbox
                        className={"w-5 h-5"}
                        // @ts-expect-error TODO Typescript gives an error below. Will have to come back and figure this one out laters.
                        checked={selected?.includes(tag.slug)}
                        onClick={() => submitFilter(tag.slug)}
                      />
                      <span className="capitalize p-3">{tag.name}</span>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ProductListFilter;
