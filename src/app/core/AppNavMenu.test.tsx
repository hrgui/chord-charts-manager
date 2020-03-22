import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import AppNavMenu from "./AppNavMenu";

it("should at least have the Dark theme switch", () => {
  const { getByText } = render(<AppNavMenu />);
  const el = getByText(/Dark theme/);
  expect(el).toBeInTheDocument();
});
