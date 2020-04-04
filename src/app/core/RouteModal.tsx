import * as React from "react";
import { Dialog, DialogProps, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme, DialogProps>(theme => {
  return {};
});

export function RouteModal(props: DialogProps) {
  const classes = useStyles(props);

  return (
    <Dialog
      classes={classes}
      scroll="paper"
      transitionDuration={{ enter: 0, exit: 0 }}
      {...props}
    />
  );
}

export default RouteModal;
