import React from "react";
import styled from "styled-components/macro";
import Head from "./Head";
import { CssBaseline } from "@material-ui/core";
import AppNavMenu from "./AppNavMenu";
import ContentContainer from "lib/layout/ContentContainer";
import AppBar from "./AppBar";
import WidthListener from "lib/layout/WidthListener";
import ControlsPanel from "app/controls/ControlsPanel";
import { ControlsBar } from "app/controls/ControlsBar";

const AppContainer = styled.div`
  display: flex;
`;

export function AppLayout({ children }: { children? }) {
  return (
    <>
      <Head />
      <CssBaseline />
      <AppContainer>
        <AppNavMenu />
        <ContentContainer>
          <AppBar />
          <ControlsPanel />
          {children}
          <ControlsBar />
        </ContentContainer>
      </AppContainer>
      <WidthListener />
    </>
  );
}

export default AppLayout;
