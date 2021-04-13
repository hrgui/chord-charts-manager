import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  data?;
  idToken?: string | null;
  currentAuthEvent?;
}

interface UserAction {
  idToken?: string;
  idTokenParsed?;
}

const initialState = {
  data: null,
  idToken: null,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onAuthEvent: (state, action: PayloadAction<any>) => {
      state.currentAuthEvent = action.payload;
    },
    onUserAuthenticated: (state, action: PayloadAction<UserAction>) => {
      state.data = {
        ...action.payload.idTokenParsed,
      };
      state.idToken = action.payload.idToken;
    },
  },
});

export const { onAuthEvent, onUserAuthenticated } = userSlice.actions;

export default userSlice;
