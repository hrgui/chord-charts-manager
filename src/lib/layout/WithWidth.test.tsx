import React from "react";
import { WithWidth } from "./WithWidth";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

test("should be defined as a render props component", () => {
  const children = jest.fn().mockImplementation(() => <div>Hello</div>);
  render(<WithWidth>{children}</WithWidth>);
  expect(children).toHaveBeenCalled();
});
