import * as React from "react";
import SetlistTitleCell from "./SetlistTitleCell";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

test("renders setlist Title given a setlist", () => {
  const { container } = render(
    <SetlistTitleCell data={{ _id: 123 }} value="Donald Duck Setlist" />
  );
  expect(container).toMatchSnapshot();
});
