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
          "submenu.sub_menu_link",
          "submenu.sub_menu_link.tags",
        ],
      },
    });

    const menuItems = req.data.data;

    menuItems?.map(
      (nav: { appearance_order: number }, index: string | number) => {
        menuItems.splice(
          nav.appearance_order - 1,
          0,
          menuItems.splice(index, 1)[0],
        );
      },
    );

    return menuItems as MenuInterface[];
  };
  return {
    getMenu,
  };
}
