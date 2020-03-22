import React from "react";
import { render, act } from "@testing-library/react";
import { AppController } from "app/core/AppController";

export function renderWithAppController(
  ui,
  { store, ...appControllerProps }: any = {}
) {
  let el;
  act(() => {
    el = render(
      <AppController store={store} {...appControllerProps}>
        {ui}
      </AppController>
    );
  });

  const { rerender: _rerender, ...otherElProps } = el;

  return {
    ...otherElProps,
    rerender: ui => {
      return _rerender(
        <AppController store={store} {...appControllerProps}>
          {ui}
        </AppController>
      );
    }
  };
}
