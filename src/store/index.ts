import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

interface CreateStoreProps {
  /**
   * The initial state, same as Redux's createStore.
   * You may optionally specify it to hydrate the state
   * from the server in universal apps, or to restore a previously serialized
   * user session. If you use `combineReducers()` to produce the root reducer
   * function (either directly or indirectly by passing an object as `reducer`),
   * this must be an object with the same shape as the reducer map keys.
   */
  preloadedState?;
}

export function createStore(props?: CreateStoreProps) {
  return configureStore({
    reducer: rootReducer,
    ...(props || {}),
  });
}

const defaultStore = createStore();
export default defaultStore;
export type { RootState } from "./rootReducer";
