import { Badge } from "@/components/ui/badge";
import ProfileLayout from "@/components/layouts/profile-layout";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import NextImage from "@/components/next-image";
import Link from "next/link";
import useTransactionService from "@/services/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ErrorCard } from "@/components/errors/error-card";
import { SkeletonTransactionList } from "@/components/skeleton";
import { useStoreWishlist } from "@/store/store-wishlist";
import { useWishlistService, wishlistLocalStorage } from "@/services/wishlist";
import { IMAGE_URL } from "@/static/const";
import { Button } from "@/components/ui/button";

export default function Transaction() {
  const { getMyTransaction } = useTransactionService();
  const session = useSession();

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-transaction"],
    queryFn: async () => {
      return await getMyTransaction();
    },
    enabled: !!session.data,
  });

  const { getWishlist, removeItemFromWishlist } = useWishlistService();
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

  const TransactionList = () => {
    const { wishlistItem } = useStoreWishlist();

    if (isLoading) {
      return (
        <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
          {[...Array(9)].map((index) => {
            if (index) {
              return (
                <div
                  className="col-span-12 md:col-span-6 lg:col-span-6"
                  key={"skeleton-transaction-list" + index}
                >
                  <SkeletonTransactionList></SkeletonTransactionList>
                </div>
              );
            }
          })}
        </div>
      );
    } else if (isError)
      return <ErrorCard message={(error as Error).message}></ErrorCard>;
    else {
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
                          onClick={() => removeItemFromWishlist(item.id)}
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
    }
  };

  return (
    <ProfileLayout>
      <TransactionList></TransactionList>
    </ProfileLayout>
  );
}
