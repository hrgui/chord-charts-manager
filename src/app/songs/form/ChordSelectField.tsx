import * as React from "react";
import { InputLabel, FormControl } from "@material-ui/core";
import { Field } from "lib/form/Field";
import ChordSelect from "../components/ChordSelect";

export const ChordSelectField: React.SFC<any> = ({ name, label, ...props }) => {
  return (
    <FormControl>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field component={ChordSelect} label={label} name={name} {...props} />
    </FormControl>
  );
};

export default ChordSelectField;
