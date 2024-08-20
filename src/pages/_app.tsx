import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleTagManager } from "@next/third-parties/google";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Toaster />
        <Head>
          <title>Ennvia - Jewelry Personal Shopping Service</title>
          <meta
            name="description"
            content="Envvia | Jewelry Personal Shopping Service"
          />
          <meta property="og:image" content="/envvia-meta.jpg" />
          <meta property="og:title" content="Envvia" />
          <meta property="og:url" content="https://envvia.com" />
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
          {/*<script
            async
            defer
            data-website-id="3f477a12-63f3-452b-99dd-4ac217a68678"
            src="https://gempathy-umami.herokuapp.com/umami.js"
          ></script>*/}
        </Head>
        <Component {...pageProps} />
        <GoogleTagManager gtmId="AW-16674086775" />
      </QueryClientProvider>
    </SessionProvider>
  );
}
