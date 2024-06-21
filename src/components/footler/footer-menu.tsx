import React from "react";
import useMenuService from "@/services/menu";
import { useQuery } from "@tanstack/react-query";
import { SkeletonBrand } from "@/components/skeleton";
import { ErrorCard } from "@/components/errors/error-card";
import Link from "next/link";

const FooterMenu = () => {
  const { getMenu } = useMenuService();

  const {
    data: menu,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu-list"],
    queryFn: async () => {
      return await getMenu();
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
      {menu?.map((menuItem) => {
        return (
          <li key={"footer-link-menu-" + menuItem.item}>
            <Link
              href="/product"
              className="text-gray-700 transition hover:opacity-75 capitalize"
            >
              {menuItem.item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterMenu;
