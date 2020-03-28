import * as React from "react";
import { Field, FieldProps } from "lib/form/Field";
import ChordChartTextInput from "../components/ChordChartTextInput";
import { FormControl, InputLabel } from "@material-ui/core";

interface ChordChartTextFieldProps extends FieldProps {}

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
      <Field
        name={name}
        render={({ field, form }) => (
          <ChordChartTextInput
            value={field.value || ""}
            onValueChange={value => form.setFieldValue(name, value)}
          />
        )}
        {...props}
      />
    </FormControl>
  );
};

export default ChordChartTextField;
