import { useAppBarActions } from "./useAppBarActions";

export function useGlobalSongActions() {
  const { toggleYoutube } = useAppBarActions();
  return { toggleYoutube };
}
