import React from "react";
import { NativeSelect } from "@material-ui/core";
import { keys } from "@hrgui/chord-charts";

function KeysSelect(props) {
  return (
    <NativeSelect {...props}>
      <option value="">-</option>
      {keys.map((key) => (
        <option key={key.name} value={key.name}>
          {key.name}
        </option>
      ))}
    </NativeSelect>
  );
}
