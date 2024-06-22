import BrandList from "@/components/brands";
import LayoutMain from "@/components/layouts";
import ProductListItem from "@/components/product-list";
import ProductCollectionFilter from "@/components/product-list/product-collection-filter";
import ProductFilter from "@/components/product-list/product-filter";
import ProductSort from "@/components/product-list/product-sort";
import { getHighestProductPrice } from "@/services/products";
import { useRouter } from "next/router";
import ProductListFilter from "@/components/product-list/product-list-filter";

/**
 * Retrieves the highest product price from the server.
 *
 * @return {Promise<object>} The highest product price.
 */
export async function getServerSideProps() {
  const products = await getHighestProductPrice();

  let price = 0;

  if (products) {
    if (products.product_variant.length <= 0) {
      return 0;
    }

    const priceInVariant = products.product_variant.map(
      (item) => item.variant_price,
    );

    price = Math.max(...priceInVariant);
  } else {
    price = 0;
  }

  return { props: { highestPrice: price } };
}

export default function ProductList({
  highestPrice,
}: {
  highestPrice: number;
}) {
  return (
    <LayoutMain>
      <div className="container-fluid pt-[130px] flex">
        <ProductListFilter />
        <div>
          <ProductListItem></ProductListItem>
        </div>
      </div>
    </LayoutMain>
  );
}
