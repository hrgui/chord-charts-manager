import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { ApolloProvider as RealApolloProvider } from "@apollo/client";

import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./AppThemeProvider";
import { SnackbarProvider } from "notistack";
import client from "app/graphql/client";
import { StoreProvider } from "easy-peasy";
import { configureStore } from "app/store";
import PageLoading from "lib/layout/PageLoading";

interface AppControllerProps {
  children?;
  store?;
  apolloClient?;
  config?;
  initialState?;
  history?;
  apolloProviderProps?;
  componentProviderOverrides?;
}

export function AppController({
  children,
  store = configureStore(),
  apolloClient = client,
  initialState = null,
  config = null,
  history,
  componentProviderOverrides = {},
  apolloProviderProps = {},
}: AppControllerProps) {
  if (config || initialState) {
    store = configureStore({
      initialState: initialState || {
        uiState: config,
      },
    });
  }
  // const Router: any = history ? TestRouter : BrowserRouter;

  const Router = !componentProviderOverrides.Router
    ? BrowserRouter
    : componentProviderOverrides.Router;

  const ApolloProvider = !componentProviderOverrides.ApolloProvider
    ? RealApolloProvider
    : componentProviderOverrides.ApolloProvider;

  return (
    <Suspense fallback={<PageLoading />}>
      <StylesProvider injectFirst>
        <StoreProvider store={store}>
          <ApolloProvider client={apolloClient} {...apolloProviderProps}>
            <HelmetProvider>
              <Router history={history}>
                <AppThemeProvider>
                  <SnackbarProvider>{children}</SnackbarProvider>
                </AppThemeProvider>
              </Router>
            </HelmetProvider>
          </ApolloProvider>
        </StoreProvider>
      </StylesProvider>
    </Suspense>
  );
}

export default AppController;
