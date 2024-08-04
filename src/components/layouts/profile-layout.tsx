import LayoutMain from "@/components/layouts";
import { SidebarProfile } from "@/components/layouts/sidebar-profile";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  // {
  //   title: "Profile",
  //   href: "/profile",
  // },
  {
    title: "Wishlist",
    href: "/profile/wishlist",
  },
  // {
  //   title: "Account",
  //   href: "/profile/account",
  // },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutMain>
      <div className="container mx-auto md:pt-[121px] pt-[67px]">
        <div className="space-y-6 md:p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
            <p className="text-muted-foreground">Manage Your Account</p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col md:flex-row me:space-x-12 me:space-y-0">
            <aside className="md:w-1/5 mb-5">
              <SidebarProfile items={sidebarNavItems} />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
