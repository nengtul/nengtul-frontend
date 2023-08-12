import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import theme from "./theme";
import { faBowlRice, faBullhorn, faMapPin } from "@fortawesome/free-solid-svg-icons";
import HeaderLatest from "./HeaderLatest";
import styled, { keyframes } from "styled-components";
import HeaderInfo from "./HeaderInfo";
import { useDispatch } from "react-redux";
import { setTokens } from "../Store/reducers";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { USER_DETAIL_URL } from "../url";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface UserData {
  name: string;
  point: number;
  profileImageUrl: string;
  likeRecipe: number;
  myRecipe: number;
  shareList: number;
}
const DEFAULT_USER_DATA: UserData = {
  name: "",
  point: 0,
  profileImageUrl: "",
  likeRecipe: 0,
  myRecipe: 0,
  shareList: 0,
};

export default function HeaderTabMenu() {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;

  const dispatch = useDispatch();
  const [data, setData] = useState(DEFAULT_USER_DATA);

  const getUserInfo = useCallback(async () => {
    try {
      if (MY_TOKEN) {
        const headers = {
          Authorization: `Bearer ${MY_TOKEN}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get<UserData>(USER_DETAIL_URL, {
          headers: headers,
        });
        const userData = response.data;
        setData(userData);
        dispatch(
          setTokens({
            accessToken: MY_TOKEN,
            refreshToken: REFRESH_TOKEN,
          })
        );
      } else {
        setData(DEFAULT_USER_DATA);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getUserInfo().catch((err) => {
      console.error(err);
    });
  }, []);

  const setLogOut = () => {
    setData(DEFAULT_USER_DATA);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("roles");
  };

  return (
    <TabMenuWrapper>
      <HeaderInfo data={data} setLogOut={setLogOut} />
      <TabUl>
        <li>
          <Link to={"/myPage"}>
            <FontAwesomeIcon
              icon={faUser}
              style={{ height: "16rem", color: `${theme.colors.main}` }}
            />
            내 정보
          </Link>
        </li>
        <li>
          <Link to={"/notice"}>
            <FontAwesomeIcon
              icon={faBullhorn}
              style={{ height: "16rem", color: `${theme.colors.main}` }}
            />
            공지사항
          </Link>
        </li>
        <li>
          <Link to={"/heartLecipe"}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ height: "16rem", color: `${theme.colors.main}` }}
            />
            좋아요 레시피
            <span>({data.likeRecipe})</span>
          </Link>
        </li>
        <li>
          <Link to={"/myRecipe"}>
            <FontAwesomeIcon
              icon={faBowlRice}
              style={{ height: "16rem", color: `${theme.colors.main}` }}
            />
            내가 등록한 레시피
            <span>({data.myRecipe})</span>
          </Link>
        </li>
        <li>
          <Link to={"/myIngredientTrade"}>
            <FontAwesomeIcon
              icon={faMapPin}
              style={{ height: "16rem", color: `${theme.colors.main}` }}
            />
            나눔중인 재료
            <span>({data.shareList})</span>
          </Link>
        </li>
      </TabUl>
      <HeaderLatest></HeaderLatest>
      <FooterMent>
        Zerobase Team Project.
        <br />
        https://github.com/nengtul
        <br />
        ©Nengtul. All rights reserved
      </FooterMent>
    </TabMenuWrapper>
  );
}

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const TabMenuWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 58px;
  left: 0;
  height: calc(844px - 56px);
  max-height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  &::-webkit-scrollbar {
    width: 0px;
  }
  animation: ${slideInAnimation} 0.3s ease;
`;

const TabUl = styled.ul`
  width: 100%;
  li {
    width: 100%;
    padding: 15px 20px;
    border-bottom: 1px solid #f6f6f6;

    a {
      font-size: 15rem;
      font-weight: 700;

      svg {
        margin-right: 10px;
        width: 20px;
      }

      span {
        margin-left: 4px;
        font-size: 14rem;
        color: ${theme.colors.main};
      }
    }
  }
`;

const FooterMent = styled.p`
  font-size: 14rem;
  color: #d0d0d0;
  margin-top: 15px;
  text-align: center;
`;
