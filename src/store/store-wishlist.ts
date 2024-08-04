import { wishlistLocalStorage } from "@/services/wishlist";
import { create } from "zustand";
import _ from "lodash";

type WishlistStateInterface = {
  wishlistItem: wishlistLocalStorage[];
  wishlistProductsIdOnly: () => number[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (value: boolean) => void;
  setWishlistItem: (value: wishlistLocalStorage[]) => void;
};

// Creates a custom Zustand store for managing the wishlist state.
export const useStoreWishlist = create<WishlistStateInterface>(
  (set, get): WishlistStateInterface => ({
    // Initial state for wishlistItem is an empty array.
    wishlistItem: [],

    // This function returns an array of unique product IDs from the wishlistItem array.
    wishlistProductsIdOnly: () => {
      const uniqueIds = _.uniqBy(get().wishlistItem, "productId");
      return uniqueIds.map((item) => item.productId) as number[];
    },
    // Initial state for isWishlistOpen is false.
    isWishlistOpen: false,

    // This function is used to update the value of isWishlistOpen.
    setIsWishlistOpen: (value) => set(() => ({ isWishlistOpen: value })),

    // This function is used to update the value of wishlistItem.
    setWishlistItem: (value: wishlistLocalStorage[]) => {
      set(() => ({ wishlistItem: value }));
    },
  }),
);
