import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/layouts/breadcrumbs";

export default function ProductSort({
  filterIsOpen,
  setFilterIsOpen,
}: {
  filterIsOpen: boolean;
  setFilterIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { query } = router;

  const [sort, setSort] = useState<string>("latest");

  // when query changes set state sort
  useEffect(() => {
    if (query.sort) {
      setSort(query.sort as string);
    } else {
      setSort("latest");
    }
  }, [query]);

  // When sort change. redirect to product with new sort query
  const selectSort = (value: string) => {
    query.sort = value;

    router.push({
      pathname: "/product",
      query: query,
    });
  };
  console.log(query.search?.length);
  return (
    <div>
      {query.search?.length && (
        <div className={"pt-[140px] pb-5"}>
          <Breadcrumbs />
        </div>
      )}
      <div className="flex justify-between items-center w-full md:w-auto py-4 px-5 border-b border-t border-[#DEDEDE]">
        <div>
          <button
            className="flex items-center justify-between gap-2 uppercase"
            onClick={() => setFilterIsOpen(!filterIsOpen)}
          >
            <img alt="Hide Filter" src={"/images/icons/hide_filter.svg"} />
            {filterIsOpen ? "Hide" : "Show"} Filter
          </button>
        </div>
        <div className="flex items-center">
          <Label
            htmlFor="sorting"
            className="mr-2 text-gray-500 hidden md:block uppercase"
          >
            Sorting
          </Label>
          <Select
            onValueChange={(value) => selectSort(value)}
            defaultValue={sort}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select Sorting" />
            </SelectTrigger>
            <SelectContent id="sorting">
              <SelectItem value="latest">Latest Product</SelectItem>
              <SelectItem value={"price-low-high"}>
                Price: Low - High
              </SelectItem>
              <SelectItem value={"price-high-low"}>
                Price: High - Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
