import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import SetlistNavMenu from "./SetlistsNavMenu";

test("it renders a list with setlist actions", () => {
  const { getByText } = render(<SetlistNavMenu />);
  expect(getByText("New Setlist")).toBeInTheDocument();
  expect(getByText("All Setlists")).toBeInTheDocument();
});
