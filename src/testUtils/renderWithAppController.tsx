import React from "react";
import { render, act, RenderResult } from "@testing-library/react";
import { AppController } from "app/core/AppController";
import { MockedResponse } from "@apollo/client/testing";
import { MockedProviderProps } from "@apollo/client/utilities/testing/mocking/MockedProvider";
import { MockedProvider } from "@apollo/client/testing";
import { Router as TestRouter } from "react-router-dom";

export interface RenderWithAppControllerProps {
  store?;
  gqlMocks?: ReadonlyArray<MockedResponse>;
  mockedProviderProps?: Partial<MockedProviderProps>;
  [name: string]: any;
}

export function renderWithAppController(
  ui,
  {
    store,
    gqlMocks = [],
    mockedProviderProps = {},
    ...appControllerProps
  }: RenderWithAppControllerProps = {}
): RenderResult {
  const TestComponentProviderOverrides = {
    ApolloProvider: MockedProvider,
    Router: appControllerProps.history && TestRouter,
  };

  let el;
  act(() => {
    el = render(
      <AppController
        componentProviderOverrides={TestComponentProviderOverrides}
        store={store}
        apolloProviderProps={{ mocks: gqlMocks, ...mockedProviderProps }}
        {...appControllerProps}
      >
        {ui}
      </AppController>
    );
  });

  const { rerender: _rerender, ...otherElProps } = el;

  return {
    ...otherElProps,
    rerender: (ui) => {
      return _rerender(
        <AppController
          componentProviderOverrides={TestComponentProviderOverrides}
          store={store}
          apolloProviderProps={{ mocks: gqlMocks, ...mockedProviderProps }}
          {...appControllerProps}
        >
          {ui}
        </AppController>
      );
    },
  };
}
