import React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import { ListItemText, List } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export function LoginMenuList() {
  const { t } = useTranslation();
  return (
    <List dense>
      <ListItemLink to="/login">
        <ListItemText primary={t("action/login")} />
      </ListItemLink>
    </List>
  );
}

export default LoginMenuList;
