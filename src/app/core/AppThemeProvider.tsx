import React from "react";
import { createMuiTheme } from "@material-ui/core";
import theme from "lib/theme/theme";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "lib/hooks/useDarkMode";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";

export function AppThemeProvider({ children }) {
  const isDarkMode = useDarkMode();
  const _theme: any = theme(isDarkMode);
  const __theme = createMuiTheme(_theme);

  return (
    <ThemeProvider theme={__theme}>
      <MuiThemeProvider theme={__theme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  );
}

export default AppThemeProvider;
