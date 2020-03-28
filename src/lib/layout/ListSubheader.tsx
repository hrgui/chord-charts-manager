import * as React from "react";
import { ListSubheader as MuiListSubheader } from "@material-ui/core";
import classnames from "classnames";
import styled from "styled-components/macro";

const StyledListSubHeader = styled(MuiListSubheader)`
  & .root {
    background: ${({ theme }) => theme.palette.background.paper};
  }
`;

export const ListSubheader = ({ className, ...props }: any) => {
  return (
    <StyledListSubHeader
      {...props}
      classes={{ root: classnames("root", className) }}
    />
  );
};

export default ListSubheader;
