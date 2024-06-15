import axios from "axios";
import { BASE_URL } from "@/static/const";
import { MenuInterface } from "@/types/api/menu";

export default function useMenuService() {
  /**
   * Retrieves the menu info from the server.
   *
   * @return {Promise<CategoryInterface[]>} An array of MenuInterface objects representing the menu items.
   */
  const getMenu = async () => {
    const req = await axios.get(BASE_URL + "menus", {
      params: {
        populate: [
          "submenu",
          "image",
          "slug",
          "submenu.tags",
          "submenu.name",
          "submenu.slug",
        ],
      },
    });

    return req.data.data as MenuInterface[];
  };
  return {
    getMenu,
  };
}
