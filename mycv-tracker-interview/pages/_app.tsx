import "styles/globals.scss";
import type { AppProps } from "next/app";
import React, { ReactElement } from "react";
import TopNavigation from "../components/TopNavigation";
import BottomFooter from "../components/BottomFooter";

import styles from "../styles/app.module.css";
import Head from "next/head";
import { UserStateProvider } from "../hooks/useUserState";
import { ToastProvider } from "../hooks/useToast";

import { AppShell, Header, MantineProvider, ScrollArea } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="top-right" zIndex={2077}>
        <ToastProvider>
          <UserStateProvider>
            <>
              <Head>
                <title>Dev Interview</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
              </Head>
              <AppShell
                padding={0}
                navbarOffsetBreakpoint="sm"
                navbar={<Sidebar />}
                header={
                  <Header height={70} px="md" fixed={true} style={{ backgroundColor: "#1e222c", zIndex: 11 }}>
                    <TopNavigation />
                  </Header>
                }
              >
                <ScrollArea>
                  <div className={styles.componentContainer}>
                    <div className={styles.component}>
                      <Component {...pageProps} />
                    </div>
                    <BottomFooter />
                  </div>
                </ScrollArea>
              </AppShell>
            </>
          </UserStateProvider>
        </ToastProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
