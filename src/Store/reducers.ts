import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export type accessToken = {
  accessTokenValue: string | null;
};

const initialState: accessToken = {
  accessTokenValue: null,
};

export const accessTokenSlice = createSlice({
  name: "accesstoken",
  initialState,
  reducers: {
    getAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessTokenValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      console.log(state);
      return initialState;
    });
  },
});

export const { getAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
