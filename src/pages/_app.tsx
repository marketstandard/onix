import React from 'react';
import { ApolloProvider } from '@apollo/client';
// import ClientPing from 'components/ClientPing';
import '@copilotkit/react-ui/styles.css';
import { NextUIProvider } from '@nextui-org/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'prismjs/themes/prism-tomorrow.css';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useApollo } from 'services/client';
import { getIsNativePlatform } from 'utils/mobile/getIsNativePlatform';
// import { CurrentUserProvider } from 'context/CurrentUserContext';
// import { SessionProvider } from 'context/SessionContext';
import { ThemeProvider } from 'context/ThemeContext';
import { StorageContext } from 'context/storage/CombinedStorageContext';
import 'styles/globals.css';

const APP_VIEWPORT = 'viewport-fit=cover, width=device-width, initial-scale=1';
const WEB_VIEWPORT = 'width=device-width, initial-scale=1';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function App({ Component, pageProps, err }: AppProps & { err: any }) {
  const apolloClient = useApollo(pageProps);
  const viewport = getIsNativePlatform() ? APP_VIEWPORT : WEB_VIEWPORT;

  return (
    <>
      <Head>
        <meta name="viewport" content={viewport} />

        {/* meta */}
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href={`${process.env.APP_URL}/manifest.json`} />
        <link rel="shortcut icon" href={`${process.env.APP_URL}/icons/favicon.png`} />
        <meta name="application-name" content="" />
        <meta name="apple-mobile-web-app-title" content="" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        {/* <link rel="mask-icon" href="/favicon-mask.svg" color="#FFF" /> */}

        {/* apple */}
        <link rel="apple-touch-icon" href={`${process.env.APP_URL}/icons/apple-icon.png`} />
      </Head>

      <SessionProvider>
        <StorageContext>
          <ApolloProvider client={apolloClient}>
            {/* <CurrentUserProvider> */}
            <ThemeProvider>
              {/* <StripeProvider> */}
              {/* <ProductsProvider> */}
              <Elements stripe={stripePromise}>
                <NextUIProvider>
                  <div className="bg-background text-foreground dark">
                    <Component {...pageProps} err={err} />
                    <ToastContainer
                      theme="dark"
                      transition={Flip}
                      className="text-sm"
                      toastClassName="shadow-notification"
                      progressClassName="bg-brand-primary"
                      // autoClose={false}
                    />
                  </div>
                </NextUIProvider>
                {/* </StripeProvider> */}
              </Elements>
              {/* </ProductsProvider> */}
            </ThemeProvider>
            {/* </CurrentUserProvider> */}
          </ApolloProvider>
        </StorageContext>
      </SessionProvider>
    </>
  );
}