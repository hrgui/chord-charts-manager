import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export function useDarkMode() {
  const { data, loading, error} = useQuery(
    gql`
      {
        uiState @client {
          darkMode
        }
      }
    `
  );

  return data && data.uiState.darkMode;
}
