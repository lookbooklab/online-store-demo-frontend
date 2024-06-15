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
//import Cart from "@/components/cart";
import SearchInput from "../search";
import MenuSideBarMobile from "./menu-sidebar-mobile";

import { useQuery } from "@tanstack/react-query";
import { SkeletonCategory } from "../skeleton";
import { ErrorCard } from "../errors/error-card";
import { IMAGE_URL } from "@/static/const";
//import { useStoreCart } from "@/store/store-cart";
import { useSession } from "next-auth/react";
import useMenuService from "@/services/menu";

function MenuHeader() {
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

  if (isLoading) {
    return <SkeletonCategory></SkeletonCategory>;
  } else if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  return (
    <NavigationMenuList>
      {menuItems.map((nav) => {
        return (
          <NavigationMenuItem key={"nav-list-header-" + nav.id}>
            <NavigationMenuTrigger>{nav.item}</NavigationMenuTrigger>
            <NavigationMenuContent>
              {nav.submenu.map((category) => {
                return (
                  <div
                    key={"category-list-" + category.id}
                    className="flex basis-1 flex-1 w-7/12 p-10"
                  >
                    <ul>
                      <li>
                        <h3 className="font-semibold uppercase mb-2.5">
                          {category.sub_nav_category}
                        </h3>
                      </li>
                      {category.tags.map((tag) => {
                        let categoryName = "";
                        let searchQuery;

                        if (nav.has_tag) {
                          categoryName = "," + nav.slug;
                        }

                        // eslint-disable-next-line prefer-const
                        searchQuery = tag.slug + categoryName;

                        return (
                          <li
                            className="capitalize hover:underline hover:cursor-pointer"
                            key={"menu-item-list" + tag.id}
                          >
                            <Link
                              href={`/product?${tag.slug ? "&tags=" + searchQuery : ""}`}
                            >
                              {tag.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              <div className="relative mb-10 p-10 max-h-[250px] w-5/12 overflow-hidden">
                <NextImage
                  src={IMAGE_URL + nav.image.url}
                  height={nav.image.height}
                  width={nav.image.width}
                  classNames={{
                    image: "object-cover aspect-square mb-10",
                  }}
                  alt={nav.item}
                  className="w-full"
                ></NextImage>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  );
}

export default function Header() {
  //const { cartItem } = useStoreCart();
  const session = useSession();

  return (
    <>
      {/* <HeaderTopPromo></HeaderTopPromo> */}
      <div className="border-b border-[#DEDEDE] fixed w-full z-10 bg-white">
        <div className="container-fluid py-3">
          <div className="flex justify-between mb-5">
            <div className="flex items-center m-auto">
              <Link href={"/"}>
                <h1 className="text-center text-3xl logo font-extralight">
                  ENVVIA
                </h1>
              </Link>
            </div>
            <div className="flex items-center hidden md:block absolute right-2 border border-black p-2 top-2.5">
              <SearchInput></SearchInput>
            </div>
            {session.status === "unauthenticated" && (
              <div className="absolute left-3">
                <Button size={"sm"} asChild className="hidden md:flex ">
                  <Link href="/login">
                    <span className="md:visible lg:hidden">
                      <User2></User2>
                    </span>
                    <span className="hidden lg:block">Login or Register</span>
                  </Link>
                </Button>
              </div>
            )}

            {/*<div className="flex items-center">


              <div className="cursor-pointer mr-4">
                <Cart
                  trigger={
                    <Button variant="outline" size="icon" className="relative">
                      <ShoppingBasket />
                      <div className="absolute -right-2 -top-2 text-xs bg-black h-5 w-5 flex items-center justify-center rounded-full text-white">
                        {cartItem.length}
                      </div>
                    </Button>
                  }
                ></Cart>
              </div>


              {session.status === "unauthenticated" && (
                <Button size={"sm"} asChild className="hidden md:flex">
                  <Link href="/login">
                    <span className="md:visible lg:hidden">
                      <User2></User2>
                    </span>
                    <span className="hidden lg:block">Login or Register</span>
                  </Link>
                </Button>
              )}

              {session.status === "authenticated" && (
                <Button size={"sm"} asChild className="hidden md:flex">
                  <Link href="/profile">
                    <span>
                      <User2 className="h-4"></User2>
                    </span>
                    <span className="hidden lg:block ml-1">My Profile</span>
                  </Link>
                </Button>
              )}
            </div>*/}
          </div>
          <NavigationMenu className="hidden md:block max-w-none">
            <MenuHeader></MenuHeader>
            <NavigationMenuViewport className="w-full"></NavigationMenuViewport>
          </NavigationMenu>

          <div className="block md:hidden relative">
            <MenuSideBarMobile
              trigger={
                <Button variant={"ghost"}>
                  <Menu></Menu>
                </Button>
              }
            ></MenuSideBarMobile>
          </div>
        </div>
      </div>
    </>
  );
}
