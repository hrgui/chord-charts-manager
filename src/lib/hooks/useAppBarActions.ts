import { useStoreActions } from "app/store";


export function useAppBarActions() {
  const {toggleNavMenu, setStickyState, setNavBarState, toggleControlsPanel} = useStoreActions(actions => actions.uiState);

  return {
    toggleNavMenu,
    toggleControlsPanel,
    setStickyState,
    setNavBarState
  };
}
