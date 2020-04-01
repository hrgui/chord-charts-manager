import { useQuery, gql } from "@apollo/client";
import SetlistFragment from "../SetlistFragment";

export function useGetSetlistQuery(id) {
  return useQuery(
    gql`
      query getOne($id: ID) {
        setlist: setlist(id: $id) {
          ...Setlist
        }
      }

      ${SetlistFragment}
    `,
    { variables: { id } }
  );
}
