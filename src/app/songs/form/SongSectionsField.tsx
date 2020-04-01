import * as React from "react";
import { FieldArray } from "formik";
import Button from "@material-ui/core/Button";
import { SongSectionField } from "./SongSectionField";
import { Paper, makeStyles, Theme, ButtonGroup } from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme: Theme) => ({
  controlsBar: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  songSection: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export function SongSectionsField({ name, ...otherProps }) {
  const classes = useStyles(otherProps);
  return (
    <FieldArray name={name} {...otherProps}>
      {({ move, remove, push, form }) => {
        const sections = form.values[name];
        return (
          <>
            <Paper className={classes.controlsBar}>
              <ButtonGroup variant="outlined">
                <Button
                  onClick={e => push({ body: " " })}
                  startIcon={<AddBox />}
                >
                  Text Chord Chart
                </Button>
                <Button
                  onClick={e => push({ type: "abc", body: " " })}
                  startIcon={<AddBox />}
                >
                  ABC Chart
                </Button>
              </ButtonGroup>
            </Paper>
            {sections &&
              sections.map((section, i) => (
                <Paper className={classes.songSection}>
                  <SongSectionField
                    key={i}
                    type={section.type}
                    onMoveDown={() => move(i, i + 1)}
                    onMoveUp={() => move(i, i - 1)}
                    isUpDisabled={i === 0}
                    isDownDisabled={i === sections.length - 1}
                    onDelete={() => remove(i)}
                    name={`sections[${i}]`}
                  />
                </Paper>
              ))}
          </>
        );
      }}
    </FieldArray>
  );
}
