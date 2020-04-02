import * as React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import classnames from "classnames";
import ListItemLink from "lib/layout/ListItemLink";
import Home from "@material-ui/icons/Home";
import { WithWidth } from "lib/layout/WithWidth";
import styled from "styled-components/macro";
// import { isUserAdmin, isUserWorkingAs } from "../user/userUtils";
import { useUserData } from "lib/hooks/useUserData";
// import AdminMenu from "./admin/AdminMenu";
import SongsNavMenu from "app/songs/menu/SongsNavMenu";
import SetlistsNavMenu from "app/setlists/menu/SetlistsNavMenu";
import LoginMenuList from "app/session/LoginMenuList";
import OtherSettingsNavMenu from "app/user/OtherSettingsMenu";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";

export interface NavMenuProps {
  classes?: any;
}

export function HomeNavMenu() {
  return (
    <List dense>
      <ListItemLink to="/">
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={"Home"} />
      </ListItemLink>
    </List>
  );
}

export const NAV_MENU_WIDTH = "240px";

const StyledDrawer = styled(Drawer)`
  width: ${NAV_MENU_WIDTH};
  flex-shrink: 0;

  & .drawerPaper {
    width: ${NAV_MENU_WIDTH};
  }

  &.drawerHidden,
  & .drawerPaperHidden {
    width: 0;
  }
`;

export function NavMenuItems({ user }) {
  return (
    <>
      <HomeNavMenu />
      <Divider />
      <Divider />
      <SongsNavMenu />
      <Divider />
      <SetlistsNavMenu />
      <Divider />
      {/* {isUserAdmin(user) && !isUserWorkingAs(user) && <AdminMenu />} */}
    </>
  );
}

const NavMenuTitle = styled.div`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
  height: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
`;

export function AppNavMenu(props: NavMenuProps) {
  const config = useGetAppBarData();
  const user = useUserData();
  const { toggleNavMenu } = useAppBarActions();

  if (!config) {
    return null;
  }

  const { navMenuHidden } = config;

  return (
    <WithWidth>
      {({ width }) => {
        const shouldDrawerBeTemporary =
          width === "sm" || width === "xs" || width === "md";

        const variant = shouldDrawerBeTemporary ? "temporary" : "permanent";
        return (
          <StyledDrawer
            anchor={shouldDrawerBeTemporary ? undefined : "left"}
            open={!navMenuHidden}
            onClose={toggleNavMenu}
            variant={variant}
            classes={{
              paper: classnames("drawerPaper", {
                drawerPaperHidden: navMenuHidden
              })
            }}
            ModalProps={{ keepMounted: true }}
            className={classnames("print-hidden", {
              drawerHidden: navMenuHidden
            })}
          >
            <NavMenuTitle>{config.appName}</NavMenuTitle>
            <Divider />
            {user ? (
              <NavMenuItems user={user} />
            ) : (
              <>
                <LoginMenuList />
                <Divider />
                <OtherSettingsNavMenu />
              </>
            )}
          </StyledDrawer>
        );
      }}
    </WithWidth>
  );
}

export default AppNavMenu;
