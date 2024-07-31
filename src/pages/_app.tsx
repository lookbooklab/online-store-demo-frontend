import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
