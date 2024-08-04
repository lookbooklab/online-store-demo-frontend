import { Search } from "lucide-react";
import SearchModal from "./search-modal";
import SearchIcon from "@/components/icons/search";

export default function SearchInput() {
  return (
    <>
      <SearchModal
        trigger={
          <div className="flex relative cursor-pointer hover:bg-primary hover:text-secondary aspect-square items-center justify-center -top-0.5">
            <SearchIcon className={"w-8"} />
          </div>
        }
      ></SearchModal>
    </>
  );
}
