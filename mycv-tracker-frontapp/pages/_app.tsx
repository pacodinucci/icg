import "styles/globals.scss";
import type { AppProps } from "next/app";
import React, { ReactElement } from "react";
import TopNavigation from "../components/TopNavigation";
import BottomFooter from "../components/BottomFooter";
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <TopNavigation />
      <Component {...pageProps} />
      <BottomFooter />
    </>
  );
}

export default MyApp;
