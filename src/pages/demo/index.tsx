import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ModeToggle } from "@/components/ui/mode-toggle";
import LayoutMain from "@/components/layouts";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutMain>
      <AdminPanelLayout>
        {" "}
        <div className={"w-full flex justify-between"}>
          <p>Test</p>
          <ModeToggle />
        </div>
        <div>{children}</div>
      </AdminPanelLayout>
    </LayoutMain>
  );
}
