import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import SearchModal from "../search/search-modal";
import { Search, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LogoutIcon from "@/components/icons/logout";
import { MenuInterface } from "@/types/api/menu";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface propsInterface {
  trigger: JSX.Element;
  isLoading: boolean;
  isError: boolean;
  error: any;
  menuItems: MenuInterface[];
}

export default function MenuSideBarMobile({
  menuItems,
  //isLoading,
  //isError,
  //error,
  trigger,
}: propsInterface) {
  const session = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent className="flex h-full flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle className="flex justify-start mb-10">Menu</SheetTitle>
          </SheetHeader>

          <SearchModal
            trigger={
              <Button
                variant={"secondary"}
                className="flex justify-start w-full"
              >
                <Search className="mr-2 h-5"></Search> Search
              </Button>
            }
          ></SearchModal>

          {menuItems && (
            <Accordion type={"multiple"}>
              {menuItems.map((menuItem) => {
                return (
                  <AccordionItem value={menuItem.item} key={menuItem.item}>
                    <AccordionTrigger className={"capitalize jost"}>
                      {menuItem.item}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className={"flex flex-col"}>
                        {menuItem.submenu.map((submenuItem) => {
                          return (
                            <div
                              key={`submenuItem-${submenuItem.id}-${submenuItem.sub_nav_category}`}
                            >
                              <span
                                className={
                                  "capitalize block font-semibold mb-2"
                                }
                              >
                                {submenuItem.sub_nav_category}
                              </span>
                              <ul className={"mb-5"}>
                                {submenuItem.tags.map((tag) => {
                                  return (
                                    <li
                                      className={
                                        "p-2 hover:bg-primary hover:text-white cursor-pointer text-[16px]"
                                      }
                                      key={`sub-nav-${tag.name}-${tag.id}`}
                                    >
                                      <Link
                                        className={"w-full block"}
                                        href={`/product?${tag.slug ? "search=" + tag.slug : ""}`}
                                      >
                                        <SheetClose
                                          className={
                                            "capitalize w-full  hover:underline text-left"
                                          }
                                        >
                                          {tag.name}
                                        </SheetClose>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
        {session.status === "unauthenticated" && (
          <Link href="/login">
            <Button className="flex justify-start  w-full">
              <User2 className="mr-2 h-5"></User2>Login
            </Button>
          </Link>
        )}

        {session.status === "authenticated" && (
          <Button
            variant={"link"}
            className="relative top-5 right-5 overflow-hidden border-accent-foreground w-full capitalize text-left justify-start text-[16px]"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogoutIcon className={"w-[22px] mr-3"} />{" "}
            <SheetClose>Logout</SheetClose>
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
