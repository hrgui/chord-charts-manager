import { AppBar, Toolbar } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ToolbarSpacer } from "lib/layout/ToolbarSpacer";
import { getOrCreateElement } from "lib/layout/portalSelector";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  top: auto;
  text-align: right;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  background: ${({ theme }) => theme.palette.background.paper};
`;

const StyledToolbar = styled(Toolbar)`
  flex-direction: row-reverse;
`;

const FormActions = ({ children }: any) => {
  const [el, setEl] = useState<any>(null);

  useLayoutEffect(() => {
    const formActions = document.createElement("div");
    formActions.id = "formActions";
    document.body.appendChild(formActions);
    setEl(formActions);
    return () => {
      document.body.removeChild(formActions);
    };
  }, []);

  if (!el) {
    return null;
  }

  return (
    <>
      <ToolbarSpacer />
      {ReactDOM.createPortal(
        <StyledAppBar color="default" position="fixed">
          <StyledToolbar>{children}</StyledToolbar>
        </StyledAppBar>,
        getOrCreateElement("#formActions")!
      )}
    </>
  );
};

export default FormActions;
