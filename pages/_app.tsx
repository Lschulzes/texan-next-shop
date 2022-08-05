import { CssBaseline, ThemeProvider } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { UIProvider } from '../context';
import { UserProvider } from '../context/Auth';
import { CartProvider } from '../context/Cart';
import '../styles/globals.css';
import { lightTheme } from '../themes';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');

  return (
    <SWRConfig
      value={{
        fetcher: (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then((res) => res.json()),
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
