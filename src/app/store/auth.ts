import {
  isAuthenticated,
  session,
  getAuthToken,
  logout
} from "lib/firebase/auth";
import { action, thunk, Action, Thunk } from "easy-peasy";

export interface AuthModel {
  user?: any;
  setUser: Action<any, any>;
  isAuthenticated: Thunk<any>;
  setCurrentGroup: Action<any, any>;
  logout: Thunk<any, any>;
  setCurrentGroupInSession: Thunk<any, any>;
}

const auth: AuthModel = {
  user: undefined,
  setUser: action((state: any, payload) => {
    state.user = payload;
  }),
  logout: thunk(async (actions: any) => {
    actions.setUser(null);
    return logout();
  }),
  setCurrentGroupInSession: thunk(async (actions: any, payload) => {
    await session(payload);
    await getAuthToken(true);
    actions.setCurrentGroup(payload);
    // TODO
    // ideally we should do something that tells us to relogin or something to that matter
    // something to refresh everything; window.location.reload for the time being is MVPish
    window.location.reload();
  }),
  setCurrentGroup: action((state: any, payload) => {
    state.user.currentGroupId = payload;
  }),
  isAuthenticated: thunk(
    async (actions: any, payload, { getState }) => {
      const currentUser = (getState() as any).user;
      if (currentUser) {
        return currentUser;
      }
      const user = await isAuthenticated();
      actions.setUser(user);
      return user;
    }
  )
};

export default auth;