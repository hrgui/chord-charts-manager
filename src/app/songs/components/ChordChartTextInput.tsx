import * as React from "react";
import Editor from "react-simple-code-editor";
import { wrap } from "@hrgui/chord-charts";
import { useTheme } from "@material-ui/core";
import styled from "styled-components/macro";

interface ChordChartTextInputProps {
  value?: string;
  onValueChange?: (code) => any;
  className?: string;
}

function chordChartHighlight(input) {
  return wrap(input, (x) => `<span class="chord">${x}</span>`);
}

const Container = styled.div`
  display: inherit; /* pass through div */
  .chord {
    font-family: "Roboto Mono", monospace;
    color: ${({ theme }) => (theme?.palette?.type === "dark" ? "#add8e6" : "#2159df")};
    font-weight: 800;
  }
`;

const ChordChartTextInput = ({
  value = "",
  className,
  onValueChange = (code) => null,
}: ChordChartTextInputProps) => {
  const theme = useTheme();
  return (
    <Container>
      <Editor
        className={className}
        value={value}
        onValueChange={(code) => onValueChange(code)}
        highlight={(code) => chordChartHighlight(code)}
        style={{
          color: theme.palette.text.primary,
          minWidth: "100%",
          fontFamily: '"Fira code", "Fira Mono", monospace',
          marginTop: 20,
          marginBottom: 10,
          paddingBottom: 10,
          fontSize: 14,
          borderBottom: "1px solid #ccc",
        }}
      />
    </Container>
  );
};

export default ChordChartTextInput;
