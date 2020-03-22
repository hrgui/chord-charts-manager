import { useStoreState } from "app/store";

export function useDarkMode() {
  return useStoreState(state => state.uiState.darkMode);
}
