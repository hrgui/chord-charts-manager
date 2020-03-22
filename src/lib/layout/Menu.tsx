import { Menu as MuiMenu } from "@material-ui/core";

import React from "react";

export const Menu = props => {
  // horizontal should be undefined
  return (
    <MuiMenu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      {...props}
    />
  );
};
