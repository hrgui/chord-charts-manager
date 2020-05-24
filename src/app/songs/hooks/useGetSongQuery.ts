import SongFragment from "../SongFragment";
import { gql, useQuery } from "@apollo/client";

export function useGetSongQuery(id) {
  return useQuery(
    gql`
      query getSong($id: ID!) {
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
