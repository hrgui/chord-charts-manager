import { action, Action } from "easy-peasy";
export const CHORD_CHARTS_DARK_MODE_KEY = "CHORD_CHARTS_DARK_MODE";

function getViewportWidth() {
  return window.innerWidth;
}

export enum NavBarState {
  main = "main",
  setlist = "setlist",
  song = "song"
}

export interface UiStateModel {
  darkMode?: boolean;
  appName;
  page;
  widthBreakpoint;
  isSticky: boolean;
  navBarState: NavBarState;
  navMenuHidden: boolean;
  controlsPanelHidden: boolean;
  youtubeHidden: boolean;
  toggleNavMenu: Action<any>;
  toggleYoutube: Action<any>;
  toggleControlsPanel: Action<any>;
  setPageInfo: Action<any, { title?; subtitle? }>;
  setNavBarState: Action<any, string>;
  resetPageInfo: Action<any>;
  setWidthBreakpoint: Action<any, string>;
  setStickyState: Action<any, boolean>;
  toggleDarkMode: Action<any>;
}

const model: UiStateModel = {
  darkMode: false, // see root store for initial state initialization
  appName: "",
  page: {
    title: "",
    subtitle: null
  },
  widthBreakpoint: null,
  isSticky: false,
  navBarState: NavBarState.main, // mode 1, mode 2
  navMenuHidden: getViewportWidth() > 900 ? false : true,
  youtubeHidden: false,
  controlsPanelHidden: false,
  toggleDarkMode: action((state: any) => {
    state.darkMode = !state.darkMode;
    // side effect
    window.localStorage.setItem(CHORD_CHARTS_DARK_MODE_KEY, state.darkMode);
  }),
  setWidthBreakpoint: action((state: any, payload) => {
    state.widthBreakpoint = payload;
  }),
  setNavBarState: action((state: any, payload) => {
    state.navBarState = payload;
  }),
  toggleControlsPanel: action((state: any) => {
    state.controlsPanelHidden = !state.controlsPanelHidden;
  }),
  toggleNavMenu: action((state: any) => {
    state.navMenuHidden = !state.navMenuHidden;
  }),
  toggleYoutube: action((state: any) => {
    state.youtubeHidden = !state.youtubeHidden;
  }),
  resetPageInfo: action((state: any) => {
    state.page.title = state.appName;
    state.page.subtitle = null;
  }),
  setStickyState: action((state: any, payload) => {
    state.isSticky = payload;
  }),
  setPageInfo: action((state: any, { title, subtitle }: any) => {
    if (title !== undefined) {
      state.page.title = title;
    }

    if (subtitle !== undefined) {
      state.page.subtitle = subtitle;
    }
  })
};

// TODO: the API changed for listen, I think I have to use actionOn
// model.listeners = listen(on => {
//   on(
//     model.setWidthBreakpoint,
//     action((state: any) => {
//       if (
//         state.widthBreakpoint === "sm" ||
//         state.widthBreakpoint === "xs" ||
//         state.widthBreakpoint === "md"
//       ) {
//         state.navMenuHidden = true;
//       }
//     })
//   );
// });

export default model;
