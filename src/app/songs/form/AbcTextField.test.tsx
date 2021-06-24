import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithForm } from "testUtils/renderWithForm";
import AbcTextField from "./AbcTextField";

afterEach(cleanup);

test.skip("AbcTextField - case when theres no value", () => {
  const { getByText } = renderWithForm(() => <AbcTextField name="chart" />);
  expect(getByText(/Sheet Music/)).toBeInTheDocument();
  expect(getByText(/Midi/)).toBeInTheDocument();
});

test.skip("AbcTextField - case when theres value provided by form", () => {
  const text = `CDEFGABC'D'E'F'G'A'B'C''`;
  const { getByText } = renderWithForm(() => <AbcTextField name="chart" />, {
    initialValues: {
      chart: text,
    },
    onSubmit: () => null,
  });
  expect(getByText(text)).toBeInTheDocument();
});
