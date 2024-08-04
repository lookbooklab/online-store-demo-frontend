import ProfileLayout from "@/components/layouts/profile-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NextImage from "@/components/next-image";
import { useQuery } from "@tanstack/react-query";
import { useStoreWishlist } from "@/store/store-wishlist";
import { useWishlistService } from "@/services/wishlist";
import { IMAGE_URL } from "@/static/const";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const { getWishlist, removeItemFromWishlist } = useWishlistService();
  const { setWishlistItem, wishlistItem } = useStoreWishlist();

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

  if (!isMounted) {
    return null;
  }

  const WishListItems = () => {
    return (
      <div className="grid grid-cols-12 gap-[15px] lg:gap[30px] px-5">
        {wishlist?.map((item) => {
          return (
            <div
              className="col-span-6 md:col-span-4 lg:col-span-4"
              key={"transaction-" + item.id}
            >
              <Card className="h-full flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-md">{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="item-transaction">
                    <div className="flex items-center justify-between gap-5 flex-wrap">
                      <div className="flex gap-5">
                        <NextImage
                          src={IMAGE_URL + item.image}
                          height={500}
                          width={500}
                          classNames={{
                            image: "object-cover aspect-[1/1.2]",
                          }}
                          alt={item.name}
                          className="w-full rounded-md bg-accent-foreground flex flex-col items-center justify-center"
                        />
                      </div>
                      <Button
                        onClick={() =>
                          removeItemFromWishlist(item.id, item.variant_id)
                        }
                        className={"w-full"}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <ProfileLayout>
      <WishListItems></WishListItems>
    </ProfileLayout>
  );
}
