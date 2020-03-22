import { useQuery } from "@apollo/client";
import { GET_CURRENT_AUTH_STATUS } from "lib/auth/queries";

export function useUserData(): any {
  const { data = { status: { currentUser: null } } } = useQuery(
    GET_CURRENT_AUTH_STATUS
  );
  const { currentUser } = data.status;
  return currentUser || {};
}
