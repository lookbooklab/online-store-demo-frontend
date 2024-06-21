import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SkeletonBrand } from "@/components/skeleton";
import { ErrorCard } from "@/components/errors/error-card";
import Link from "next/link";
import useCategoriesService from "@/services/categories";

const FooterMenu = () => {
  const { getCategories } = useCategoriesService();

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category-list"],
    queryFn: async () => {
      return await getCategories();
    },
  });

  if (isLoading) {
    return (
      <div className="mb-10">
        <SkeletonBrand></SkeletonBrand>
      </div>
    );
  } else if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <ul className="mt-6 space-y-3 text-sm">
      {categories?.map((category) => {
        return (
          <li key={"footer-link-category-" + category.name}>
            <Link
              href="/product"
              className="text-gray-700 transition hover:opacity-75 capitalize"
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterMenu;
