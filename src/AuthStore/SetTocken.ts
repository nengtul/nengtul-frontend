import { setLoggedIn } from "./authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function SetTocken() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(setLoggedIn(true));
    }
  }, []);
}
