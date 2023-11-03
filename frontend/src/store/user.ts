import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails } from '../models/user';
import { LS_TOKEN_KEY } from '../constants/local-storage';

export interface UserStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: UserDetails | null;
  token: string | null;
}

let token = localStorage.getItem(LS_TOKEN_KEY) || null;
if (token) {
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const exp = new Date(tokenData.exp * 1000);
  if (exp < new Date()) {
    token = null;
  }
}

const initialState = {
  user: null,
  token,
} as UserStore;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserStore, action: PayloadAction<UserDetails | null>) {
      state.user = action.payload;
    },
    setToken(state: UserStore, action: PayloadAction<string | null>) {
      const token = action.payload;
      if (token) {
        localStorage.setItem(LS_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(LS_TOKEN_KEY);
      }
      state.token = token;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
