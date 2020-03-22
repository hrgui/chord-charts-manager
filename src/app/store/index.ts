import { createStore, createTypedHooks } from "easy-peasy";
import uiState from "./uiState";
import auth, { AuthModel } from "./auth";
import { UiStateModel } from "./uiState";

export interface RootStoreModel {
  uiState: UiStateModel;
  auth: AuthModel;
}

export function configureStore({ preloadedState }: { preloadedState? } = {}) {
  let models = {
    uiState,
    auth
  };

  if (preloadedState) {
    Object.keys(preloadedState).forEach(key => {
      models[key] = { ...models[key], ...preloadedState[key] };
    });
  }

  return createStore<RootStoreModel>(models);
}

const store = configureStore();

const { useStoreActions, useStore, useStoreDispatch, useStoreState } = createTypedHooks<
  RootStoreModel
>();

export { useStoreActions, useStoreDispatch, useStore, useStoreState };

if (process.env.NODE_ENV !== "production") {
  (window as any).store = store;
}

export default store;