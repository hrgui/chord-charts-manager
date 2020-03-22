import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export function useGlobalSongSettings() {
  const { data } = useQuery(
    gql`
      {
        uiState @client {
          youtubeHidden
        }
      }
    `
  );

  return data && data.uiState;
}
