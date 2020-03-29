import React from "react";
import { renderWithForm } from "testUtils/renderWithForm";
import ChordSelectField from "./ChordSelectField";

test("default case - A, B, C should be an option in a ChordSelect", () => {
  const { queryByText } = renderWithForm(() => <ChordSelectField name="key" />);
  expect(queryByText("A")).toBeInTheDocument();
  expect(queryByText("B")).toBeInTheDocument();
  expect(queryByText("C")).toBeInTheDocument();
});
