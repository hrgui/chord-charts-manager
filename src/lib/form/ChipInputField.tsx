import * as React from "react";
import ChipInput from "material-ui-chip-input";
import { FastField } from "formik";

export const ChipInputField: React.SFC<any> = ({ name, ...otherProps }) => (
  <FastField name={name}>
    {({ field, form }) => {
      const { setFieldValue, values = {} } = form;
      return (
        <ChipInput
          classes={null}
          onAdd={chip => {
            setFieldValue(field.name, [...(values[field.name] || []), chip]);
          }}
          onDelete={chip =>
            setFieldValue(
              field.name,
              values[field.name].filter(tag => tag !== chip)
            )
          }
          value={values[field.name] || []}
          {...otherProps}
        />
      );
    }}
  </FastField>
);
