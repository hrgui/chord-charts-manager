import { useStoreState } from "app/store";

export function useUiState() {
  return useStoreState(state => state.uiState);
}

export default useUiState;