import * as React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import Group from "@material-ui/icons/Group";
import GroupAdd from "@material-ui/icons/GroupAdd";
import ListItemLink from "lib/layout/ListItemLink";
import ListSubheader from "lib/layout/ListSubheader";
import ExpandLess from "@material-ui/icons/ExpandLess";

export function GroupMenu() {
  return (
    <List>
      <ListSubheader>Groups</ListSubheader>
      <ListItemLink to="/admin/groups">
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary={"All Groups"} />
      </ListItemLink>
      <ListItemLink to="/admin/group/new">
        <ListItemIcon>
          <GroupAdd />
        </ListItemIcon>
        <ListItemText primary={"New Group"} />
      </ListItemLink>
    </List>
  );
}

export function AdminMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <List>
        <ListItem button onClick={(_) => setOpen(!open)}>
          <ListItemText primary="Admin" />
          {open && (
            <ListItemIcon>
              <ExpandLess />
            </ListItemIcon>
          )}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <GroupMenu />
        </Collapse>
      </List>
    </>
  );
}

export default AdminMenu;
