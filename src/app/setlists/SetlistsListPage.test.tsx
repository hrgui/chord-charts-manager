import React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import SetlistsListPage from "./SetlistsListPage";
import { wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("should have 3 Setlists if i provided it 3 Setlists from the API", async () => {
  const date = new Date().toISOString();
  const { getByText } = render(<SetlistsListPage />, {
    gqlContext: () => {
      return {
        api: {
          setlist: {
            list: () => {
              return [
                { id: "1", title: "Setlist 1", leader: "Test", date },
                { id: "2", title: "Setlist 2", leader: "Test", date },
                { id: "3", title: "Setlist 3", leader: "test", date }
              ];
            }
          }
        }
      };
    }
  });
  await wait();
  expect(getByText(/Setlist 1/)).toBeInTheDocument();
  expect(getByText(/Setlist 2/)).toBeInTheDocument();
  expect(getByText(/Setlist 3/)).toBeInTheDocument();
});

test("should not blow up if i return back empty array", async () => {
  const { getByText } = render(<SetlistsListPage />, {
    gqlContext: () => {
      return {
        api: {
          setlist: {
            list: () => {
              return [];
            }
          }
        }
      };
    }
  });
  await wait();
  expect(getByText(/Empty in setlists/)).toBeInTheDocument();
});

test("should be ok if list was async", async () => {
  const date = new Date().toISOString();
  jest.useFakeTimers();
  const { getByText } = await render(<SetlistsListPage />, {
    gqlContext: () => {
      return {
        api: {
          setlist: {
            list: async () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve([
                    { id: "1", title: "Setlist 1", leader: "Test", date },
                    { id: "2", title: "Setlist 2", leader: "test", date },
                    { id: "3", title: "Setlist 3", leader: "Test", date }
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
  expect(getByText(/Setlist 2/)).toBeInTheDocument();
  jest.useRealTimers();
});

test("should show error if the API errored", async () => {
  const { getByText } = await render(<SetlistsListPage />, {
    gqlContext: () => {
      return {
        api: {
          setlist: {
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
