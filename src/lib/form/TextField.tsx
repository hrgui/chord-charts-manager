import * as React from "react";
import MuiTextField from "@material-ui/core/TextField";
import { Field } from "./Field";

export const TextField: React.SFC<any> = props => {
  return <Field component={MuiTextField} {...props} />;
};
