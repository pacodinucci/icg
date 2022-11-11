import "styles/globals.scss";
import type { AppProps } from "next/app";
import React, { ReactElement } from "react";
import TopNavigation from "../components/TopNavigation";
import BottomFooter from "../components/BottomFooter";

import styles from "../styles/app.module.css";
import Head from "next/head";
import { UserStateProvider } from "../hooks/useUserState";
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <UserStateProvider>
      <div className={styles.container}>
        <Head>
          <title>Dev My CV Tracker</title>
        </Head>
        <TopNavigation />
        <div className={styles.pageContainer}>
          <Component {...pageProps} />
        </div>
        <BottomFooter />
      </div>
    </UserStateProvider>
  );
}

export default MyApp;
