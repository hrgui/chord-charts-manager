import React from "react";
import Editor from "react-simple-code-editor";

import { transpose, keys, wrap } from "@hrgui/chord-charts";

function chordChartHighlight(input) {
  return wrap(input, (x) => `<span class="chord">${x}</span>`);
}

export function ChordChartEditor({ value, onValueChange }) {
  return (
    <Editor
      onValueChange={onValueChange}
      value={value}
      highlight={(code) => chordChartHighlight(code)}
      style={{
        color: "black",
        minWidth: "100%",
        fontFamily: '"Fira code", "Fira Mono", monospace',
        marginTop: 20,
        marginBottom: 10,
        paddingBottom: 10,
        fontSize: 14,
        borderBottom: "1px solid #ccc",
      }}
    />
  );
}
