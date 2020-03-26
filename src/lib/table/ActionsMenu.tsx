import * as React from "react";
import MoreVert from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { Menu } from "../layout/Menu";

interface SetlistActionsProps {
  children?: any;
  id?: any;
}

const ActionsMenu: React.SFC<SetlistActionsProps> = props => {
  const { id = "actions-menu", children } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? id : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  );
};

export default ActionsMenu;
