import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import PageLoading from "./layout/Loading";
import { Provider } from "react-redux";
import ThemeProvider from "./theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import defaultStore from "../../store";

interface AppProviderProps {
  children?;
  store?;
  apolloClient?;
  config?;
  initialState?;
  history?;
  apolloProviderProps?;
  componentProviderOverrides?;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function AppProvider({ children, store = defaultStore }: AppProviderProps) {
  return (
    <Suspense fallback={<PageLoading />}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <Router>
                <ThemeProvider>
                  <SnackbarProvider>{children}</SnackbarProvider>
                </ThemeProvider>
              </Router>
            </HelmetProvider>
          </QueryClientProvider>
        </Provider>
      </StylesProvider>
    </Suspense>
  );
}

export default AppProvider;
