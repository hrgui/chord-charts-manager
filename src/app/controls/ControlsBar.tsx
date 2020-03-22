import * as React from "react";
import { AppBar as MuiAppBar, Toolbar } from "@material-ui/core";
import classnames from "classnames";
import styled from "styled-components";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import { WithWidth } from "lib/layout/WithWidth";
import { NAV_MENU_WIDTH } from "app/core/AppNavMenu";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { IconButton } from "@material-ui/core";
import { ToggleControlsPanelAction } from "./ControlsPanel";

export const SongControlsBarPlaceholder = () => {
  return (
    <>
      <div id="songKey"></div>
      <div id="songControlsBar"></div>
    </>
  );
};

export const AppBar = styled(MuiAppBar)`
  top: auto;
  bottom: 0;
  z-index: ${props => props.theme.zIndex.drawer + 1};
  background: ${({ theme }) => theme.palette.background.paper};

  &.navMenuShown-desktop {
    left: ${NAV_MENU_WIDTH};
    width: calc(100vw - ${NAV_MENU_WIDTH});
  }
`;

export const ControlsBarRightPanel = styled.div`
  margin-left: auto;
`;

export const ControlsBar = () => {
  const config = useGetAppBarData();
  const { toggleControlsPanel } = useAppBarActions();

  if (!config) {
    return null;
  }

  const { navBarState, navMenuHidden } = config;

  if (!(navBarState === "setlist" || navBarState === "song")) {
    return null;
  }

  return (
    <WithWidth>
      {({ width }) => {
        const shouldDrawerBeTemporary =
          width === "sm" || width === "xs" || width === "md";

        return (
          <AppBar
            className={classnames("print-hidden", {
              "navMenuShown-desktop": !navMenuHidden && !shouldDrawerBeTemporary
            })}
            color="default"
            position="fixed"
          >
            <Toolbar variant="dense">
              <SongControlsBarPlaceholder />
              <div id="setlistControls" />
              <ControlsBarRightPanel>
                <ToggleControlsPanelAction>
                  {toggleControlsPanel => {
                    return (
                      <IconButton onClick={e => toggleControlsPanel()}>
                        <MoreHoriz />
                      </IconButton>
                    );
                  }}
                </ToggleControlsPanelAction>
              </ControlsBarRightPanel>
            </Toolbar>
          </AppBar>
        );
      }}
    </WithWidth>
  );
};
