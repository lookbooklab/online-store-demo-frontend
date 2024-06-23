import LayoutMain from "@/components/layouts";
import ProductListItem from "@/components/product-list";
import { getHighestProductPrice } from "@/services/products";
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

export default function ProductList() {
  return (
    <LayoutMain>
      <div
        style={{
          minHeight: "calc(100vh - 427px)",
        }}
        className="container-fluid pt-[130px] flex"
      >
        <ProductListFilter />
        <div>
          <ProductListItem></ProductListItem>
        </div>
      </div>
    </LayoutMain>
  );
}
