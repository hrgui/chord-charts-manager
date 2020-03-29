import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import SongForm from "./SongForm";
import { act } from "react-dom/test-utils";
import { wait, fireEvent } from "@testing-library/react";

test("it should render a form without any values if given none", () => {
  const onSubmit = jest.fn();
  const { getByText } = render(<SongForm data={{}} onSubmit={onSubmit} />);
  expect(getByText(/Save/)).toBeInTheDocument();
});

it("should not allow any submits with everything empty", async () => {
  const onSubmit = jest.fn();
  const { getByText, debug } = render(
    <SongForm data={{}} onSubmit={onSubmit} />
  );
  const saveBtn = getByText(/Save/);
  expect(saveBtn).toBeInTheDocument();
  act(() => {
    fireEvent.click(saveBtn);
  });
  await wait();
  expect(onSubmit).not.toHaveBeenCalled();
});

test("it should render a form with values if given none initially but after was given values, and you can click on submit", async () => {
  const onSubmit = jest.fn();
  const { getByText, rerender, debug } = render(
    <SongForm data={{}} onSubmit={onSubmit} />
  );
  const saveBtn = getByText(/Save/);
  expect(saveBtn).toBeInTheDocument();

  rerender(
    <SongForm
      data={{ title: "My Song", key: "C", artist: "Me" }}
      onSubmit={onSubmit}
    />
  );

  act(() => {
    fireEvent.click(saveBtn);
  });
  await wait();

  expect(onSubmit).toHaveBeenCalled();
  expect(onSubmit.mock.calls[0][0]).toEqual({
    title: "My Song",
    key: "C",
    artist: "Me"
  });
});
