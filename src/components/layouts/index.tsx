import Footer from "./footer";
import Header from "./header";
import { ThemeProvider } from "@/providers/theme-provider";

export default function LayoutMain({ children }: { children: JSX.Element }) {
  return (
    <>
      <ThemeProvider>
        <Header></Header>
        {children}
        <Footer></Footer>
      </ThemeProvider>
    </>
  );
}
