import { useStoreState } from "app/store";

export function useGetAppBarData() {
  return useStoreState(state => state.uiState);
}

export default useGetAppBarData;
