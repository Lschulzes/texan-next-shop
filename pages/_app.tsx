import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";
import { SWRConfig } from "swr";
import { UIProvider } from "../context";
import { CartProvider } from "../context/Cart";
import { UserProvider } from "../context/Auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, init).then((res) => res.json()),
      }}
    >
      <UserProvider>
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />

              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </UserProvider>
    </SWRConfig>
  );
}

export default MyApp;
