import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Breadcrumbs = () => {
  const router = useRouter();
  const { search, slug } = router.query;
  return (
    <div className={"breadcrumbs"}>
      {search && (
        <div className={"pl-5"}>
          <Link href="/">Home</Link>
          <>
            {search && " / "}
            {search && (
              <Link href={`/product?search=` + search} className={"underline"}>
                {typeof search === "string"
                  ? search?.replace(/-/g, " ")[0].toUpperCase() +
                    search?.replace(/-/g, " ").substring(1)
                  : ""}
              </Link>
            )}
          </>
        </div>
      )}
      {slug && (
        <Button variant={"outline"} onClick={() => router.back()}>
          <img
            className={"w-5"}
            alt={"close"}
            src={"/images/icons/arrow.svg"}
          />
          Back
        </Button>
      )}
    </div>
  );
};

export default Breadcrumbs;
