import * as React from "react";
import { List, ListItemIcon, ListItemText } from "@material-ui/core";
import ListItemLink from "lib/layout/ListItemLink";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import LibraryMusic from "@material-ui/icons/LibraryMusic";
import ListSubheader from "lib/layout/ListSubheader";
import { useTranslation } from "react-i18next";

export function SongsNavMenu() {
  const { t } = useTranslation();
  return (
    <List dense>
      <ListSubheader>{t("song:plural")}</ListSubheader>
      <ListItemLink to="/song/new">
        <ListItemIcon>
          <LibraryAdd />
        </ListItemIcon>
        <ListItemText primary={t("song:action/new_song")} />
      </ListItemLink>
      <ListItemLink to="/songs">
        <ListItemIcon>
          <LibraryMusic />
        </ListItemIcon>
        <ListItemText primary={t("song:action/list_song")} />
      </ListItemLink>
    </List>
  );
}

export default SongsNavMenu;
