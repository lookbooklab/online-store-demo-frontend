import axios from "axios";
import { BASE_URL } from "@/static/const";
import {
  FilterLooksInterface,
  LooksData,
  LooksInterface,
} from "@/types/api/look";
import { CollectionInterface } from "@/types/api/collection";

import _ from "lodash";
import { MetaInterface } from "@/types/api/meta";

export default function useLooksService() {
  /**
   * Retrieves the featured looks from the API.
   *
   * @return {LooksInterface} The featured looks.
   */
  const getFeaturedLooks = async () => {
    const req = await axios.get(BASE_URL + "featured-product", {
      params: {
        populate: [
          "looks.images",
          "looks.thumbnail",
          "looks.product_variant",
          "looks.brand",
          "looks.category",
          "looks.tags",
        ],
      },
    });

    return req.data.data.looks as LooksInterface[];
  };

  /**
   * Retrieves collections from the server.
   *
   * @return {Promise<CollectionInterface[]>} An array of collections.
   */
  const getCollections = async () => {
    const req = await axios.get(BASE_URL + "collections", {
      params: {
        pagination: {
          limit: -1,
        },
        populate: ["image"],
      },
    });

    return req.data.data as CollectionInterface[];
  };

  /**
   * Retrieves the looks from the API.
   *
   * @return {LooksInterface} The featured looks.
   */
  const getLooks = async (
    filter?: FilterLooksInterface,
    page: string = "1",
  ): Promise<LooksData> => {
    const filterTags = filter?.search?.split(",");
    const filterTagsArray: { tags: { slug: { $eq: string } } }[] = [];
    filterTags?.map((tags) => {
      const tagQuery = {
        tags: {
          slug: {
            $eq: tags,
          },
        },
      };

      filterTagsArray.push(tagQuery);
    });

    const req = await axios.get(BASE_URL + "looks", {
      params: {
        pagination: {
          pageSize: 24,
          page,
        },
        populate: [
          "thumbnail",
          "product_variant",
          "brand",
          "category",
          "tags",
          "images",
        ],
        sort: (() => {
          if (filter?.sort === "price-low-high") {
            return ["product_variant.variant_price:ASC", "name:ASC"];
          } else if (filter?.sort === "price-high-low") {
            return ["product_variant.variant_price:DESC", "name:ASC"];
          } else {
            return ["createdAt:DESC"];
          }
        })(),
        filters: {
          $and: [
            {
              collections: {
                slug: {
                  $eq: filter?.collection ?? undefined,
                },
              },
            },
            {
              product_variant: {
                variant_price: {
                  $gte: filter?.minPrice ?? undefined,
                  $lte: filter?.maxPrice ?? undefined,
                },
              },
            },
            {
              brand: {
                slug: {
                  $eq: filter?.brand ?? undefined,
                },
              },
            },
            {
              category: {
                slug: {
                  $eq: filter?.category ?? undefined,
                },
              },
            },
            {
              $or: filterTagsArray,
            },
            {
              product_variant: {
                variant_price: {
                  $gt: filter?.minPrice ?? undefined,
                },
              },
            },
          ],
        },
      },
    });

    const data = req.data.data;

    // NOTE: Currently strapi facing problem when product deep sorting
    // for example product_variant.variant_price:DESC. It will duplicate
    // some looks. That why we need to remove duplicate looks
    // within this function
    const uniqueIds = _.uniqBy<LooksInterface>(data, "id");

    // return data with unique id
    return {
      data: uniqueIds,
      pagination: req.data?.meta?.pagination as MetaInterface,
    };
  };

  /**
   * Retrieves the details of a product by its slug.
   *
   * @param {string} slug - The slug of the product.
   * @return {LooksInterface} The product details.
   */
  const getLookDetail = async (slug: string) => {
    const req = await axios.get(BASE_URL + "looks/" + slug, {
      params: {
        populate: ["images", "product_variant", "brand", "category"],
      },
    });

    return req.data.data as LooksInterface;
  };

  /**
   * Retrieves looks from the API based on the given array of product IDs.
   *
   * @param {number[]} idLooks - An array of product IDs.
   * @return {LooksInterface[]} - An array of product data.
   */
  const lookInArrayId = async (idLooks: number[]) => {
    const req = await axios.get(BASE_URL + "looks", {
      params: {
        pagination: {
          limit: -1,
        },
        populate: ["thumbnail", "product_variant", "brand", "category"],
        filters: {
          id: {
            $in: idLooks,
          },
        },
      },
    });

    return req.data.data as LooksInterface[];
  };

  /**
   * Searches for looks based on the given search string.
   *
   * @param {string} search - The search string to filter looks by name.
   * @return {LooksInterface[]} - An array of looks that match the search query.
   */
  const searchLooks = async (search: string) => {
    if (search.length <= 0) {
      return [] as LooksInterface[];
    }

    const req = await axios.get(BASE_URL + "looks", {
      params: {
        populate: ["thumbnail", "product_variant", "brand", "category", "tag"],
        pagination: {
          limit: 5,
        },
        filters: {
          $or: [
            {
              tags: {
                name: {
                  $containsi: search,
                },
              },
            },
            {
              name: {
                $containsi: search,
              },
            },
          ],
        },
      },
    });
    return req.data.data as LooksInterface[];
  };

  return {
    getFeaturedLooks,
    getCollections,
    getLooks,
    getLookDetail,
    lookInArrayId,
    searchLooks,
  };
}

/**
 * Retrieves the highest priced product from the API.
 *
 * @return {LooksInterface} The highest priced product.
 */
export const getHighestLookPrice = async () => {
  const req = await axios.get(BASE_URL + "looks", {
    params: {
      pagination: {
        limit: 1,
      },
      populate: ["product_variant"],
      sort: ["product_variant.variant_price:DESC", "id:ASC"],
    },
  });

  return req.data.data[0] as LooksInterface;
};
