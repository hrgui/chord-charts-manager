import { useAsync } from "react-async";
import { useStoreActions } from "app/store";

export function useIsAuthenticated(): [boolean, boolean, any] {
  const isAuthenticatedFn = useStoreActions(
    actions => actions.auth.isAuthenticated
  );
  const { isLoading, data } = useAsync<any>(isAuthenticatedFn);

  return [isLoading, !isLoading && !!data, !isLoading && data];
}
