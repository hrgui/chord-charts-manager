import * as React from "react";
import { Button } from "@material-ui/core";
import { TextField } from "lib/form/TextField";
import ChordChartTextField from "./ChordChartTextField";
import AbcTextField from "./AbcTextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Delete from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";

interface SongSectionFieldPanelProps {
  onMoveDown?: () => any;
  onMoveUp?: () => any;
  onDelete?: () => any;
  isDownDisabled?: boolean;
  isUpDisabled?: boolean;
}

export const SongSectionFieldPanel: React.SFC<SongSectionFieldPanelProps> = ({
  onMoveDown,
  onMoveUp,
  isDownDisabled,
  isUpDisabled,
  onDelete
}) => {
  return (
    <div>
      <IconButton
        onClick={onMoveDown}
        disabled={isDownDisabled}
        data-testid="down"
      >
        <ArrowDownward />
      </IconButton>
      <IconButton onClick={onMoveUp} disabled={isUpDisabled} data-testid="up">
        <ArrowUpward />
      </IconButton>
      <Button onClick={onDelete} data-testid="delete">
        <Delete />
      </Button>
    </div>
  );
};

interface SongSectionFieldProps extends SongSectionFieldPanelProps {
  name?: string;
  type?: string;
}

export const SongSectionField: React.SFC<SongSectionFieldProps> = ({
  name,
  type = "chords",
  onMoveDown,
  onMoveUp,
  isDownDisabled,
  isUpDisabled,
  onDelete
}) => {
  const { t } = useTranslation();
  return (
    <>
      <TextField
        fullWidth
        label={t("song:label/section/title")}
        name={`${name}.title`}
      />
      <SongSectionFieldPanel
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
        isDownDisabled={isDownDisabled}
        isUpDisabled={isUpDisabled}
        onDelete={onDelete}
      />
      {type !== "abc" && (
        <ChordChartTextField
          label={t("song:label/section/body")}
          name={`${name}.body`}
        />
      )}
      {type === "abc" && (
        <AbcTextField
          fullWidth
          label={t("song:label/section/body")}
          name={`${name}.body`}
        />
      )}
    </>
  );
};
