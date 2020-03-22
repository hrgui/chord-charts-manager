import React from 'react';
import { render, act, wait } from '@testing-library/react';
import AppController from './AppController';

test('renders children as is, since its just a passthrough', async () => {
  let el;
  act(() => {
    el = render(<AppController>learn react</AppController>);
  });
  await wait();

  const {getByText} = el;
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});