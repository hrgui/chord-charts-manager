import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export function useGlobalSongActions() {
  const [toggleYoutube] = useMutation(
    gql`
      mutation {
        toggleYoutube @client
      }
    `
  );

  return {
    toggleYoutube
  };
}
