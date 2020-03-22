import React from "react";
import AppThemeProvider from "./AppThemeProvider";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

test("should render exactly what you pass in since its a provider", async () => {
  const { getByText } = await render(
    <AppThemeProvider>learn react</AppThemeProvider>
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
