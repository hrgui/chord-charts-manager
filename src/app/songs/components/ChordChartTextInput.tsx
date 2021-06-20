// import * as React from "react";
// // import Editor from "react-simple-code-editor";
// // import { ReactChordChart } from "@hrgui/chord-charts-react";
// import { withTheme } from "@material-ui/core";

// interface ChordChartTextInputProps {
//   value?: string;
//   onValueChange?: (code) => any;
// }

// function chordChartHighlight(code) {
//   // let songSection = new ReactChordChart(code, "C");
//   // return songSection.asReactElements();
// }

// const ChordChartTextInput = withTheme(
//   ({ value = "", theme, className, onValueChange = code => null }: any) => {
//     return (
//       <Editor
//         className={className}
//         value={value}
//         onValueChange={code => onValueChange(code)}
//         highlight={code => chordChartHighlight(code)}
//         style={{
//           color: theme.palette.text.primary,
//           minWidth: "100%",
//           fontFamily: '"Fira code", "Fira Mono", monospace',
//           marginTop: 20,
//           marginBottom: 10,
//           paddingBottom: 10,
//           fontSize: 14,
//           borderBottom: "1px solid #ccc"
//         }}
//       />
//     );
//   }
// );

// export default ChordChartTextInput;

import React from "react";

interface Props {}

const ChordChartTextInput = (props: Props) => {
  return <div>Not Implemented Yet</div>;
};

export default ChordChartTextInput;
