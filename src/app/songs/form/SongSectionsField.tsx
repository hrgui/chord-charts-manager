import * as React from "react";
import { FieldArray } from "formik";
import Button from "@material-ui/core/Button";
import { SongSectionField } from "./SongSectionField";

export function SongSectionsField({ name, ...otherProps }) {
  return (
    <FieldArray name={name} {...otherProps}>
      {({ move, remove, push, form }) => {
        const sections = form.values[name];
        return (
          <>
            <Button onClick={e => push({ body: " " })}>
              Add Text Chord Chart
            </Button>
            <Button onClick={e => push({ type: "abc", body: " " })}>
              Add ABC Chart
            </Button>
            {sections &&
              sections.map((section, i) => (
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
              ))}
          </>
        );
      }}
    </FieldArray>
  );
}
