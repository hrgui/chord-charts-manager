import { useStoreActions } from "app/store";

export function useAuthActions() {
  return useStoreActions(actions => actions.auth);
}

export default useAuthActions;