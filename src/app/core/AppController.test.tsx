import React from "react";
import { render, act, wait } from "@testing-library/react";
import AppController from "./AppController";
import { useStoreActions, useStoreState } from "app/store";

test("renders children as is, since its just a passthrough", async () => {
  let el;
  act(() => {
    el = render(<AppController>learn react</AppController>);
  });
  await wait();

  const { getByText } = el;
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

export function TestAppNameDisplay() {
  const { appName } = useStoreState(state => state.uiState);
  return <div>{appName}</div>;
}

test("passing in a config preloads the appName state", async () => {
  let el;
  const APP_NAME = "My App";

  act(() => {
    el = render(
      <AppController config={{ appName: APP_NAME }}>
        <TestAppNameDisplay />
      </AppController>
    );
  });
  await wait();

  const { getByText } = el;
  const linkElement = getByText(APP_NAME);
  expect(linkElement).toBeInTheDocument();
});
