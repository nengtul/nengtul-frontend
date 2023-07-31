import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import theme from "./theme";
import { faBowlRice, faBullhorn, faMapPin } from "@fortawesome/free-solid-svg-icons";
import HeaderLatest from "./HeaderLatest";
import styled, { keyframes } from "styled-components";
import HeaderInfo from "./HeaderInfo";

export default function HeaderTabMenu() {
  return (
    <TabMenuWrapper>
      <HeaderInfo />
      <TabUl>
        <li>
          <Link to={"/"}>
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
            찜한 레시피
            <span>(6)</span>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <FontAwesomeIcon
              icon={faBowlRice}
              style={{ height: "16rem", color: `${theme.colors.main}` }}
            />
            내가 등록한 레시피
            <span>(3)</span>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <FontAwesomeIcon
              icon={faMapPin}
              style={{ height: "16rem", color: `${theme.colors.main}` }}
            />
            나눔중인 재료
            <span>(7)</span>
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
