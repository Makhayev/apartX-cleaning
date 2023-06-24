import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";
import { observer } from "mobx-react-lite";
import type { AppProps } from "next/app";
import "dayjs/locale/ru";

import { SnackbarProvider } from "notistack";

import { MainLayout } from "@/layouts/MainLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = observer(({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    locale={locale}
    theme={{
      token: {
        colorPrimary: "#1195FF",
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SnackbarProvider>
    </QueryClientProvider>
  </ConfigProvider>
));

export default MyApp;
