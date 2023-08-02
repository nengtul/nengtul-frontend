import styled from "styled-components";
import theme from "./theme";
import { useDispatch } from "react-redux";
import { setTokens } from "../Store/reducers";
import { useNavigate } from "react-router-dom";
import { PURGE } from "redux-persist";

type SetLogOutFunction = () => void;

interface LogoutBtnProps {
  setLogOut: SetLogOutFunction;
}

export default function LogoutBtn({ setLogOut }: LogoutBtnProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setTokens({ accessToken: null, refreshToken: null }));
    dispatch({ type: PURGE, key: ["root"], result: () => null });
    setLogOut();
    navigate("/");
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
