import React from "react";
import { keys } from "@hrgui/chord-charts/src/keys";

export default function getKeyAsOptions() {
  return keys.map(({ name }) => (
    <option key={name} value={name}>
      {name}
    </option>
  ));
}
