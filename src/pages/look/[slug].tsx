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

import ImageListProduct from "@/components/look-detail/image-list";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SkeletonProductDetail } from "@/components/skeleton";
import React, { useEffect, useState } from "react";
import { useWishlistService } from "@/services/wishlist";
import { ErrorCard } from "@/components/errors/error-card";
import { useStoreWishlist } from "@/store/store-wishlist";
import useLooksService from "@/services/looks";
import Breadcrumbs from "@/components/layouts/breadcrumbs";
import HeartIcon from "@/components/icons/heart";
import Link from "next/link";
import Wishlist from "@/components/wishlist";
import EmailIcon from "@/components/icons/email";
import MinusIcon from "@/components/icons/minus";

export default function ProductDetail() {
  const wishlistStore = useStoreWishlist();
  const router = useRouter();
  const { getLookDetail } = useLooksService();
  const { slug } = router.query;
  const { addToWishlist, removeItemFromWishlist } = useWishlistService();

  const {
    data: look,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["looks", slug],
    queryFn: async () => {
      return getLookDetail(slug as string);
    },
    enabled: !!slug,
  });

  const [selectVariant, setSelectedVariant] = useState<number | null>(null);

  // Set selected product variant
  useEffect(() => {
    setSelectedVariant(look?.product_variant[0]?.id ?? null);
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

  const lookDescription = marked.parse(look?.description);
  const supplementalInfo = look?.supplemental_info
    ? marked.parse(look?.supplemental_info)
    : "";
  const notes = look?.notes ? marked.parse(look?.notes) : "";

  return (
    <LayoutMain>
      <div className="container mx-auto pt-10 pb-20">
        <div className={"relative top-[50px] md:top-[110px]"}>
          <Breadcrumbs />
        </div>
        <div className="grid grid-cols-12 gap-[15px] lg:gap-[30px] pt-[80px] md:pt-[145px]">
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <ImageListProduct imageList={look?.images}></ImageListProduct>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between mb-5">
              <h2 className="text-2xl font-medium">{look?.name}</h2>
            </div>

            <hr className="opacity-50" />

            <div className="mt-3 product-description">
              <span>{parse(lookDescription as string)}</span>
            </div>

            <div className={"flex mb-5"}>
              <span className={"font-medium pr-3"}>Availablity:</span>
              <span className={"capitalize"}>{look.availability}</span>
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
                  href={`mailto:team@envvia.com?subject=Envvia Inquiry - ${look?.name}`}
                  className={
                    "w-1/2 flex items-center justify-center bg-transparent border-primary border text-primary hover:underline hover:bg-primary hover:text-secondary transition h-[44px] email-button"
                  }
                >
                  <EmailIcon className={"w-5 mr-2"} /> Email
                </a>
              </div>
            </div>

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
