import * as React from "react";
import { List, ListItemText } from "@material-ui/core";
import ListItemLink from "lib/layout/ListItemLink";
import ActionsMenu from "lib/table/ActionsMenu";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Pageview from "@material-ui/icons/Pageview";
import { isUserAdmin } from "../user/userUtils";
import { ListItem, ListItemIcon } from "@material-ui/core";
import { useUserData } from "lib/hooks/useUserData";
import useDeleteSetlistMutation from "./hooks/useDeleteSetlistMutation";
import { useTranslation } from "react-i18next";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import useAddToSetlistMutation from "./hooks/useAddToSetlistMutation";

interface SetlistActionsProps {
  setlist?: any;
  addToSetlistMode?: boolean;
  song_id?: string;
  onRequestClose?: () => any;
}

function SetlistActionsList({
  id,
  addToSetlistMode,
  song_id,
  onRequestClose,
}: {
  id;
  addToSetlistMode?;
  song_id?;
  onRequestClose?;
}) {
  const user = useUserData();
  const [deleteSetlist] = useDeleteSetlistMutation();
  const isAdmin = isUserAdmin(user);
  const { t } = useTranslation();
  const [addToSetlist] = useAddToSetlistMutation(id, song_id);

  if (addToSetlistMode) {
    return (
      <List dense>
        <ListItem
          button
          onClick={async (e) => {
            addToSetlist();
            onRequestClose();
          }}
        >
          <ListItemIcon>
            <PlaylistAdd />
          </ListItemIcon>
          <ListItemText primary={t("song:action/add_to_setlist")} />
        </ListItem>
        <ListItemLink to={`/setlist/${id}/edit?song_id=${song_id}`}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary={t("song:action/add_to_setlist_and_edit")} />
        </ListItemLink>
      </List>
    );
  }

  return (
    <List dense disablePadding>
      <ListItemLink to={`/setlist/${id}`}>
        <ListItemIcon>
          <Pageview />
        </ListItemIcon>
        <ListItemText primary={t("view")} />
      </ListItemLink>
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
    </List>
  );
}

const SetlistActions: React.SFC<SetlistActionsProps> = (props) => {
  return (
    <ActionsMenu>
      <SetlistActionsList
        id={props.setlist.id}
        addToSetlistMode={props.addToSetlistMode}
        song_id={props.song_id}
        onRequestClose={props.onRequestClose}
      />
    </ActionsMenu>
  );
};

export default SetlistActions;
