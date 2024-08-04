import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import WishlistItem from "./wishlist-item";
import Link from "next/link";

import { useStoreWishlist } from "@/store/store-wishlist";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useWishlistService } from "@/services/wishlist";

export interface propsInterface {
  trigger: JSX.Element;
}

export default function Wishlist(props: propsInterface) {
  const { getWishlist } = useWishlistService();
  const { setWishlistItem, isWishlistOpen, setIsWishlistOpen, wishlistItem } =
    useStoreWishlist();

  // Why we need to mapping this wishlistItem?
  // The reason is that we only want it fetching the product
  // data when there are new variant and product in the wishlist
  // We exclude the quantity, because when we are change the quantity in wishlist
  // It will refetch the api which is useless
  const { data: wishlist } = useQuery({
    queryKey: [
      "wishlist-item",
      wishlistItem.map((item) => {
        return {
          variant: item.variantId,
          productId: item.productId,
        };
      }),
    ],
    queryFn: async () => {
      return await getWishlist();
    },
  });

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("wishlist")) {
      const wishlistData = JSON.parse(
        localStorage.getItem("wishlist") as string,
      );
      setWishlistItem(wishlistData);
    }
  }, []);

  // To get the quantity of the product use this.
  const getQuantity = (productId?: number, variantId?: number) => {
    const data = wishlistItem.find(
      (item) => item.productId === productId && item.variantId === variantId,
    );
    return data?.qty ?? 0;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet
        open={isWishlistOpen}
        onOpenChange={(value) => setIsWishlistOpen(value)}
      >
        <SheetTrigger asChild>{props.trigger}</SheetTrigger>

        <SheetContent className="flex h-full flex-col justify-between px-0">
          <div>
            <SheetHeader className="px-5">
              <SheetTitle>My Wishlist ({wishlist?.length} Items)</SheetTitle>
              <SheetDescription>
                Adjust your wishlist item here
              </SheetDescription>
            </SheetHeader>

            <ul
              role="list"
              className="px-5 overflow-auto h-[calc(100vh-350px)] my-6 divide-y divide-gray-200 overflow-y-auto"
            >
              {wishlist?.map((item) => {
                return (
                  <li
                    className="py-6"
                    key={"wishlist-item-" + item.id + item.variant_id}
                  >
                    <WishlistItem
                      wishlistItem={{
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        variant_id: item.variant_id,
                        variant_name: item.variant_name,
                        price: item.price,
                        qty: getQuantity(item?.id, item?.variant_id),
                      }}
                    ></WishlistItem>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-5 py-6">
            <div className="mt-6">
              <SheetClose asChild>
                <Button type="button" className="w-full">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
