import React from "react";
import { transpose, wrap, allChords } from "@hrgui/chord-charts";
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

function chordChartHighlight(input, chordsDisabled, lyricsDisabled?) {
  const contents = wrap(input, (x) => (chordsDisabled ? "" : `<span class="chord">${x}</span>`));

  if (lyricsDisabled && !chordsDisabled) {
    // const pre = document.createElement("pre");
    // pre.innerHTML = contents;

    // const allChildNodes = Array.from(pre.childNodes);

    // for (const childNode of allChildNodes) {
    //   if (childNode.nodeType === Node.TEXT_NODE) {
    //     if (childNode.textContent?.trim() === "") {
    //       continue; // retain the spaces - we check if we trim and its resolves to ""
    //     }
    //     console.log(childNode.textContent);
    //     pre.removeChild(childNode);
    //   }
    // }

    // return pre.textContent || "";

    return allChords(input)
      .map((x) => `<span class="chord">${x}</span>`)
      .join(" ");
  }

  if (chordsDisabled && lyricsDisabled) {
    return "";
  }

  return contents;
}

const ChordChartView = ({ value, overrideKey, songKey, chordsDisabled, lyricsDisabled }: Props) => {
  if (overrideKey && songKey && songKey !== overrideKey) {
    value = transpose(value!, songKey!, overrideKey!);
  }

  return (
    <Container>
      <pre
        dangerouslySetInnerHTML={{
          __html: chordChartHighlight(value, chordsDisabled, lyricsDisabled),
        }}
      />
    </Container>
  );
};

export default ChordChartView;
