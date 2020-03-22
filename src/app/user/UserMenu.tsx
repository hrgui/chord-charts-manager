import React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import { Divider, ListItemText, ListSubheader, List } from "@material-ui/core";
import { useUserData } from "lib/hooks/useUserData";
import { getWorkAsUser } from "./userUtils";
import OtherSettingsNavMenu from "./OtherSettingsMenu";

export function WorkAsMenuList({ workAsUser }) {
  return (
    <List>
      <ListSubheader>Working as {workAsUser.displayName}</ListSubheader>
    </List>
  );
}

export function UserMenuList({
  userDisplayName = "",
  workAsUser,
  onItemClick
}: {
  userDisplayName?;
  workAsUser?;
  onItemClick?;
}) {
  return (
    <List>
      <ListSubheader>Logged in as {userDisplayName}</ListSubheader>
      {workAsUser && <WorkAsMenuList workAsUser={workAsUser} />}
      <ListItemLink onClick={onItemClick} to="/my-profile">
        <ListItemText primary={"My Profile"} />
      </ListItemLink>
      <Divider />
      <ListItemLink onClick={onItemClick} to="/logout">
        <ListItemText primary={"Logout"} />
      </ListItemLink>
    </List>
  );
}

export function UserMenu({ onItemClick }) {
  const user = useUserData();
  const workAsUser = getWorkAsUser(user);

  if (!user) {
    return null;
  }

  return (
    <>
      <UserMenuList
        userDisplayName={user.displayName}
        workAsUser={workAsUser}
        onItemClick={onItemClick}
      />
      <Divider />
      <OtherSettingsNavMenu />
    </>
  );
}

export default UserMenu;