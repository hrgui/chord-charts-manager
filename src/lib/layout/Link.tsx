import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import styled from "styled-components";

const StyledLink = styled(MuiLink)`
  color: ${({ theme }) =>
    theme.palette.type === "dark"
      ? theme.palette.primary["light"]
      : theme.palette.primary["dark"]};
`;

const Link = ({ classes, className, ...props }: any) => {
  return (
    <StyledLink className={className} component={ReactRouterLink} {...props} />
  );
};

export default Link;
