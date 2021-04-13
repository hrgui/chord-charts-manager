import React from "react";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  ThemeProviderProps,
} from "@material-ui/core";
import theme from "./theme";

const ThemeProvider = (props: Omit<ThemeProviderProps, "theme">) => {
  const { children, ...otherProps } = props;
  return (
    <MuiThemeProvider theme={theme(true)} {...otherProps}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
