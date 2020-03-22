import { useState } from "react";

export default function useMenuSetup(props?: any) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    props && props.handleClick(event);
    setAnchorEl(event.currentTarget);
  }
  function handleClose(event) {
    props && props.handleClose(event);
    setAnchorEl(null);
  }

  return { isOpen: Boolean(anchorEl), anchorEl, handleClick, handleClose };
}
