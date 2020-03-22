import React from 'react';
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppThemeProvider } from './AppThemeProvider';
import { SnackbarProvider } from "notistack";
import client from 'app/graphql/client';

export function AppController({
  children,
  apolloClient = client
}) {
  return (
    <StylesProvider injectFirst>
      <ApolloProvider client={apolloClient}>
        <HelmetProvider>
          <Router>
            <AppThemeProvider>
              <SnackbarProvider>
                {children}
              </SnackbarProvider>
            </AppThemeProvider>
          </Router>
        </HelmetProvider>
      </ApolloProvider>
    </StylesProvider>
  );
}

export default AppController;