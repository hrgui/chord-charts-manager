import React from "react";
import ListItemLink from "./ListItemLink";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

test("ListItemLink - default state", async () => {
  const { container } = await render(<ListItemLink to="/test" />);
  expect(container.firstChild).toMatchSnapshot();
});
