import ProductCard from "@/components/product-list/product-card";
import { useQuery } from "@tanstack/react-query";
import { SkeletonProduct } from "../skeleton";
import { ErrorCard } from "../errors/error-card";
import useProductsService from "@/services/products";
import { TagsInterface } from "@/types/api/tags";

export default function FeaturedProducts() {
  const { getFeaturedProducts } = useProductsService();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      return getFeaturedProducts();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
        {[...Array(6)].map((item, index) => {
          return (
            <div
              key={"skeleton-product-" + index}
              className="col-span-6 md:col-span-4 lg:col-span-2"
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

  return (
    <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
      {products.map((item) => {
        const variantPrice = item.product_variant.map(
          (item) => item.variant_price,
        );

        const featuredTags: TagsInterface[] = [];

        item.tags?.map((tag: TagsInterface) => {
          if (tag.featured) {
            featuredTags.push(tag);
          }
        });

        return (
          <div
            key={"product-featured-" + item.id}
            className="col-span-6 md:col-span-4 lg:col-span-3 md:mb-32 mb-10"
          >
            <ProductCard
              name={item.name}
              newItem={item.new_item}
              thumbnail={item.thumbnail?.url}
              imageOnHover={item?.images[1]?.url}
              slug={item.slug}
              variantPrice={variantPrice}
              featuredTags={featuredTags}
              item={item}
            ></ProductCard>
          </div>
        );
      })}
    </div>
  );
}
