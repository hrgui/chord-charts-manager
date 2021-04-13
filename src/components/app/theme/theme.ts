import createMuiTheme, { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

const theme = (darkMode): ThemeOptions =>
  createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#2196f3",
      },
    },
    typography: {
      fontSize: 13,
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
    overrides: {
      MuiAvatar: {
        root: {
          width: 30,
          height: 30,
        },
      },
    },
  });

export default theme;
