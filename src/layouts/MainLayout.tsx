import type { FC, PropsWithChildren } from "react";

import Head from "next/head";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <div>
    <Head>
      <title>ApartX Cleaning</title>
      <meta name="description" content="ApartX Cleaning App" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    {children}
  </div>
);
