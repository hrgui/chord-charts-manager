import React from "react";
import { renderWithForm } from "testUtils/renderWithForm";
import ChordChartTextField from "./ChordChartTextField";

test("ChordChartTextField - case when theres no value, should have something to edit with, something to display it", () => {
  const { container } = renderWithForm(() => (
    <ChordChartTextField name="chart" />
  ));
  expect(container.querySelector("textarea")).toBeInTheDocument();
  expect(container.querySelector("pre")).toBeInTheDocument();
});

test("ChordChartTextField - case when theres value provided by form", () => {
  const chart = `A B C \n Test`;
  const { getAllByText } = renderWithForm(
    () => <ChordChartTextField name="chart" />,
    {
      initialValues: {
        chart
      },
      onSubmit: () => null
    }
  );
  const els = getAllByText(/Test/);
  expect(els.length).toEqual(2);
});
