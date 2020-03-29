import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import { Route } from "react-router-dom";
import SongFormPage, { getNewSongTemplate } from "./SongFormPage";
import createApolloClientWithMocks from "testUtils/createApolloClientWithMocks";
import { fireEvent, wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";

test("should show the SongNewPage for /song/new, and we should be able to create a song", async () => {
  const songCreate = jest.fn().mockImplementation(data => {
    return { id: 1, ...data };
  });
  const { getByText } = render(<SongFormPage />, {
    apolloClient: createApolloClientWithMocks(() => {
      return {
        api: {
          song: {
            create: songCreate
          }
        }
      };
    })
  });

  const saveBtn = getByText(/Save/);
  expect(saveBtn).toBeInTheDocument();

  act(() => {
    fireEvent.click(saveBtn);
  });
  await wait();

  expect(songCreate).toHaveBeenCalled();
});

test("should show the SongEditPage for /song/1/edit, and we should be able to save a song", async () => {
  const songUpdate = jest.fn().mockImplementation((id, data) => {
    return { id, ...data };
  });
  const songGet = jest.fn().mockImplementation(data => {
    return { id: 1, ...getNewSongTemplate("testGroupId") };
  });
  const { getByText } = render(
    <Route exact component={SongFormPage} path="/song/:id/edit" />,
    {
      history: createMemoryHistory({
        initialEntries: ["/song/1/edit"]
      }),
      apolloClient: createApolloClientWithMocks(() => {
        return {
          api: {
            song: {
              get: songGet,
              update: songUpdate
            }
          }
        };
      })
    }
  );
  await wait();
  expect(songGet).toHaveBeenCalled();

  const saveBtn = getByText(/Save/);
  expect(saveBtn).toBeInTheDocument();

  act(() => {
    fireEvent.click(saveBtn);
  });
  await wait();

  expect(songUpdate).toHaveBeenCalled();
});
