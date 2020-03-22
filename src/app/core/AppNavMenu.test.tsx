import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import AppNavMenu from "./AppNavMenu";

it("should at least have the Dark theme switch and the name of the app", () => {
  const APP_NAME = "Chord Charts";
  const { getByText } = render(<AppNavMenu />, {
    config: { appName: APP_NAME }
  });
  const el = getByText(/Dark theme/);
  expect(el).toBeInTheDocument();
  const el2 = getByText(APP_NAME);
  expect(el2).toBeInTheDocument();
});
