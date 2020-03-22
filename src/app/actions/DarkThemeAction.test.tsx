import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import DarkThemeAction from "./DarkThemeAction";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CHORD_CHARTS_DARK_MODE_KEY } from "app/store/uiState";

afterEach(() => {
  window.localStorage.setItem(CHORD_CHARTS_DARK_MODE_KEY, "false");
});

it("should render the component, when clicking, should toggle the dark mode", () => {
  const { getByText } = render(<DarkThemeAction />);
  const el = getByText(/Dark theme: Off/i);
  expect(el).toBeInTheDocument();

  act(() => {
    fireEvent.click(el);
  });
  const el2 = getByText(/Dark theme: On/i);
  expect(el2).toBeInTheDocument();
});

it("should be set to whatever the local storage is saying (true === On)", () => {
  window.localStorage.setItem(CHORD_CHARTS_DARK_MODE_KEY, "true");
  const { getByText } = render(<DarkThemeAction />);
  const el = getByText(/Dark theme: On/i);
  expect(el).toBeInTheDocument();
});

it("should be set to whatever the local storage is saying (false === Off)", () => {
  const { getByText } = render(<DarkThemeAction />);
  const el = getByText(/Dark theme: Off/i);
  expect(el).toBeInTheDocument();
});
