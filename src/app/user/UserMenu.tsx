import React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import { Divider, ListItemText, ListSubheader, List } from "@material-ui/core";
import { useUserData } from "lib/hooks/useUserData";
import { getWorkAsUser } from "./userUtils";
import OtherSettingsNavMenu from "./OtherSettingsMenu";
import { useTranslation } from "react-i18next";

export function WorkAsMenuList({ workAsUser }) {
  const { t } = useTranslation();
  return (
    <List>
      <ListSubheader>
        {t(`user/work_as`, { userDisplayName: workAsUser.displayName })}
      </ListSubheader>
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
  const { t } = useTranslation();

  return (
    <List>
      <ListSubheader>
        {t("user/logged_in_as", { userDisplayName })}
      </ListSubheader>
      {workAsUser && <WorkAsMenuList workAsUser={workAsUser} />}
      <ListItemLink onClick={onItemClick} to="/my-profile">
        <ListItemText primary={t(`user/my_profile`)} />
      </ListItemLink>
      <Divider />
      <ListItemLink onClick={onItemClick} to="/logout">
        <ListItemText primary={t(`action/logout`)} />
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
