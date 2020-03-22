import React from "react";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useDarkMode } from "lib/hooks/useDarkMode";
import gql from "graphql-tag";

interface IDarkThemeActionProps {}

const DarkThemeAction: React.FunctionComponent<
  IDarkThemeActionProps
> = props => {
  const [toggleDarkMode] = useMutation(
    gql`
      mutation {
        toggleDarkMode @client
      }
    `
  );
  const isDarkMode = useDarkMode();

  return (
    <ListItem button onClick={e => toggleDarkMode()}>
      <ListItemText primary={`Dark theme: ${isDarkMode ? "On" : "Off"}`} />
    </ListItem>
  );
};

export default DarkThemeAction;
