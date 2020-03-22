import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppThemeProvider } from "./AppThemeProvider";
import { SnackbarProvider } from "notistack";
import client from "app/graphql/client";
import { StoreProvider } from "easy-peasy";
import { configureStore } from "app/store";

interface AppControllerProps {
  children?;
  store?;
  apolloClient?;
  config?;
  initialState?;
}

export function AppController({
  children,
  store = configureStore(),
  apolloClient = client,
  initialState = null,
  config = null
}: AppControllerProps) {
  if (config || initialState) {
    store = configureStore({
      initialState: initialState || {
        uiState: config
      }
    });
  }
  return (
    <StylesProvider injectFirst>
      <StoreProvider store={store}>
        <ApolloProvider client={apolloClient}>
          <HelmetProvider>
            <Router>
              <AppThemeProvider>
                <SnackbarProvider>{children}</SnackbarProvider>
              </AppThemeProvider>
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      </StoreProvider>
    </StylesProvider>
  );
}

export default AppController;
