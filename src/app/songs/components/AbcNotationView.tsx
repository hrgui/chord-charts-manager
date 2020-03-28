import * as React from "react";
import abcjs from "abcjs/midi";
import "abcjs/abcjs-midi.css";
import styled from "styled-components/macro";

function colorRange(range, color) {
  if (range && range.elements) {
    range.elements.forEach(function(set) {
      set.forEach(function(item) {
        item.setAttribute("fill", color);
      });
    });
  }
}

export function animateCallback(lastRange, currentRange) {
  colorRange(lastRange, "#000000");
  colorRange(currentRange, "#3D9AFC");
}

const SheetMusicContainer = styled.div`
  & path {
    fill: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const AbcNotationView = ({ value }: { value? }) => {
  const sheetEl = React.useRef(null);
  const midiEl = React.useRef(null);

  React.useLayoutEffect(() => {
    const out = abcjs.renderAbc(sheetEl.current, value, {});

    if (!out) {
      return;
    }

    abcjs.renderMidi(midiEl.current, value, {
      animate: {
        listener: animateCallback,
        target: out[0],
        qpm: 120
      }
    });
  }, [value]);

  return (
    <>
      <SheetMusicContainer data-testid="abcnotationview" ref={sheetEl}>
        Sheet Music
      </SheetMusicContainer>
      <div ref={midiEl} data-testid="midiview">
        Midi
      </div>
    </>
  );
};
