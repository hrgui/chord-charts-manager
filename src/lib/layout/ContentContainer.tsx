import * as React from "react";
import { ToolbarSpacer } from "./ToolbarSpacer";
import styled from "styled-components";

export interface ContentContainerProps {
  children?;
  classes?;
}

const StyledContentContainer = styled.div`
  flex-grow: 1;
  min-height: 100vh;
  width: 100%;
`;

export function ContentContainer(props: ContentContainerProps) {
  const { children } = props;
  return (
    <StyledContentContainer>
      {children}
      <ToolbarSpacer single force />
    </StyledContentContainer>
  );
}

export default ContentContainer;
