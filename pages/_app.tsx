import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";
import { SWRConfig } from "swr";
import { UIProvider } from "../context";
import { CartProvider } from "../context/Cart";
import { UserProvider } from "../context/Auth";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, init).then((res) => res.json()),
      }}
    >
      <SessionProvider session={session}>
        <CartProvider>
          <UserProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />

                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </UserProvider>
        </CartProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
