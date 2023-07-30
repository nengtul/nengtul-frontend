import { AuthAction } from "./types";

export const setToken = (token: string): AuthAction => ({
  type: "SET_TOKEN",
  payload: token,
});
