import * as React from "react";
import { Field, FieldProps } from "lib/form/Field";
import { TextField } from "@material-ui/core";
import { AbcNotationView } from "../components/AbcNotationView";

interface AbcTextFieldProps extends FieldProps {}

const AbcTextField: React.SFC<AbcTextFieldProps> = props => {
  const { name, ...otherProps } = props;
  return (
    <Field
      render={({ field }) => {
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
      name={name}
      {...otherProps}
    />
  );
};

export default AbcTextField;
