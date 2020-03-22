import React from "react";
import { render, act, wait } from "@testing-library/react";
import { AppController } from "app/core/AppController";

export async function renderWithAppController(
  ui,
  { store, reduxStore, ...appControllerProps }: any = {}
) {
  let el;
  act(() => {
    el = render(
      <AppController
        reduxStore={reduxStore || store}
        testMode
        {...appControllerProps}
      >
        {ui}
      </AppController>
    );
  });
  // AppThemeProvider re-renders twice
  await wait();

  const { rerender: _rerender, ...otherElProps } = el;

  return {
    ...otherElProps,
    rerender: ui => {
      return _rerender(
        <AppController
          reduxStore={reduxStore || store}
          testMode
          {...appControllerProps}
        >
          {ui}
        </AppController>
      );
    }
  };
}
