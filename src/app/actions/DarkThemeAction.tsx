import React from "react";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { useDarkMode } from "lib/hooks/useDarkMode";
import { useStoreActions } from "app/store";

interface IDarkThemeActionProps {}

const DarkThemeAction: React.FunctionComponent<IDarkThemeActionProps> = () => {
  const toggleDarkMode = useStoreActions(
    actions => actions.uiState.toggleDarkMode
  );
  const isDarkMode = useDarkMode();

  return (
    <ListItem button onClick={e => toggleDarkMode()}>
      <ListItemText primary={`Dark theme: ${isDarkMode ? "On" : "Off"}`} />
    </ListItem>
  );
};

export default DarkThemeAction;
