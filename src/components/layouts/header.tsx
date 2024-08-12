// import HeaderTopPromo from "@/components/layouts/header-top-promo";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Menu, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NextImage from "@/components/next-image";
import SearchInput from "../search";
import MenuSideBarMobile from "./menu-sidebar-mobile";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCategory } from "../skeleton";
import { ErrorCard } from "../errors/error-card";
import { IMAGE_URL } from "@/static/const";
import { useStoreWishlist } from "@/store/store-wishlist";
import { useSession } from "next-auth/react";
import useMenuService from "@/services/menu";
import React from "react";
import HeartIcon from "@/components/icons/heart";
import { MenuInterface } from "@/types/api/menu";
import Wishlist from "@/components/wishlist";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MenuHeaderProps {
  menuItems: MenuInterface[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

function MenuHeader({ menuItems, isLoading, isError, error }: MenuHeaderProps) {
  if (isLoading) {
    return <SkeletonCategory></SkeletonCategory>;
  } else if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <NavigationMenuList>
      {menuItems.map((menuItem) => {
        if (menuItem && !menuItem.isLink) {
          return (
            <NavigationMenuItem key={"nav-list-header-" + menuItem.item}>
              <NavigationMenuTrigger>{menuItem.item}</NavigationMenuTrigger>
              <NavigationMenuContent>
                {menuItem.submenu.map((category) => {
                  return (
                    <div
                      key={"category-list-" + category.id}
                      className="flex basis-1 flex-1 w-7/12 p-10"
                    >
                      <ul>
                        <li>
                          <h3 className="font-semibold uppercase mb-2.5 jost">
                            {category.sub_nav_category}
                          </h3>
                        </li>
                        <ul>
                          {category.sub_menu_link.map((link) => {
                            const sub_menu_slug: string[] = [];

                            link.tags.map((tag) => {
                              sub_menu_slug.push(tag.slug);
                            });

                            return (
                              <li
                                className={"hover:underline"}
                                key={`sub-nav-link-${link.link_name}`}
                              >
                                <Link
                                  href={`/product?search=${sub_menu_slug.join()}`}
                                >
                                  {link.link_name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </ul>
                    </div>
                  );
                })}
                <div className="relative mb-10 p-10 h-[300px] w-5/12 overflow-hidden">
                  <NextImage
                    src={IMAGE_URL + menuItem.image.url}
                    fill
                    layout={"fill"}
                    classNames={{
                      image: "object-cover aspect-square my-10 pr-10",
                    }}
                    alt={menuItem.item}
                    className="w-full"
                  ></NextImage>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        }

        if (menuItem && menuItem.isLink) {
          return (
            <NavigationMenuItem key={"nav-list-header-" + menuItem.createdAt}>
              <Link href={`/look`}>
                <NavigationMenuTrigger>{menuItem.item}</NavigationMenuTrigger>
              </Link>
            </NavigationMenuItem>
          );
        }
      })}
    </NavigationMenuList>
  );
}

export default function Header() {
  const { wishlistItem } = useStoreWishlist();
  const session = useSession();
  const { getMenu } = useMenuService();

  const {
    data: menuItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu-list"],
    queryFn: async () => {
      return await getMenu();
    },
    // The staleTime option allows you to specify the duration
    // in milliseconds that the cached data is considered fresh
    // and can be used without refetching.
    staleTime: Infinity,
  });

  const updatedMenuItems: MenuInterface[] = [];

  menuItems?.map((nav, index) => {
    menuItems.splice(
      nav.appearance_order - 1,
      0,
      menuItems.splice(index, 1)[0],
    );

    updatedMenuItems.push(menuItems[index]);
  });

  return (
    <>
      {/* <HeaderTopPromo></HeaderTopPromo> */}
      <div className="border-b border-[#DEDEDE] fixed w-full z-10 bg-white">
        <div className="container-fluid py-3">
          <div className="flex justify-between md:mb-5">
            <div className="block md:hidden absolute left-0">
              {menuItems && (
                <MenuSideBarMobile
                  menuItems={menuItems}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  trigger={
                    <Button variant={"ghost"}>
                      <Menu></Menu>
                    </Button>
                  }
                ></MenuSideBarMobile>
              )}
            </div>
            <div className="flex items-center m-auto">
              <Link href={"/"}>
                <img
                  className={"m-auto w-1/2"}
                  src={"/images/envvia_logo.png"}
                  alt="Envvia Logo"
                />
              </Link>
            </div>

            {session.status === "unauthenticated" && (
              <div className="absolute left-3">
                <Button size={"sm"} asChild className="hidden md:flex ">
                  <Link href="/login">
                    <span className="md:visible lg:hidden">
                      <User2></User2>
                    </span>
                    <span className="hidden lg:block">Login</span>
                  </Link>
                </Button>
              </div>
            )}

            {session.status === "authenticated" && (
              <div className="absolute left-3">
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  asChild
                  className="hidden md:flex"
                >
                  <Link href="/profile">
                    <span
                      className={
                        "border border-primary rounded-full flex justify-center items-center w-[30px] h-[30px]"
                      }
                    >
                      <User2 className="h-4"></User2>
                    </span>
                    <span className="hidden lg:block ml-3">
                      {session.data.user.name}
                    </span>
                  </Link>
                </Button>
              </div>
            )}
            <div className={"absolute right-0 top-1 flex"}>
              <div className={"mr-3 hidden md:flex"}>
                <SearchInput />
              </div>

              <div className="flex items-center">
                <div className="cursor-pointer mr-4">
                  <Wishlist
                    trigger={
                      <button className="relative hover:bg-primary hover:text-secondary aspect-square p-1">
                        <HeartIcon className={"w-8"} />
                        {wishlistItem.length > 0 && (
                          <div className="absolute -right-0.5 -top-0.5 text-xs bg-black h-5 w-5 flex items-center justify-center rounded-full text-white">
                            {wishlistItem.length}
                          </div>
                        )}
                      </button>
                    }
                  ></Wishlist>
                </div>
              </div>
            </div>
          </div>
          <NavigationMenu className="hidden md:block max-w-none">
            {menuItems && (
              <MenuHeader
                menuItems={updatedMenuItems}
                isLoading={isLoading}
                isError={isError}
                error={error}
              ></MenuHeader>
            )}
            <NavigationMenuViewport className="w-full"></NavigationMenuViewport>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}
