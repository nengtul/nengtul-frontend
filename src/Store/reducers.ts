import { AuthAction, AuthState } from "./types";

const AuthInitialState: AuthState = {
  token: null,
};

export const authReducer = (state = AuthInitialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
