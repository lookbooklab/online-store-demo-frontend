import Link from "next/link";
import FooterMenu from "@/components/footler/footer-menu";
import FooterCategories from "@/components/footler/footer-categories";

export default function Footer() {
  return (
    <footer className="bg-slate-100 lg:grid lg:grid-cols-4 mt-14">
      <div className="px-4 py-16 sm:px-6 lg:col-span-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium text-gray-900 uppercase">Categories</p>

              <FooterMenu />
            </div>

            <div>
              <p className="font-medium text-gray-900 uppercase">Jewelry</p>

              <FooterCategories />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium text-gray-900 uppercase">Our Company</p>

              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <Link
                    href="/product"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    About Envvia
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/*<div>
              <p className="font-medium text-gray-900 uppercase">
                Connect Wtih Us
              </p>

              <ul className="mt-6 text-sm flex gap-2">
                <li>
                  <a
                    href="https://lookbooklab.com/"
                    className="text-gray-700 transition hover:opacity-75 w-[50px]"
                  >
                    <NextImage
                      alt={"Instagram"}
                      src={"/images/instagram.png"}
                      width={20}
                      height={20}
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="https://lookbooklab.com"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <NextImage
                      alt={"Instagram"}
                      src={"/images/little_red_book.png"}
                      width={20}
                      height={20}
                    />
                  </a>
                </li>
              </ul>
            </div>*/}
          </div>
        </div>

        <div className="mt-12 border-t border-black pt-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <p className="mt-8 text-xs text-gray-500 sm:mt-0">
              &copy; {new Date().getFullYear()}. Envvia. Lovingly crafted by{" "}
              <a
                href="https://lookbooklab.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lookbook Lab{" "}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
