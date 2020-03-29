import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Router as TestRouter } from "react-router-dom";
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
}

export function AppController({
  children,
  store = configureStore(),
  apolloClient = client,
  initialState = null,
  config = null,
  history
}: AppControllerProps) {
  if (config || initialState) {
    store = configureStore({
      initialState: initialState || {
        uiState: config
      }
    });
  }
  const Router: any = history ? TestRouter : BrowserRouter;

  return (
    <Suspense fallback={<PageLoading />}>
      <StylesProvider injectFirst>
        <StoreProvider store={store}>
          <ApolloProvider client={apolloClient}>
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
