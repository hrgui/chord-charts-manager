import gql from "graphql-tag";

export const SetlistFragment = gql`
  fragment Setlist on Setlist {
    id
    title
    date
    leader
    songs
    settings
    session
    notes
    share
  }
`;

export default SetlistFragment;
