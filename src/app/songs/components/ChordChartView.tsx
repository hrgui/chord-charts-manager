// import * as React from "react";
// import { ReactChordChart } from "@hrgui/chord-charts-react";
// import styled from "styled-components/macro";

// interface ChordChartViewProps {
//   value?: string;
//   songKey?: string;
//   chordsDisabled?: boolean;
//   lyricsDisabled?: boolean;
//   overrideKey?: string;
// }

// const Container = styled.div`
//   display: inherit; /* pass through div */
//   .chord {
//     font-family: "Roboto Mono", monospace;
//     color: ${({ theme }) =>
//       theme.palette.type === "dark" ? "#add8e6" : "#2159df"};
//     font-weight: 500;
//   }
// `;

// export default function ChordChartViewCpt(props) {
//   const { value, chordsDisabled, lyricsDisabled, overrideKey } = props;
//   let { songKey = "C" } = props;
//   songKey = songKey || "C";

//   let songSection = new ReactChordChart(value, songKey);

//   if (overrideKey && songKey !== overrideKey) {
//     songSection.transpose(overrideKey);
//   }

//   return (
//     <Container>
//       {songSection.asReactElements({
//         chordClassName: "chord",
//         chordsDisabled,
//         lyricsDisabled
//       })}
//     </Container>
//   );
// }

import React from "react";

interface Props {}

const ChordChartView = (props: Props) => {
  return <div>Not Implemented Yet</div>;
};

export default ChordChartView;
