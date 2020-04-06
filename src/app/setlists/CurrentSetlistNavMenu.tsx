import * as React from "react";
import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import ListItemLink from "lib/layout/ListItemLink";
import { ListSubheader } from "lib/layout/ListSubheader";
import { isUserAdmin } from "../user/userUtils";
import Delete from "@material-ui/icons/Delete";
import { useUserData } from "lib/hooks/useUserData";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Skeleton } from "@material-ui/lab";
import ChordSelect from "app/songs/components/ChordSelect";
import UntrackedSettings from "@material-ui/icons/CallMerge";
import useDeleteSetlistMutation from "./hooks/useDeleteSetlistMutation";
import { useTranslation } from "react-i18next";

export function CurrentSetlistNavMenuPlaceholder() {
  return <div id="currentSetlistNavMenu" />;
}

export interface CurrentSetlistNavMenuProps {
  setlist;
  title?: string;
  onChangeSettings?: any;
  settings;
  hasUnsavedSettings;
  onSaveSetlistSettings;
}

export function SetlistNavigation({ id, songs, settings, onChangeSettings }) {
  const { t } = useTranslation();
  const { data, loading } = useQuery(
    gql`
      query getSetlistSongs($id: ID) {
        songs: setlistSongs(id: $id) {
          id
          title
          key
        }
      }
    `,
    { variables: { id } }
  );

  const fetchedSongs = data && data.songs;

  function handleChangeSettings(x, id) {
    onChangeSettings({ overrideKey: x }, { id });
  }

  return (
    <List>
      <ListSubheader>{t("setlist:menu/navigation/title")}</ListSubheader>
      {songs.map((song, idx) => {
        const hidx = idx + 1;
        const sid = song;
        const fetchedSong = fetchedSongs && fetchedSongs[idx];

        return (
          <ListItemLink to={`/setlist/${id}/${hidx}`} key={hidx}>
            {loading && !fetchedSong ? (
              <Skeleton width={Math.floor(Math.random() * 426)} height={16} />
            ) : (
              <>
                <ListItemText
                  primary={`${hidx}. ${fetchedSong?.title}`}
                ></ListItemText>
                <ChordSelect
                  onChange={(e) => handleChangeSettings(e.target.value, sid)}
                  value={
                    (settings[sid] && settings[sid].overrideKey) ||
                    fetchedSong.key
                  }
                />
              </>
            )}
          </ListItemLink>
        );
      })}
    </List>
  );
}

export function CurrentSetlistNavMenu(props: CurrentSetlistNavMenuProps) {
  const {
    title = "",
    onChangeSettings,
    settings = {},
    onSaveSetlistSettings,
    hasUnsavedSettings,
  } = props;
  const { t } = useTranslation();
  const { id, songs = [] } = props.setlist;
  const user = useUserData();
  const [deleteSetlist] = useDeleteSetlistMutation();
  const isAdmin = isUserAdmin(user);

  return (
    <List dense>
      <ListSubheader>{title}</ListSubheader>
      <Divider />
      <ListSubheader>{t("setlist:menu/controls/title")}</ListSubheader>
      {hasUnsavedSettings && (
        <ListItem button onClick={(e) => onSaveSetlistSettings(settings)}>
          <ListItemIcon>
            <UntrackedSettings />
          </ListItemIcon>
          {t("save_changes")}
        </ListItem>
      )}
      <ListItemLink to={`/setlist/${id}/edit`}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary={t("edit")} />
      </ListItemLink>
      {isAdmin && (
        <ListItem
          button
          onClick={async () => {
            const { extensions } = await deleteSetlist({
              variables: { id: id },
            });

            if (extensions && extensions.cancelled) {
              return;
            }

            window.location.href = "/setlists";
          }}
        >
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary={t("delete")} />
        </ListItem>
      )}
      <Divider />
      <SetlistNavigation
        id={id}
        onChangeSettings={onChangeSettings}
        songs={songs}
        settings={settings}
      />
    </List>
  );
}
