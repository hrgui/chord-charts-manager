import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export function useIsAuthenticated(): [boolean, boolean, any] {
  const { data, loading } = useQuery(gql`
    query CheckOnlineStatus {
      status: getCurrentAuthStatus @client {
        currentUser
        isAuthenticated
      }
    }
  `);

  return [
    loading,
    data && data.status.isAuthenticated,
    data && data.status.currentUser
  ];
}
