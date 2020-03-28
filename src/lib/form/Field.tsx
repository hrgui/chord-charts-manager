import * as React from "react";
import { FastField, FieldConfig } from "formik";

export interface FieldProps extends FieldConfig {
  component?: any;
  defaultValue?: any;
  [other: string]: any;
}

export const Field: React.SFC<FieldProps> = props => {
  const { component, children, ...otherProps } = props;
  let render: any;

  if (component && !props.render) {
    render = props => {
      const { field, form } = props;
      const c = React.createElement(component, {
        ...field,
        form,
        defaultValue:
          otherProps.defaultValue || (!field.value ? "" : undefined),
        children,
        ...otherProps
      });

      return <>{c}</>;
    };
  }

  const { render: _render, ..._otherProps } = otherProps;

  return <FastField {..._otherProps}>{otherProps.render || render}</FastField>;
};
