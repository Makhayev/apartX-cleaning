import type { NextPage } from "next";
import Head from "next/head";

import { MainLayout } from "@/layouts/MainLayout";

const Home: NextPage = () => (
  <MainLayout>
    <div>
      <Head>
        <title>ApartX Cleaning</title>
        <meta name="description" content="ApartX Cleaning App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <div className="flex justify-center text-Bold32 text-dark">
          Apart-X cleaning app
        </div>
        <div className="mt-10 flex justify-center text-Bold20">
          Coming soon...
        </div>
      </main>
    </div>
  </MainLayout>
);

export default Home;
