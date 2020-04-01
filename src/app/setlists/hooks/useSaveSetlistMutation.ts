import { useMutation, gql } from "@apollo/client";
import SetlistFragment from "../SetlistFragment";

export function useSaveSetlistMutation(id) {
  return useMutation<any, { id; data? }>(
    gql`
      mutation update($data: SetlistInput!, $id: ID!) {
        setlist: updateSetlist(id: $id, record: $data) {
          ...Setlist
        }
      }

      ${SetlistFragment}
    `,
    { variables: { id } }
  );
}
