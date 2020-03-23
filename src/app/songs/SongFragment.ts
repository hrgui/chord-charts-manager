import { gql } from "@apollo/client";

export default gql`
  fragment Song on Song {
    id
    title
    youtube
    tags
    artist
    key
    sections {
      body
      title
      type
    }
    share
  }
`;
