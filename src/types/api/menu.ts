export interface MenuInterface {
  appearance_order: number;
  id: number;
  item: string;
  image: CategoryImage;
  submenu: Array<SubMenuCategory>;
  slug: string;
  has_tag: boolean;
  createdAt: string;
  updatedAt: string;
}

type SubMenuCategory = {
  id: number;
  name: string;
  tags: Array<MenuItems>;
  sub_nav_category: string;
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
