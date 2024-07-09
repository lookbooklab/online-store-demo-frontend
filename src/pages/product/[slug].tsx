import LayoutMain from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
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
import React, { useEffect, useMemo, useState } from "react";
import { useCartService } from "@/services/cart";
import { ErrorCard } from "@/components/errors/error-card";
import { useStoreCart } from "@/store/store-cart";
import useProductsService from "@/services/products";
import Breadcrumbs from "@/components/layouts/breadcrumbs";

export default function ProductDetail() {
  const cartStore = useStoreCart();
  const router = useRouter();
  const { getProductDetail } = useProductsService();

  const { slug } = router.query;

  const { addToCart } = useCartService();

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

  // Get price of the product variant
  const getPrice = useMemo(() => {
    const selected = product?.product_variant?.find(
      (item) => item.id === selectVariant,
    );

    if (selected) {
      return selected.variant_price;
    } else {
      return null;
    }
  }, [isLoading, selectVariant]);

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

  return (
    <LayoutMain>
      <div className="container mx-auto pt-10 pb-20">
        <div className={"relative top-[110px]"}>
          <Breadcrumbs />
        </div>
        <div className="grid grid-cols-12 gap-[15px] lg:gap-[30px] pt-[145px]">
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <ImageListProduct imageList={product?.images}></ImageListProduct>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-2xl font-medium">{product?.name}</h2>
            </div>

            <hr className="opacity-50" />

            <div className="mt-3 product-description">
              <span>{parse(productDescription as string)}</span>
            </div>

            <div className={"font-bold text-2xl mt-8 mb-5"}>
              $
              {product.product_variant[0].variant_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>

            <div className={"flex mb-5"}>
              <span className={"font-medium pr-3"}>Availablity:</span>
              <span className={"capitalize"}>{product.availability}</span>
            </div>

            <div className={"mb-5"}>
              <span className={"font-medium pr-3 pb-3 block"}>Contact Us:</span>
              <div className={"flex w-full gap-5"}>
                <Button
                  variant={"outline"}
                  className={"w-1/2 flex items-center"}
                >
                  <img
                    className={"mr-2"}
                    alt="Whatsapp"
                    src={"/images/icons/whatsapp.svg"}
                  />{" "}
                  WhatsApp
                </Button>
                <Button
                  variant={"outline"}
                  className={"w-1/2 flex items-center"}
                >
                  <img
                    className={"mr-2"}
                    alt="Email"
                    src={"/images/icons/email.svg"}
                  />{" "}
                  Email
                </Button>
              </div>
            </div>

            <Button
              size={"lg"}
              className="w-full"
              onClick={() => {
                addToCart(product?.id ?? null, selectVariant, 1);
                cartStore.setIsCartOpen(true);
              }}
            >
              <div className="flex w-full justify-between items-center">
                <span className="font-bold uppercase flex items-center gap-3">
                  <ShoppingBasket></ShoppingBasket>
                  Add to Cart
                </span>
                <span className="font-bold">${getPrice}</span>
              </div>
            </Button>

            <Accordion
              type="multiple"
              className="mt-8"
              defaultValue={["delivery", "reviews"]}
            >
              {supplementalInfo && (
                <AccordionItem value="delivery" data-state="open">
                  <AccordionTrigger className={"jost font-medium"}>
                    Detail and Care
                  </AccordionTrigger>
                  <AccordionContent className={"notes"}>
                    {parse(supplementalInfo as string)}
                  </AccordionContent>
                </AccordionItem>
              )}

              {notes && (
                <AccordionItem value="reviews">
                  <AccordionTrigger className={"jost font-medium"}>
                    Customer Reviews
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
