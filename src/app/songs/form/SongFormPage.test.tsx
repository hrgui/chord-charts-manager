import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import { Route } from "react-router-dom";
import SongFormPage, {
  getNewSongTemplate,
  CREATE_SONG_QUERY,
} from "./SongFormPage";
import { fireEvent, wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("should show the SongNewPage for /song/new, and we should be able to create a song", async () => {
  const newSongTemplate = getNewSongTemplate(undefined);
  const expectedNewSongResult = {
    ...newSongTemplate,
    title: "Test a",
  };

  const { getByText, container } = render(<SongFormPage />, {
    gqlMocks: [
      {
        request: {
          query: CREATE_SONG_QUERY,
          variables: {
            data: expectedNewSongResult,
          },
        },
        result: {
          data: {
            song: {
              ...expectedNewSongResult,
            },
          },
        },
      },
    ],
  });

  const titleInput = container.querySelector("input[name=title]");

  act(() => {
    fireEvent.change(titleInput!, { target: { value: "Test a" } });
  });
  await wait();

  const saveBtn = getByText(/Save/);
  expect(saveBtn).toBeInTheDocument();

  act(() => {
    fireEvent.click(saveBtn);
  });
  await wait();

  // wait for 2nd event
  await wait(() => {}, { timeout: 3000 });
  const snackEl = getByText("Song Test a has been saved");
  expect(snackEl).toBeInTheDocument();
});

// test("should show the SongEditPage for /song/1/edit, and we should be able to save a song", async () => {
//   const songUpdate = jest.fn().mockImplementation((id, data) => {
//     return { id, ...data };
//   });
//   const songGet = jest.fn().mockImplementation(data => {
//     return { id: 1, ...getNewSongTemplate("testGroupId") };
//   });
//   const { getByText } = render(
//     <Route exact component={SongFormPage} path="/song/:id/edit" />,
//     {
//       history: createMemoryHistory({
//         initialEntries: ["/song/1/edit"]
//       }),
//       apolloClient: createApolloClientWithMocks(() => {
//         return {
//           api: {
//             song: {
//               get: songGet,
//               update: songUpdate
//             }
//           }
//         };
//       })
//     }
//   );
//   await wait();
//   expect(songGet).toHaveBeenCalled();

//   const saveBtn = getByText(/Save/);
//   expect(saveBtn).toBeInTheDocument();

//   act(() => {
//     fireEvent.click(saveBtn);
//   });
//   await wait();

//   expect(songUpdate).toHaveBeenCalled();
// });
