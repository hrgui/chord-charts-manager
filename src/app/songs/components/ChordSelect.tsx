import * as React from "react";
import { NativeSelect } from "@material-ui/core";
import getKeyAsOptions from "./utils/getKeyAsOptions";

interface ChordSelectProps {
  value?: string;
  name?: string;
  onChange?: (e) => any;
  className?: string;
  classes?: any;
}

const ChordSelect: React.SFC<ChordSelectProps> = props => {
  return <NativeSelect {...props}>{getKeyAsOptions()}</NativeSelect>;
};

export default ChordSelect;
