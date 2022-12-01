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
import Sidebar from "../components/Sidebar";

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
              <Sidebar />
              <div className={styles.componentContainer}>
                <div className={styles.component}>
                  <Component {...pageProps} />
                </div>
                <BottomFooter />
              </div>
            </div>
          </div>
        </UserStateProvider>
      </ToastProvider>
    </MantineProvider>
  );
}

export default MyApp;
