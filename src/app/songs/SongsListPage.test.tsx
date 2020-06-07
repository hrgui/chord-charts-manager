import React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";
import SongsListPage, { GET_SONGS_QUERY } from "./SongsListPage";
import { wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";

function createSong(overrides) {
  return {
    id: "1",
    title: "Song 1",
    youtube: "",
    tags: [],
    artist: "My Artist",
    key: "C",
    sections: [],
    share: {},
    __typename: "Song",
    ...overrides,
  };
}

it("should have 3 songs if i provided it 3 songs from the API", async () => {
  const { getByText } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        result: {
          data: {
            songs: [
              createSong({ id: "1", title: "Song 1", key: "C" }),
              createSong({ id: "2", title: "Song 2", key: "C" }),
              createSong({ id: "3", title: "Song 3", key: "C" }),
            ],
          },
        },
      },
    ],
  });
  await wait();
  expect(getByText(/Song 1/)).toBeInTheDocument();
  expect(getByText(/Song 2/)).toBeInTheDocument();
  expect(getByText(/Song 3/)).toBeInTheDocument();
});

it("should not blow up if i return empty array", async () => {
  const { getByText } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        result: {
          data: {
            songs: [],
          },
        },
      },
    ],
  });
  await wait();
  expect(getByText(/Empty in songs/)).toBeInTheDocument();
});

// test("should not blow up if i return back empty array", async () => {
//   const { getByText } = render(<SongsListPage />, {
//     gqlContext: () => {
//       return {
//         api: {
//           song: {
//             list: () => {
//               return [];
//             },
//           },
//         },
//       };
//     },
//   });
//   await wait();
//   expect(getByText(/Empty in songs/)).toBeInTheDocument();
// });

it("should be ok if there is a slight delay", async () => {
  const { getByText, rerender } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        delay: 10,
        result: {
          data: {
            songs: [
              createSong({ id: "1", title: "Song 1", key: "C" }),
              createSong({ id: "2", title: "Song 2", key: "C" }),
              createSong({ id: "3", title: "Song 3", key: "C" }),
            ],
          },
        },
      },
    ],
  });
  await wait(() => null, { timeout: 100 });
  rerender(<SongsListPage />);
  await wait(() => null, { timeout: 100 });
  expect(getByText(/Song 1/)).toBeInTheDocument();
  expect(getByText(/Song 2/)).toBeInTheDocument();
  expect(getByText(/Song 3/)).toBeInTheDocument();
});

it("should shouw error if there is an error", async () => {
  const { getByText, rerender } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        error: new Error("SOME ERROR"),
      },
    ],
  });
  await wait(() => null, { timeout: 100 });
  rerender(<SongsListPage />);
  await wait(() => null, { timeout: 100 });
  expect(getByText(/An error occurred/)).toBeInTheDocument();
});
