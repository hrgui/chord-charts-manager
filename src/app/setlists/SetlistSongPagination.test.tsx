import React from "react";
import { fireEvent } from "@testing-library/react";
import { SetlistSongPagination } from "./SetlistSongPagination";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

test("prev clicked - onChange receives -1 to signal upstream to wrap", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <SetlistSongPagination currentIndex={0} length={10} onChange={onChange} />
  );
  const prevEl = getByTestId("prev");
  fireEvent.click(prevEl);
  expect(onChange).toHaveBeenCalledWith(-1);
});

test("next clicked - onChange receives 10 to signal upstream to wrap", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <SetlistSongPagination currentIndex={9} length={10} onChange={onChange} />
  );
  const nextEl = getByTestId("next");
  fireEvent.click(nextEl);
  expect(onChange).toHaveBeenCalledWith(10);
});

test("page clicked - 8 - should get 7 for upstream", () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <SetlistSongPagination currentIndex={9} length={10} onChange={onChange} />
  );
  const nextEl = getByText("8");
  fireEvent.click(nextEl);
  expect(onChange).toHaveBeenCalledWith(7);
});

test("page clicked - 8 - should get 7 for upstream, with rerender to 7 then user clicks Next to go to 8", () => {
  const onChange = jest.fn();
  const { getByText, getByTestId, rerender } = render(
    <SetlistSongPagination currentIndex={9} length={10} onChange={onChange} />
  );
  const nextEl = getByText("8");
  fireEvent.click(nextEl);
  expect(onChange).toHaveBeenCalledWith(7);

  rerender(
    <SetlistSongPagination currentIndex={7} length={10} onChange={onChange} />
  );
  fireEvent.click(getByTestId("next"));
  expect(onChange).toHaveBeenCalledWith(8);
});
