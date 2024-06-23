import React from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterServices from "@/services/filters";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";

const ProductListFilter = () => {
  const { getProductListFilters } = useFilterServices();
  const [filterForm, setFilterForm] = React.useState([]);

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
    if (!filterForm.includes(tag)) {
      //checking weather array contain the id
      filterForm.push(tag); //adding to array because value doesnt exists
    } else {
      filterForm.splice(filterForm.indexOf(tag), 1); //deleting
    }

    query.tags = filterForm.toString();

    router.push({
      pathname: "/product",
      query: query,
    });
  };

  return (
    <div className={"w-1/3"}>
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
