import LayoutMain from "@/components/layouts";
import ProductListItem from "@/components/look-list";

export default function LookList() {
  return (
    <LayoutMain>
      <div>
        <div
          style={{
            minHeight: "calc(100vh - 427px)",
            position: "relative",
          }}
          className="container-fluid flex justify-center p-5"
        >
          <div className="w-full md:w-3/4">
            <ProductListItem></ProductListItem>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
