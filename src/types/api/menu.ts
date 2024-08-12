export interface MenuInterface {
  isLink: boolean;
  appearance_order: number;
  id: number;
  item: string;
  image: CategoryImage;
  submenu: SubMenuCategory[];
  slug: string;
  has_tag: boolean;
  createdAt: string;
  updatedAt: string;
}

type SubMenuCategory = {
  id: number;
  name: string;
  tags: MenuItems[];
  sub_nav_category: string;
  sub_menu_link: SubMenuLink[];
};

type MenuItems = {
  id: number;
  name: string;
  type: string;
  slug: string;
};

type CategoryImage = {
  url: string;
  height: number;
  width: number;
};

type SubMenuLink = {
  tags: MenuItems[];
  link_name: string;
};
