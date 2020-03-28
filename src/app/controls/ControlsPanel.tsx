import React from "react";
import { Drawer, IconButton } from "@material-ui/core";
import styled from "styled-components/macro";
import { CurrentSetlistNavMenuPlaceholder } from "../setlists/CurrentSetlistNavMenu";
import { CurrentSongNavMenuPlaceholder } from "../songs/CurrentSongNavMenu";
import classnames from "classnames";
import { ToolbarSpacer } from "lib/layout/ToolbarSpacer";
import { WithWidth } from "lib/layout/WithWidth";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import Close from "@material-ui/icons/Close";

const CONTROL_PANEL_WIDTH = "426px";

const StyledDrawer = styled(Drawer)`
  flex-shrink: 0;

  .controlsPanel-permanent {
    width: ${CONTROL_PANEL_WIDTH};
  }

  .controlsPanel-temporary {
    width: 100vw;
  }

  &.drawerHidden,
  & .drawerPaperHidden {
    width: 0;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 6px;
  z-index: 9001;
`;

export const ToggleControlsPanelAction = ({ children }: { children? }) => {
  const { toggleControlsPanel } = useAppBarActions();

  return <>{children(toggleControlsPanel)}</>;
};

export const ControlsPanel = () => {
  const config = useGetAppBarData();

  if (!config) {
    return null;
  }

  const { navBarState, controlsPanelHidden } = config;

  if (navBarState === "main") {
    return null;
  }

  return (
    <WithWidth>
      {({ width }) => {
        const shouldDrawerBeTemporary =
          width === "sm" || width === "xs" || width === "md";
        const variant = shouldDrawerBeTemporary ? "temporary" : "permanent";

        return (
          <StyledDrawer
            open={!controlsPanelHidden}
            ModalProps={{ keepMounted: true }}
            classes={{
              paper: classnames("drawerPaper", `controlsPanel-${variant}`, {
                // TODO: this used to be !open
                drawerPaperHidden: controlsPanelHidden
              })
            }}
            anchor="right"
            variant={variant}
          >
            {!shouldDrawerBeTemporary && <ToolbarSpacer single />}
            {shouldDrawerBeTemporary && (
              <ToggleControlsPanelAction>
                {toggleControlsPanel => (
                  <StyledIconButton onClick={e => toggleControlsPanel()}>
                    <Close />
                  </StyledIconButton>
                )}
              </ToggleControlsPanelAction>
            )}
            <div id="songVideo" />
            <CurrentSetlistNavMenuPlaceholder />
            <CurrentSongNavMenuPlaceholder />
          </StyledDrawer>
        );
      }}
    </WithWidth>
  );
};

export default ControlsPanel;
