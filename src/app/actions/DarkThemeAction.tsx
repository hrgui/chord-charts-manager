import React from "react";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { useDarkMode } from "lib/hooks/useDarkMode";
import { useStoreActions } from "app/store";
import { useTranslation } from "react-i18next";

interface IDarkThemeActionProps {}

const DarkThemeAction: React.FunctionComponent<IDarkThemeActionProps> = () => {
  const { t } = useTranslation();
  const toggleDarkMode = useStoreActions(
    actions => actions.uiState.toggleDarkMode
  );
  const isDarkMode = useDarkMode();

  return (
    <ListItem button onClick={e => toggleDarkMode()}>
      <ListItemText
        primary={t(`action/dark_theme/${isDarkMode ? "on" : "off"}`)}
      />
    </ListItem>
  );
};

export default DarkThemeAction;
