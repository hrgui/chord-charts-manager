import * as React from "react";
import { Dialog, DialogProps, makeStyles, Theme } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles<Theme, DialogProps>((theme) => {
  return {};
});

export function RouteModal(props: DialogProps) {
  const classes = useStyles(props);
  const history = useHistory();

  return (
    <Dialog
      onClose={(e, reason) => {
        console.log(reason);
        history.goBack();
      }}
      classes={classes}
      scroll="paper"
      transitionDuration={{ enter: 0, exit: 0 }}
      {...props}
    />
  );
}

export default RouteModal;
