import SongFragment from "../SongFragment";
import { gql, useQuery } from "@apollo/client";

export function useGetSongQuery(id) {
  return useQuery(
    gql`
      query getSong($id: String) {
        song(id: $id) {
          ...Song
        }
      }

      ${SongFragment}
    `,
    {
      variables: {
        id,
      },
    }
  );
}
