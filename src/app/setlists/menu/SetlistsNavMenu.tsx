import * as React from "react";
import { List, ListItemIcon, ListItemText } from "@material-ui/core";
import ListItemLink from "lib/layout/ListItemLink";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import QueueMusic from "@material-ui/icons/QueueMusic";
import ListSubheader from "lib/layout/ListSubheader";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export function SetlistsNavMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <List dense>
      <ListSubheader>{t("setlist:plural")}</ListSubheader>
      <ListItemLink
        to={{
          pathname: "/setlist/new",
          state: { background: location }
        }}
      >
        <ListItemIcon>
          <PlaylistAdd />
        </ListItemIcon>
        <ListItemText primary={t("setlist:action/new_setlist")} />
      </ListItemLink>
      <ListItemLink to="/setlists">
        <ListItemIcon>
          <QueueMusic />
        </ListItemIcon>
        <ListItemText primary={t("setlist:action/list_setlist")} />
      </ListItemLink>
    </List>
  );
}

export default SetlistsNavMenu;
