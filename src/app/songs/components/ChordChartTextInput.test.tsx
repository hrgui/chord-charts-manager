import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ChordChartTextInput from "./ChordChartTextInput";

test("ChordChartTextInput - on value change", () => {
  const onValueChange = jest.fn();
  const { container } = render(
    <ChordChartTextInput
      value={`A B C \n Test`}
      onValueChange={onValueChange}
    />
  );
  const textarea = container.querySelector("textarea");
  fireEvent.change(textarea!, { target: { value: `A B C \n Test 2` } });
  expect(onValueChange).toHaveBeenCalled();
});
