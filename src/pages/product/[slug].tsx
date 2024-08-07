import LayoutMain from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { marked } from "marked";
import parse from "html-react-parser";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ImageListProduct from "@/components/product-detail/image-list";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SkeletonProductDetail } from "@/components/skeleton";
import React, { useEffect, useState } from "react";
import { useWishlistService } from "@/services/wishlist";
import { ErrorCard } from "@/components/errors/error-card";
import { useStoreWishlist } from "@/store/store-wishlist";
import useProductsService from "@/services/products";
import Breadcrumbs from "@/components/layouts/breadcrumbs";
import HeartIcon from "@/components/icons/heart";
import Link from "next/link";
import Wishlist from "@/components/wishlist";
import EmailIcon from "@/components/icons/email";
import MinusIcon from "@/components/icons/minus";

export default function ProductDetail() {
  const wishlistStore = useStoreWishlist();
  const router = useRouter();
  const { getProductDetail } = useProductsService();
  const { slug } = router.query;
  const { addToWishlist, removeItemFromWishlist } = useWishlistService();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      return getProductDetail(slug as string);
    },
    enabled: !!slug,
  });

  const [selectVariant, setSelectedVariant] = useState<number | null>(null);

  // Set selected product variant
  useEffect(() => {
    setSelectedVariant(product?.product_variant[0]?.id ?? null);
  }, [isLoading]);

  if (isLoading) {
    return (
      <LayoutMain>
        <SkeletonProductDetail></SkeletonProductDetail>
      </LayoutMain>
    );
  } else if (isError) {
    return (
      <LayoutMain>
        <div className="container mx-auto">
          <ErrorCard message={(error as Error).message}></ErrorCard>
        </div>
      </LayoutMain>
    );
  }

  const productDescription = marked.parse(product?.description);
  const supplementalInfo = product?.supplemental_info
    ? marked.parse(product?.supplemental_info)
    : "";
  const notes = product?.notes ? marked.parse(product?.notes) : "";

  const productPrice = product.product_variant[0].variant_price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <LayoutMain>
      <div className="container mx-auto pt-10 pb-20">
        <div className={"relative top-[50px] md:top-[110px]"}>
          <Breadcrumbs />
        </div>
        <div className="grid grid-cols-12 gap-[15px] lg:gap-[30px] pt-[80px] md:pt-[145px]">
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <ImageListProduct imageList={product?.images}></ImageListProduct>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between mb-5">
              <h2 className="text-2xl font-medium">{product?.name}</h2>
            </div>

            <hr className="opacity-50" />

            <div className="mt-3 product-description">
              <span>{parse(productDescription as string)}</span>
            </div>

            <div className={"font-bold text-2xl mt-8 mb-5"}>
              {productPrice === "0" ? "Price Upon Request" : `$${productPrice}`}
            </div>

            <div className={"flex mb-5"}>
              <span className={"font-medium pr-3"}>Availablity:</span>
              <span className={"capitalize"}>{product.availability}</span>
            </div>

            <div className={"mb-5"}>
              <span className={"font-medium pr-3 pb-3 block"}>Contact Us:</span>
              <div className={"flex w-full gap-5"}>
                <Link
                  href={
                    "https://api.whatsapp.com/send/?phone=85284031329&text&type=phone_number&app_absent=0"
                  }
                  className={
                    "w-1/2 flex items-center justify-center bg-transparent border-primary border text-primary hover:underline hover:bg-primary hover:text-secondary transition h-[44px]"
                  }
                >
                  <img
                    className={"mr-2"}
                    alt="Whatsapp"
                    src={"/images/icons/whatsapp.svg"}
                  />{" "}
                  WhatsApp
                </Link>
                <a
                  href={`mailto:team@envvia.com?subject=Envvia Inquiry - ${product?.name}`}
                  className={
                    "w-1/2 flex items-center justify-center bg-transparent border-primary border text-primary hover:underline hover:bg-primary hover:text-secondary transition h-[44px] email-button"
                  }
                >
                  <EmailIcon className={"w-5 mr-2"} /> Email
                </a>
              </div>
            </div>
            <Wishlist
              trigger={
                <Button
                  size={"lg"}
                  className="w-full detail-button"
                  onClick={() => {
                    const wishListLocalStorage = localStorage.getItem(
                      "wishlist",
                    ) as string;

                    if (wishListLocalStorage.includes(product?.slug)) {
                      removeItemFromWishlist(product.id, selectVariant);
                    } else {
                      addToWishlist(
                        product?.id ?? null,
                        selectVariant,
                        1,
                        product?.slug,
                      );
                      wishlistStore.setIsWishlistOpen(true);
                    }
                  }}
                >
                  <div className="flex w-full justify-center items-center">
                    <span className="font-bold uppercase flex items-center gap-3">
                      {localStorage
                        .getItem("wishlist")
                        ?.includes(product?.slug) ? (
                        <MinusIcon className={"w-6"} />
                      ) : (
                        <HeartIcon className={"w-6"} />
                      )}
                      {localStorage.getItem("wishlist")?.includes(product?.slug)
                        ? "Remove From Wishlist"
                        : "Add to Wishlist"}
                    </span>
                  </div>
                </Button>
              }
            ></Wishlist>

            <Accordion
              type="multiple"
              className="mt-8"
              defaultValue={["delivery", "reviews"]}
            >
              {supplementalInfo && (
                <AccordionItem value="delivery" data-state="open">
                  <AccordionTrigger className={"jost font-medium"}>
                    Details
                  </AccordionTrigger>
                  <AccordionContent className={"notes"}>
                    {parse(supplementalInfo as string)}
                  </AccordionContent>
                </AccordionItem>
              )}

              {notes && (
                <AccordionItem value="reviews">
                  <AccordionTrigger className={"jost font-medium"}>
                    Editor&apos;s Notes
                  </AccordionTrigger>
                  <AccordionContent className={"notes"}>
                    {parse(notes as string)}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
