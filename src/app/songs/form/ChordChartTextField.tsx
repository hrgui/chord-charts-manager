import * as React from "react";
import { FastField as Field, FieldConfig } from "formik";
import ChordChartTextInput from "../components/ChordChartTextInput";
import { FormControl, InputLabel } from "@material-ui/core";

interface ChordChartTextFieldProps extends FieldConfig {
  label?;
}

const ChordChartTextField: React.SFC<ChordChartTextFieldProps> = ({
  name,
  label,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor={name}>
        {label}
      </InputLabel>
      <Field name={name} {...props}>
        {({ field, form }) => (
          <ChordChartTextInput
            value={field.value || ""}
            onValueChange={(value) => form.setFieldValue(name, value)}
          />
        )}
      </Field>
    </FormControl>
  );
};

export default ChordChartTextField;
