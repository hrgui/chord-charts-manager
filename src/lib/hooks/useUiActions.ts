import { useStoreActions } from "app/store";

export function useUiActions() {
  return useStoreActions(actions => actions.uiState);
}
