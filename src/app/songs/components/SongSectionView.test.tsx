import React from "react";
import { fireEvent } from "@testing-library/react";
import SongSectionView from "./SongSectionView";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

test("SongSectionView - hide prop", () => {
  const { queryByTestId } = render(<SongSectionView hide />);
  expect(queryByTestId("sectionview-hidden")).not.toBeNull();
});

test("SongSectionView - normal usage - can be used without key", () => {
  const section = {
    title: "Hello world",
    body: "A B C \n Test",
  };
  const { queryByText } = render(<SongSectionView section={section} />);
  expect(queryByText("A")).not.toBeNull();
});

test("SongSectionView - normal usage - used with key", () => {
  const section = {
    title: "Hello world",
    body: "A B C \n Test",
  };
  const { queryByText } = render(<SongSectionView songKey="C" section={section} />);
  expect(queryByText("A")).not.toBeNull();
});

test("SongSectionView - normal usage - used with key and override", () => {
  const section = {
    title: "Hello world",
    body: "A B C \n Test",
  };
  const { queryByText } = render(<SongSectionView songKey="C" overrideKey="D" section={section} />);
  expect(queryByText("C#")).not.toBeNull();
});

test("SongSectionView - close interaction works", () => {
  const section = {
    title: "Hello world",
    body: "A B C \n Test",
  };
  const onRequestHide = jest.fn();
  const { getByTestId } = render(
    <SongSectionView onRequestHide={onRequestHide} songKey="C" overrideKey="D" section={section} />
  );
  const el = getByTestId("songsection-close");
  fireEvent.click(el);
  expect(onRequestHide).toHaveBeenCalled();
});

test.skip("SongSectionView type = abc", () => {
  const section = {
    title: "Hello world",
    type: "abc",
    body: "CDEFGABC'D'E'F'G'A'B'C''",
  };
  const { queryByTestId } = render(
    <SongSectionView songKey="C" overrideKey="D" section={section} />
  );
  const el = queryByTestId("abcnotationview");
  expect(el).not.toBeNull();
});
