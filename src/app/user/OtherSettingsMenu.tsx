import React from "react";
import { List } from "@material-ui/core";
import DarkThemeAction from "app/actions/DarkThemeAction";

export const OtherSettingsNavMenu = () => {
  return (
    <List>
      <DarkThemeAction />
    </List>
  );
};

export default OtherSettingsNavMenu;
