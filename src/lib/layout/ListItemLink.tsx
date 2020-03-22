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

const MemoNavLink = React.forwardRef<any, any>((props, ref) => {
  return (
    <>
      <span ref={ref}></span>
      <ReactRouterNavLink {...props} />
    </>
  );
});

const ListItemLink = ({ ...props }: any) => {
  return <StyledListItem button component={MemoNavLink} exact {...props} />;
};

export default ListItemLink;
