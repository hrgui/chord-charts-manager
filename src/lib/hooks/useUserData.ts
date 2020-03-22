import { useStoreState } from "app/store";

export function useUserData(): any {
  return useStoreState(state => state.auth.user);  
}
