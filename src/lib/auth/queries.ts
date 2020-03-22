import { gql } from "@apollo/client";

export const GET_CURRENT_AUTH_STATUS = gql`
  {
    status: getCurrentAuthStatus @client {
      currentUser
      isAuthenticated
    }
  }
`;

export const SET_CURRENT_GROUP = gql`
  mutation setCurrentGroupInSession($currentGroupId: String) {
    setCurrentGroupInSession(currentGroupId: $currentGroupId) @client
  }
`;

export const DO_LOGOUT = gql`
  mutation {
    logout @client
  }
`;
