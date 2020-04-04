import { Menu as MuiMenu } from "@material-ui/core";

import React from "react";

export const Menu = (props) => {
  return (
    <MuiMenu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      {...props}
    />
  );
};
