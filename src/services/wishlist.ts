import useErrorHandler from "@/hooks/useErrorHandler";
import { useStoreWishlist } from "@/store/store-wishlist";
import { WishlistInterface } from "@/types/api/wishlist";
import useProductsService from "./products";

export interface wishlistLocalStorage {
  productId: number | null;
  variantId: number | null;
  qty: number | null;
}

export const useWishlistService = () => {
  const { showError } = useErrorHandler();
  const { setWishlistItem } = useStoreWishlist();
  const { productInArrayId } = useProductsService();

  /**
   * Adds a product to the wishlist.
   *
   * @param {number | null} productId - The ID of the product to add.
   * @param {number | null} variantId - The ID of the variant of the product to add.
   * @param {number} qty - The quantity of the product to add.
   */
  const addToWishlist = (
    productId: number | null,
    variantId: number | null,
    qty: number,
  ) => {
    const wishlist = localStorage.getItem("wishlist");

    if (!productId && !variantId) {
      showError("Please select product and the variant!");
      return;
    }

    if (wishlist) {
      const wishlistData = JSON.parse(wishlist);
      const index = wishlistData.findIndex(
        (item: wishlistLocalStorage) =>
          item.productId === productId && item.variantId === variantId,
      );

      if (index > -1) {
        wishlistData[index].qty += qty;
      } else {
        wishlistData.push({
          productId: productId,
          variantId: variantId,
          qty: qty,
        });
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlistData));
      setWishlistItem(wishlistData);
    } else {
      const data = [
        {
          productId: productId,
          variantId: variantId,
          qty: qty,
        },
      ];

      localStorage.setItem("wishlist", JSON.stringify(data));

      setWishlistItem(data);
    }
  };

  const updateQuantity = (
    productId?: number | null,
    variantId?: number | null,
    qty?: number,
  ) => {
    const wishlist = localStorage.getItem("wishlist");

    if (!qty) return;
    if (!wishlist) return;
    if (qty < 1) return;

    const wishlistData = JSON.parse(wishlist);
    const index = wishlistData.findIndex(
      (item: wishlistLocalStorage) =>
        item.productId === productId && item.variantId === variantId,
    );

    if (index > -1) {
      wishlistData[index].qty = qty;

      localStorage.setItem("wishlist", JSON.stringify(wishlistData));
      setWishlistItem(wishlistData);
    }
  };

  /**
   * Retrieves the wishlist data from local storage.
   *
   * @return {wishlistLocalStorage[]} The wishlist data retrieved from local storage, or an empty array if no data is found.
   */
  const getWishlistFromLocalStorage = () => {
    const wishlist = localStorage.getItem("wishlist");
    const wishlistData: wishlistLocalStorage[] = JSON.parse(wishlist as string);

    return wishlistData ?? [];
  };

  /**
   * Retrieves the wishlist data from local storage and fetches the corresponding product data from the API.
   * Filters the wishlist data based on the availability of product variants in the API.
   * Updates the wishlist in local storage and sets the filtered wishlist data in the component state.
   * Returns an array of wishlist items with the required product and variant information.
   *
   * @return {WishlistInterface[]} An array of wishlist items with the required product and variant information.
   */
  const getWishlist = async () => {
    const wishlistData = getWishlistFromLocalStorage();

    if (wishlistData.length > 0) {
      const ids = wishlistData.map((item) => item.productId) as number[];
      const data = await productInArrayId(ids);

      // Filter data, if the item in wishlist and the variant not available on the api.
      const filteredwishlistData = wishlistData.filter((item) => {
        const product = data.find((product) => item.productId === product.id);
        return (
          product &&
          product.product_variant.find(
            (variant) => item.variantId === variant.id,
          )
        );
      });

      // Set new wishlist value with the valid data from api
      localStorage.setItem("wishlist", JSON.stringify(filteredwishlistData));
      setWishlistItem(filteredwishlistData);

      return filteredwishlistData.map((item) => {
        const productData = data.find(
          (product) => item.productId === product.id,
        );
        const productVariant = productData?.product_variant.find(
          (variant) => variant.id === item.variantId,
        );

        return {
          id: productData?.id,
          image: productData?.thumbnail.url,
          name: productData?.name,
          variant_id: productVariant?.id,
          variant_name: productVariant?.variant_name,
          price: productVariant?.variant_price,
          width: productVariant?.width,
          length: productVariant?.length,
          height: productVariant?.height,
          weight: productVariant?.weight,
        };
      }) as WishlistInterface[];
    }

    return [] as WishlistInterface[];
  };

  /**
   * Removes an item from the wishlist based on the provided productId and variantId.
   *
   * @param {number | null} productId - The ID of the product to be removed from the wishlist.
   * @param {number | null} variantId - The ID of the variant of the product to be removed from the wishlist.
   */
  const removeItemFromWishlist = (
    productId?: number | null,
    variantId?: number | null,
  ) => {
    const wishlist = localStorage.getItem("wishlist");
    console.log(productId);
    if (!wishlist) return;

    const wishlistData = JSON.parse(wishlist);

    const updatedWishlist = wishlistData.filter(
      (item: wishlistLocalStorage) => {
        return !(item.productId === productId && item.variantId === variantId);
      },
    );

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistItem(updatedWishlist);
  };

  /**
   * Clears the wishlist by removing the "wishlist" key from localStorage and setting the wishlist items to an empty array.
   *
   * @param {none}
   * @return {void}
   */
  const clearWishlist = () => {
    localStorage.removeItem("wishlist");
    setWishlistItem([]);
  };

  return {
    addToWishlist,
    getWishlistFromLocalStorage,
    getWishlist,
    updateQuantity,
    removeItemFromWishlist,
    clearWishlist,
  };
};
