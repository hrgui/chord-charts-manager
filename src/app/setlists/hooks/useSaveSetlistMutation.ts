import { useMutation, gql } from "@apollo/client";
import SetlistFragment from "../SetlistFragment";

export function useCreateSetlistMutation() {
  return useMutation<any, { data? }>(
    gql`
      mutation create($data: SetlistInput!) {
        setlist: createSetlist(record: $data) {
          ...Setlist
        }
      }

      ${SetlistFragment}
    `,
    { refetchQueries: ["getSetlists"] }
  );
}

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
    { variables: { id }, refetchQueries: ["getSetlists"] }
  );
}
