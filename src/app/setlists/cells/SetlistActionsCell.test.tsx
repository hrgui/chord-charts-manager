import * as React from "react";
import { render } from "@testing-library/react";
import SetlistActionsCell from "./SetlistActionsCell";

test("renders setlist actions given a setlist", () => {
  const { container } = render(<SetlistActionsCell data={{}} />);
  expect(container).toMatchSnapshot();
});
