import styled from "styled-components";
import theme from "./theme";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../AuthStore/authSlice";

export default function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("expirationTime");
    dispatch(setLoggedIn(false));
  };

  return (
    <>
      <OutBtn
        type="button"
        onClick={() => {
          handleLogout();
        }}
      >
        로그아웃
      </OutBtn>
    </>
  );
}

const OutBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${theme.colors.main};
  color: #fff;
  font-size: 16rem;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 5px;
`;
