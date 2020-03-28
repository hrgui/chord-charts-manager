import React from "react";
import { renderWithForm } from "testUtils/renderWithForm";
import ChordSelect from "./ChordSelect";

test("ChordSelect - default case - A, B, C should be an option in a ChordSelect", () => {
  const { queryByText } = renderWithForm(() => <ChordSelect />);
  expect(queryByText("A")).toBeInTheDocument();
  expect(queryByText("B")).toBeInTheDocument();
  expect(queryByText("C")).toBeInTheDocument();
});
