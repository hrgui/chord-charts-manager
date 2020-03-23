import React from "react";
import { render, act } from "@testing-library/react";
import { AppController } from "app/core/AppController";
import createApolloClientWithMocks from "./createApolloClientWithMocks";

export function renderWithAppController(
  ui,
  { store, gqlContext, ...appControllerProps }: any = {}
) {
  let el;
  act(() => {
    el = render(
      <AppController
        store={store}
        apolloClient={createApolloClientWithMocks(gqlContext)}
        {...appControllerProps}
      >
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
