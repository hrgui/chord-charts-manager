import React from "react";
import { render } from "@testing-library/react";
import UserAvatar from "./UserAvatar";

test("renders a question mark if displayName is not provided", () => {
  const { getByText } = render(<UserAvatar />);
  const questionMark = getByText(/\?/i);
  expect(questionMark).toBeInTheDocument();
});

test("renders the first letter of the display name if provided", () => {
  const displayName = "Apple";
  const { getByText } = render(<UserAvatar displayName={displayName} />);
  const search = getByText(displayName[0]);
  expect(search).toBeInTheDocument();
});

test("renders the photo if provided photo with alt Text of displayName", () => {
  const displayName = "Apple";
  const photoURL = "http://photo/";
  const { getByAltText } = render(
    <UserAvatar displayName={displayName} photoURL={photoURL} />
  );
  const el = getByAltText(displayName);
  expect(el).toBeInTheDocument();
  expect((el as any).src).toEqual(photoURL);
});
