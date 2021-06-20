import { createStore, createTypedHooks, EasyPeasyConfig } from "easy-peasy";
import uiState from "./uiState";
import auth, { AuthModel } from "./auth";
import { UiStateModel, CHORD_CHARTS_DARK_MODE_KEY } from "./uiState";

export interface RootStoreModel {
  uiState: UiStateModel;
  auth: AuthModel;
}

const { useStoreActions, useStore, useStoreDispatch, useStoreState } =
  createTypedHooks<RootStoreModel>();

export function configureStore(config?: EasyPeasyConfig<any>) {
  let models = {
    uiState,
    auth,
  };

  const initialState = {
    ...config?.initialState,
  };

  if (!initialState.uiState) {
    initialState.uiState = {};
  }

  initialState.uiState = {
    ...initialState.uiState,
    darkMode: window.localStorage.getItem(CHORD_CHARTS_DARK_MODE_KEY) === "true",
  };

  const store = createStore<RootStoreModel>(models, {
    ...config,
    initialState,
  });

  if (import.meta.env.DEV) {
    (window as any).store = store;
  }

  return store;
}

// const store = configureStore();

export { useStoreActions, useStoreDispatch, useStore, useStoreState };
