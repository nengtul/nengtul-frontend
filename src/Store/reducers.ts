import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export type TokenState = {
  accessTokenValue: string | null;
  refreshTokenValue: string | null;
};

const initialState: TokenState = {
  accessTokenValue: null,
  refreshTokenValue: null,
};

export const accessTokenSlice = createSlice({
  name: "accesstoken",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string | null; refreshToken: string | null }>
    ) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessTokenValue = accessToken;
      state.refreshTokenValue = refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      console.log(state);
      return initialState;
    });
  },
});

export const { setTokens } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
