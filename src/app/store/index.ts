import { createStore, createTypedHooks, EasyPeasyConfig } from "easy-peasy";
import uiState from "./uiState";
import auth, { AuthModel } from "./auth";
import { UiStateModel, CHORD_CHARTS_DARK_MODE_KEY } from "./uiState";

export interface RootStoreModel {
  uiState: UiStateModel;
  auth: AuthModel;
}

export function configureStore(config?: EasyPeasyConfig<any>) {
  let models = {
    uiState,
    auth
  };

  const initialState = {
    ...config?.initialState
  };

  if (!initialState.uiState) {
    initialState.uiState = {};
  }

  initialState.uiState = {
    ...initialState.uiState,
    darkMode: window.localStorage.getItem(CHORD_CHARTS_DARK_MODE_KEY) === "true"
  };

  return createStore<RootStoreModel>(models, { ...config, initialState });
}

const store = configureStore();

const {
  useStoreActions,
  useStore,
  useStoreDispatch,
  useStoreState
} = createTypedHooks<RootStoreModel>();

export { useStoreActions, useStoreDispatch, useStore, useStoreState };

if (process.env.NODE_ENV !== "production") {
  (window as any).store = store;
}

export default store;
