import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import LoginMenuList from "./LoginMenuList";

test("it renders a list with login", () => {
  const { getByText } = render(<LoginMenuList />);
  expect(getByText("Login")).toBeInTheDocument();
});
