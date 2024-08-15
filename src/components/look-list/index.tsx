import ProductCard from "@/components/look-list/product-card";
import { SkeletonProduct } from "@/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ErrorCard } from "@/components/errors/error-card";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import ReactPaginate from "react-paginate";
import { buttonVariants } from "../ui/button";
import useLooksService from "@/services/looks";
import { TagsInterface } from "@/types/api/tags";

export default function LookListItem() {
  const router = useRouter();
  const { getLooks } = useLooksService();

  const {
    brand,
    images,
    category,
    search,
    collection,
    minPrice,
    maxPrice,
    sort,
    page,
  } = router.query;

  const {
    data: looks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "looks",
      page,
      brand,
      images,
      category,
      search,
      collection,
      minPrice,
      maxPrice,
      sort,
    ],
    queryFn: async () => {
      return getLooks(
        {
          brand: brand as string,
          category: category as string,
          collection: collection as string,
          search: search ? (search as string) : undefined,
          minPrice: minPrice ? (minPrice as string) : undefined,
          maxPrice: maxPrice ? (maxPrice as string) : undefined,
          sort: sort as string,
        },
        page as string,
      );
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
        {[...Array(24)].map((item, index) => {
          return (
            <div
              key={"skeleton-product-" + index}
              className="col-span-6 md:col-span-4 lg:col-span-4 md:mb-32 sm:mb-20 mb-20"
            >
              <SkeletonProduct></SkeletonProduct>
            </div>
          );
        })}
      </div>
    );
  }

  if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  if (looks.data.length <= 0) {
    return (
      <div className="flex mb-10 shrink-0 items-center justify-center rounded-md border border-dashed pt-[140px]">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <Search></Search>
          <p className="mt-4 text-lg font-semibold">No Product Found</p>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Oops, it seems like there are no looks currently available in this
            category. Please explore other categories to discover exciting
            looks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 mb-20 gap-[10px] lg:gap-[10px] pt-[140px]">
        {looks.data.map((item) => {
          const variantPrice = item.product_variant.map(
            (item) => item.variant_price,
          );

          const featuredTags: TagsInterface[] = [];

          item.tags.map((tag: TagsInterface) => {
            if (tag.featured) {
              featuredTags.push(tag);
            }
          });
          return (
            <div
              key={"product-featured-" + item.id}
              className="col-span-6 md:col-span-6 lg:col-span-4 md:mb-32 sm:mb-20 mb-20"
            >
              <ProductCard
                name={item.name}
                category={item.category}
                brand={item.brand}
                newItem={item.new_item}
                thumbnail={item.thumbnail?.url}
                imageOnHover={
                  item.images && item.images[1] ? item.images[1].url : undefined
                }
                slug={item.slug}
                variantPrice={variantPrice}
                featuredTags={featuredTags}
                item={item}
              ></ProductCard>
            </div>
          );
        })}
      </div>

      <div className="mb-10">
        <ReactPaginate
          breakLabel="..."
          forcePage={looks.pagination.page ? looks.pagination.page - 1 : 1}
          nextLabel={
            <>
              Next<ChevronRight className="h-4"></ChevronRight>
            </>
          }
          previousLabel={
            <>
              <ChevronLeft className="h-4"></ChevronLeft>Prev
            </>
          }
          containerClassName="flex space-x-1 justify-center items-center"
          pageLinkClassName={buttonVariants({ variant: "secondary" })}
          previousLinkClassName={buttonVariants({ variant: "secondary" })}
          nextLinkClassName={buttonVariants({ variant: "secondary" })}
          activeLinkClassName={
            "!bg-black !hover:bg-black !text-white !hover:text-white"
          }
          onPageChange={(e) => {
            router.push({
              pathname: "/look",
              query: {
                ...router.query,
                page: e.selected + 1,
              },
            });
          }}
          pageRangeDisplayed={2}
          pageCount={looks.pagination.pageCount}
        />
      </div>
    </>
  );
}
