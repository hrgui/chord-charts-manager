import React from "react";
import { transpose, wrap } from "@hrgui/chord-charts";
import styled from "styled-components/macro";

interface Props {
  value?: string;
  songKey?: string;
  chordsDisabled?: boolean;
  lyricsDisabled?: boolean;
  overrideKey?: string;
}

const Container = styled.div`
  display: inherit; /* pass through div */
  .chord {
    font-family: "Roboto Mono", monospace;
    color: ${({ theme }) => (theme.palette.type === "dark" ? "#add8e6" : "#2159df")};
    font-weight: 800;
  }
`;

function chordChartHighlight(input) {
  return wrap(input, (x) => `<span class="chord">${x}</span>`);
}

const ChordChartView = ({ value, overrideKey, songKey }: Props) => {
  if (overrideKey && songKey !== overrideKey) {
    value = transpose(value!, songKey!, overrideKey!);
  }

  return (
    <Container>
      <pre dangerouslySetInnerHTML={{ __html: chordChartHighlight(value) }} />
    </Container>
  );
};

export default ChordChartView;
