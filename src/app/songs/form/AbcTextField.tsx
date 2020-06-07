import * as React from "react";

import { FastField as Field, FieldConfig } from "formik";

import { TextField } from "@material-ui/core";
import { AbcNotationView } from "../components/AbcNotationView";

interface AbcTextFieldProps extends FieldConfig {
  label?;
  fullWidth?;
}

const AbcTextField: React.SFC<AbcTextFieldProps> = (props) => {
  const { name, ...otherProps } = props;
  return (
    <Field name={name} {...otherProps}>
      {({ field }) => {
        return (
          <div>
            <TextField
              label={props.label}
              {...field}
              multiline
              fullWidth={props.fullWidth}
            />
            <AbcNotationView value={field.value} />
          </div>
        );
      }}
    </Field>
  );
};

export default AbcTextField;
