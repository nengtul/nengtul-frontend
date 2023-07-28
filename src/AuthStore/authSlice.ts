import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedin: boolean;
}

const initialState: AuthState = {
  isLoggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedin = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
