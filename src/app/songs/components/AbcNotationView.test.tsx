import React from "react";
import { fireEvent } from "@testing-library/react";
import { AbcNotationView, animateCallback } from "./AbcNotationView";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

test("basic usage - should render an svg properly", () => {
  const { getByTestId } = render(
    <AbcNotationView value="CDEFGABC'D'E'F'G'A'B'C''" />
  );
  const el = getByTestId("abcnotationview");
  expect(el.innerHTML).toContain("svg");
});

test("can be rendered with no value", () => {
  const { getByTestId } = render(<AbcNotationView />);
  expect(getByTestId("abcnotationview")).toBeInTheDocument();
});

// this test is incomplete - ideally jsdom should play or figure out how to call the callbacks
test("basic usage - when user clicks on midi", () => {
  const { getByTestId } = render(
    <AbcNotationView value="CDEFGABC'D'E'F'G'A'B'C''" />
  );
  const el = getByTestId("midiview").querySelector(".abcjs-midi-start");
  fireEvent.click(el);
  expect(el).toBeInTheDocument();
});

function createMockSvgPath() {
  const fragment = document.createElement("svg");
  fragment.innerHTML = `<path d="M 47.051 80.507 L 60.861000000000004 80.507 L 60.861000000000004 81.207 L 47.051 81.207 z" stroke="none" fill="#000000" class=""></path>`;
  fragment.setAttribute = jest.fn();
  return fragment;
}

test("animateCallback - basic scenario cases since midijs cant be tested in a throughly fashion", () => {
  const elementSet = [createMockSvgPath(), createMockSvgPath()];
  let beforeRange = null;
  let currentRange = {
    type: "event",
    milliseconds: 0,
    line: 0,
    measureNumber: 0,
    top: 22.559999999999995,
    height: 98.9845,
    left: 49.051,
    width: 9.81,
    elements: [elementSet],
    startChar: 0,
    endChar: 1,
    startCharArray: [0],
    endCharArray: [1],
    measureStart: true
  };
  animateCallback(beforeRange, currentRange);
  expect(elementSet[0].setAttribute).toHaveBeenCalled();
  expect(elementSet[1].setAttribute).toHaveBeenCalled();
});
