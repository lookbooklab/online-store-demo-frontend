import LayoutMain from "@/components/layouts";
import ProductListItem from "@/components/product-list";
import { getHighestProductPrice } from "@/services/products";
import ProductListFilter from "@/components/product-list/product-list-filter";
import ProductSort from "@/components/product-list/product-sort";
import { useState } from "react";

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
  const [filterIsOpen, setFilterIsOpen] = useState(true);

  return (
    <LayoutMain>
      <div>
        <ProductSort
          setFilterIsOpen={setFilterIsOpen}
          filterIsOpen={filterIsOpen}
        />

        <div
          style={{
            minHeight: "calc(100vh - 427px)",
          }}
          className="container-fluid flex justify-center"
        >
          {filterIsOpen && <ProductListFilter />}
          <div className="w-3/4">
            <ProductListItem></ProductListItem>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
