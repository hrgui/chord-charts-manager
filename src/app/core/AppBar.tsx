import * as React from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classnames from "classnames";
import styled from "styled-components";
import { UserAvatar } from "../user/UserAvatar";
import ConnectedUserGroupSelector from "../user/UserGroupSelector";
import UserMenu from "../user/UserMenu";
import { Menu } from "lib/layout/Menu";
import { WithWidth } from "lib/layout/WithWidth";
import { useUserData } from "lib/hooks/useUserData";
import useMenuSetup from "lib/hooks/useMenuSetup";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import { useAppBarActions } from "lib/hooks/useAppBarActions";

interface NavBarProps {
  classes?: any;
  navMenuHidden?: boolean;
  title?: string;
  subtitle?: string;
  onShowNavMenu?: () => any;
  onHideNavMenu?: () => any;
  rightPanel?: any;
  userPanel?: any;
  state?: string;
  appName?: string;
}

export function AppBarTitle({ children }) {
  return (
    <Typography variant="h6" color="inherit">
      {children}
    </Typography>
  );
}

export function AppBarSubtitle({ children }) {
  return (
    <Typography variant="subtitle1" color="inherit">
      {children}
    </Typography>
  );
}

function useIntersection(options) {
  const [observerEntry, setEntry] = React.useState({});
  const elRef = React.useRef(null);

  React.useEffect(() => {
    if (!elRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => setEntry(entries[0]),
      options
    );
    observer.observe(elRef.current as any);
    return () => observer.disconnect();
  }, [elRef.current]);
  return { observerEntry, elRef };
}
const StyledAppBar = styled(MuiAppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};

  &.AppBar-isTopBar {
    box-shadow: none;
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: -18px;
  margin-right: 10px;
`;

const TopBarContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const LeftSide = styled.div`
  &.LeftSide-songBarTextMobile {
    & h6 {
      max-width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
const RightSide = styled.div`
  margin-left: auto;
`;

export const AppBar = (props: NavBarProps) => {
  const {
    navMenuHidden = false,
    onShowNavMenu,
    onHideNavMenu,
    title,
    userPanel,
    state
  } = props;
  const hasDualBar = state === "song" || state === "setlist";
  const { observerEntry, elRef } = useIntersection({ threshold: 1 });
  const { setStickyState } = useAppBarActions();
  const isSingle = !(observerEntry as any).isIntersecting;

  React.useEffect(() => {
    setStickyState(isSingle);
    return () => {
      setStickyState(false);
    };
  }, [isSingle]);

  const leftIcon = (
    <StyledIconButton
      data-testid={"navMenuToggle"}
      onClick={navMenuHidden ? onShowNavMenu : onHideNavMenu}
      color="inherit"
      aria-label="Menu"
    >
      <MenuIcon />
    </StyledIconButton>
  );

  return (
    <>
      <StyledAppBar
        position={"sticky"}
        color="primary"
        className={classnames("print-hidden", {
          ["AppBar-isTopBar"]: hasDualBar
        })}
      >
        <div ref={elRef} />
        <Toolbar>
          <TopBarContent>
            {leftIcon}
            <LeftSide>
              {state === "song" || state === "setlist" ? (
                <div id="songTitle"></div>
              ) : (
                <AppBarTitle>{title}</AppBarTitle>
              )}
            </LeftSide>
            <RightSide>{userPanel}</RightSide>
          </TopBarContent>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

const UserMenuChildren = styled.div`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
`;

const ConnectedUserPanel = styled((props: any) => {
  const user = useUserData();
  const { isOpen, anchorEl, handleClick, handleClose }: any = useMenuSetup();

  if (!user) {
    return null;
  }

  return (
    <WithWidth>
      {({ width }) => {
        return (
          <div className={props.className}>
            <UserAvatar
              style={{ cursor: "pointer" }}
              onClick={handleClick}
              photoURL={user.photoURL}
              displayName={user.displayName}
            />
            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
              <UserMenuChildren>
                <ConnectedUserGroupSelector />
              </UserMenuChildren>
              <UserMenu onItemClick={handleClose} />
            </Menu>
          </div>
        );
      }}
    </WithWidth>
  );
})`
  display: flex;

  & .groupSelectorInAppBar {
    color: inherit;
    border-bottom-color: inherit;
    &:before {
      border-bottom-color: inherit;
    }

    & svg {
      color: inherit;
    }
  }
`;

const ConnectedAppBar = (props: NavBarProps) => {
  const config = useGetAppBarData();
  const { toggleNavMenu } = useAppBarActions();

  if (!config) {
    return null;
  }

  const {
    page: { title, subtitle }
  } = config;
  return (
    <>
      <AppBar
        appName={config.appName}
        state={config.navBarState}
        title={title}
        subtitle={subtitle}
        navMenuHidden={config.navMenuHidden}
        onShowNavMenu={toggleNavMenu}
        onHideNavMenu={toggleNavMenu}
        userPanel={<ConnectedUserPanel />}
      />
    </>
  );
};

export default ConnectedAppBar;
