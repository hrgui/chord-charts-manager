import React from "react";
import { render, act, wait } from "@testing-library/react";
import App from "./App";

const observeMock = {
  observe: () => null,
  disconnect: () => null // maybe not needed
};

beforeEach(() => {
  (window as any).IntersectionObserver = jest
    .fn()
    .mockImplementation(() => observeMock);
});

test("renders learn react if passed in learn react", async () => {
  let el;
  act(() => {
    el = render(<App>learn react</App>);
  });
  await wait();
  const { getByText } = el;
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
