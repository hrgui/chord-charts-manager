import React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import SongsListPage from "./SongsListPage";
import { wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("should have 3 songs if i provided it 3 songs from the API", async () => {
  const { getByText } = render(<SongsListPage />, {
    gqlContext: () => {
      return {
        api: {
          song: {
            list: () => {
              return [
                { id: "1", title: "Song 1", key: "C" },
                { id: "2", title: "Song 2", key: "C" },
                { id: "3", title: "Song 3", key: "C" }
              ];
            }
          }
        }
      };
    }
  });
  await wait();
  expect(getByText(/Song 1/)).toBeInTheDocument();
  expect(getByText(/Song 2/)).toBeInTheDocument();
  expect(getByText(/Song 3/)).toBeInTheDocument();
});

test("should not blow up if i return back empty array", async () => {
  const { getByText } = render(<SongsListPage />, {
    gqlContext: () => {
      return {
        api: {
          song: {
            list: () => {
              return [];
            }
          }
        }
      };
    }
  });
  await wait();
  expect(getByText(/Empty in songs/)).toBeInTheDocument();
});

test("should be ok if list was async", async () => {
  jest.useFakeTimers();
  const { getByText } = await render(<SongsListPage />, {
    gqlContext: () => {
      return {
        api: {
          song: {
            list: async () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve([
                    { id: "1", title: "Song 1", key: "C" },
                    { id: "2", title: "Song 2", key: "C" },
                    { id: "3", title: "Song 3", key: "C" }
                  ]);
                }, 1000);
              });
            }
          }
        }
      };
    }
  });
  await act(async () => {
    await wait(() => null, { timeout: 1000 });
    jest.runAllTimers();
  });
  expect(getByText(/Song 2/)).toBeInTheDocument();
  jest.useRealTimers();
});

test("should show error if the API errored", async () => {
  const { getByText } = await render(<SongsListPage />, {
    gqlContext: () => {
      return {
        api: {
          song: {
            list: () => {
              throw new Error("Error");
            }
          }
        }
      };
    }
  });
  await wait();
  expect(getByText(/An error occurred/)).toBeInTheDocument();
});
