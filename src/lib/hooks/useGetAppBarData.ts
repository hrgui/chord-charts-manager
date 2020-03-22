import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export function useGetAppBarData() {
  const { data, error, loading } = useQuery(
    gql`
      query getAppBarData {
        uiState @client {
          appName
          isSticky
          navBarState
          navMenuHidden
          controlsPanelHidden
          page {
            title
            subtitle
          }
        }
      }
    `
  );

  return data && data.uiState;
}
