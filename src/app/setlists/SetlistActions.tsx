import * as React from "react";
import { List, ListItemText } from "@material-ui/core";
import ListItemLink from "lib/layout/ListItemLink";
import ActionsMenu from "lib/table/ActionsMenu";
import Delete from "@material-ui/icons/Delete";
import { isUserAdmin } from "../user/userUtils";
import { ListItem, ListItemIcon } from "@material-ui/core";
import { useUserData } from "lib/hooks/useUserData";
import useDeleteSetlistMutation from "./hooks/useDeleteSetlistMutation";
import { useTranslation } from "react-i18next";

interface SetlistActionsProps {
  setlist?: any;
}

function SetlistActionsList({ id }) {
  const user = useUserData();
  const [deleteSetlist] = useDeleteSetlistMutation();
  const isAdmin = isUserAdmin(user);
  const { t } = useTranslation();

  return (
    <List>
      <ListItemLink to={`/setlist/${id}`}>
        <ListItemText primary={t("view")} />
      </ListItemLink>
      <ListItemLink to={`/setlist/${id}/edit`}>
        <ListItemText primary={t("edit")} />
      </ListItemLink>
      {isAdmin && (
        <ListItem
          button
          onClick={async () => {
            const { extensions } = await deleteSetlist({
              variables: { id: id }
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

const SetlistActions: React.SFC<SetlistActionsProps> = props => {
  return (
    <ActionsMenu>
      <SetlistActionsList id={props.setlist.id} />
    </ActionsMenu>
  );
};

export default SetlistActions;
