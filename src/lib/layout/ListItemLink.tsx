import * as React from "react";
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import styled from "styled-components";

const activeClassName = `ListItemLink-active`;
const StyledListItem = styled(ListItem).attrs({ activeClassName })`
  &.${activeClassName} {
    background: ${({ theme }) => theme.palette.background.default};
  }
`;

const ListItemLink = ({ ...props }: any) => (
  <StyledListItem button component={ReactRouterNavLink} exact {...props} />
);

export default ListItemLink;
