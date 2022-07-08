import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, init).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
