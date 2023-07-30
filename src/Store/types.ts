export interface AuthState {
  token: string | null;
}

export type AuthAction = {
  type: "SET_TOKEN";
  payload: string;
};

export interface RootState {
  auth: AuthState;
}
