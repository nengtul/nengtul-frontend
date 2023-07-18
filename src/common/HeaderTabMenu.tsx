import styled from "styled-components";
import LevelBadge from "./LevelBadge";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import theme from "./theme";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import HeaderLatest from "./HeaderLatest";

const HeaderTabWrap = styled.div`
  width: 100%;
  position: absolute;
  top: 44px;
  left: 0;
  height: calc(100vh - 44px);
  max-height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const HeaderLoginInfo = styled.div`
  width: 100%;
  padding: 20px 10px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
`;

const MemberThumb = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #666;
`;

const MemberName = styled.p`
  font-size: 20rem;
  font-weight: 800;
  text-align: center;
  margin: 10px 0px 5px;
  span {
    font-size: 14rem;
  }
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

export default function HeaderTabMenu() {
  return (
    <>
      <HeaderTabWrap>
        <HeaderLoginInfo>
          <MemberThumb />
          <MemberName>
            박진완 <span>님</span>
          </MemberName>
          <LevelBadge>견습요리사</LevelBadge>
        </HeaderLoginInfo>
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
            <Link to={"/"}>
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
        </TabUl>
        <HeaderLatest></HeaderLatest>
        <FooterMent>
          Zerobase Team Project.
          <br />
          https://github.com/nengtul
          <br />
          ©Nengtul. All rights reserved
        </FooterMent>
      </HeaderTabWrap>
    </>
  );
}
