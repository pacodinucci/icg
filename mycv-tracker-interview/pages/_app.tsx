import "styles/globals.scss";
import type { AppProps } from "next/app";
import React, { ReactElement } from "react";
import TopNavigation from "../components/TopNavigation";
import BottomFooter from "../components/BottomFooter";

import styles from "../styles/app.module.css";
import Head from "next/head";
import { UserStateProvider } from "../hooks/useUserState";
import { ToastProvider } from "../hooks/useToast";

import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ToastProvider>
        <UserStateProvider>
          <div className={styles.container}>
            <Head>
              <title>Dev Interview</title>
              <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <TopNavigation />
            <div className={styles.pageContainer}>
              <Component {...pageProps} />
            </div>
            <BottomFooter />
          </div>
        </UserStateProvider>
      </ToastProvider>
    </MantineProvider>
  );
}

export default MyApp;
