import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import AppBar from "./AppBar";
import { fireEvent } from "@testing-library/react";
import { useStoreState } from "app/store";

const observeMock = {
  observe: () => null,
  disconnect: () => null // maybe not needed
};

beforeEach(() => {
  (window as any).IntersectionObserver = jest
    .fn()
    .mockImplementation(() => observeMock);
});

function TestMenuStateDisplay() {
  const navMenuHidden = useStoreState(state => state.uiState.navMenuHidden);
  return <>{navMenuHidden ? "nav_menu_off" : "nav_menu_open"}</>;
}

test("should at least render with a menu item which can toggle the menu state", () => {
  const { getByTestId, getByText } = render(
    <>
      <AppBar />
      <TestMenuStateDisplay />
    </>
  );
  const el = getByTestId("navMenuToggle");
  expect(el).toBeInTheDocument();
  const el2 = getByText("nav_menu_open");
  expect(el2).toBeInTheDocument();
  fireEvent.click(el);
  expect(getByText("nav_menu_off")).toBeInTheDocument();
});
