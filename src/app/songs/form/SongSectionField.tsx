import * as React from "react";
import { Button } from "@material-ui/core";
import { TextField } from "lib/form/TextField";
import ChordChartTextField from "./ChordChartTextField";
import AbcTextField from "./AbcTextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Delete from "@material-ui/icons/Delete";

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
  return (
    <div>
      <TextField fullWidth label="Section Title" name={`${name}.title`} />
      <SongSectionFieldPanel
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
        isDownDisabled={isDownDisabled}
        isUpDisabled={isUpDisabled}
        onDelete={onDelete}
      />
      {type !== "abc" && (
        <ChordChartTextField label="Body" name={`${name}.body`} />
      )}
      {type === "abc" && (
        <AbcTextField fullWidth label="Body" name={`${name}.body`} />
      )}
    </div>
  );
};
