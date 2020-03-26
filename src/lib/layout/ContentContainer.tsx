import * as React from "react";
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
  return <StyledContentContainer>{children}</StyledContentContainer>;
}

export default ContentContainer;
