import { useMutation, gql } from "@apollo/client";

export function useAddToSetlistMutation(id, song_id) {
  return useMutation(
    gql`
      mutation addSongToSetlist($song_id: ID!, $id: ID!) {
        addSongToSetlist(song_id: $song_id, id: $id)
      }
    `,
    { variables: { song_id, id } }
  );
}

export default useAddToSetlistMutation;
