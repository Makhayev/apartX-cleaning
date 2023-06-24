import "../styles/globals.css";
import { observer } from "mobx-react-lite";
import type { AppProps } from "next/app";

import { MainLayout } from "@/layouts/MainLayout";

const MyApp = observer(({ Component, pageProps }: AppProps) => (
  <MainLayout>
    <Component {...pageProps} />
  </MainLayout>
));

export default MyApp;
