import { render } from "@testing-library/react";
import { YoutubeView } from "./YoutubeView";
import React from "react";

test("YoutubeView basic case - valid video id", () => {
  const { getByTestId } = render(<YoutubeView value={`?v=DUMMY_ID`} />);
  expect(getByTestId("youtube-container")).toBeInTheDocument();
});

test("YoutubeView basic case - video id not defined", () => {
  const { queryByTestId } = render(<YoutubeView value={``} />);
  expect(queryByTestId("youtube-container")).not.toBeInTheDocument();
});
