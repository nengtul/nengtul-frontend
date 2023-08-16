import styled from "styled-components";
import { getTokenData, deleteTokenData } from "../axios";
import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { useEffect, useState } from "react";
import Egg from "../assets/icon/EggIcon_png.png";

import RecipeDeleteBtn from "../common/RecipeDeleteBtn";
import { CHAT_LIST_URL, CHAT_LEAVE_ROOMS_URL } from "../url";
import { useDispatch } from "react-redux";

import EachChattingList from "./EachChattingList";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import theme from "../common/theme";
export interface Chatting {
  roomId: string;
  latestChat: string;
  receiverNickname: string;
  shareBoardTitle: string;
  receiverPhoto: string;
  shareBoardMainPhoto: string;
  shareBoardPrice: number;
}
function ChattingListPage() {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;
  const [chatData, setChatData] = useState<Chatting[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (MY_TOKEN && REFRESH_TOKEN) {
      getTokenData<Chatting[]>(CHAT_LIST_URL, MY_TOKEN, dispatch, REFRESH_TOKEN)
        .then((response) => {
          console.log(response);
          setChatData(response);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const onDeleteChat = (roomId: string) => {
    setChatData((prevChatData) => prevChatData?.filter((item) => item.roomId !== roomId));
  };
  return (
    <MobileWrap>
      <Header />
      <ContensWrap>
        <ContentWrapper>
          <ChatList>
            {chatData && chatData.length > 0 ? (
              chatData.map((chat, index) => (
                <EachChattingList key={index} chat={chat} onDeleteChat={onDeleteChat} />
              ))
            ) : (
              <NoneRecipe>
                <img src={Egg} alt="logo" />
                <p>아직 진행중인 채팅이 없습니다!</p>
                <Link to={"/ingredientMap"}>
                  재료나눔 보러가기
                  <FontAwesomeIcon icon={faAngleRight} />
                </Link>
              </NoneRecipe>
            )}
          </ChatList>
        </ContentWrapper>
      </ContensWrap>
      <TabMenu />
    </MobileWrap>
  );
}

export default ChattingListPage;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatList = styled.div`
  padding-top: 60px;
  width: 100%;
  flex-grow: 1;
`;

const NoneRecipe = styled.div`
  height: 100%;
  padding-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 80px;
  p {
    font-size: 18rem;
    font-weight: 800;
  }
  a {
    font-size: 16rem;
    font-weight: 700;
    color: #fff;
    background-color: ${theme.colors.main};
    padding: 12px 20px;
    margin-top: 20px;
    border-radius: 10px;
    svg {
      margin-left: 10px;
    }
  }
`;
