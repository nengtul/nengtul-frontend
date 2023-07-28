interface LoginSuccessAction {
  type: "LOGIN_SUCCESS";
}

export const loginSuccess = (): LoginSuccessAction => {
  return {
    type: "LOGIN_SUCCESS",
  };
};
