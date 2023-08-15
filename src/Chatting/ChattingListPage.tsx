import styled from "styled-components";
import { getTokenData,deleteTokenData} from "../axios";
import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { useEffect,useState } from "react";

import RecipeDeleteBtn from "../common/RecipeDeleteBtn";
import { CHAT_LIST_URL,CHAT_LEAVE_ROOMS_URL } from "../url";
import { useDispatch } from "react-redux";

import EachChattingList from "./EachChattingList";
export interface Chatting {
  roomId:string;
  latestChat:string;
  receiverNickname:string;
  shareBoardTitle:string;
  receiverPhoto:string;
  shareBoardMainPhoto:string;
  shareBoardPrice:number;
  
}
function ChattingListPage() {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;
  const [chatData, setChatData] = useState<Chatting[]>() ;
  const dispatch = useDispatch();

 

  useEffect(() => {
    if(MY_TOKEN&& REFRESH_TOKEN){
      getTokenData<Chatting[]>(CHAT_LIST_URL,MY_TOKEN,dispatch,REFRESH_TOKEN)
      .then((response) => {
        console.log(response)
        setChatData(response);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, []);
  const handleClick = (chat:Chatting) => {
    if (MY_TOKEN&& REFRESH_TOKEN) {
      deleteTokenData(`${CHAT_LEAVE_ROOMS_URL}/${chat.roomId}`, MY_TOKEN,dispatch,REFRESH_TOKEN)
        .then(() => {
          console.log("채팅방에 나가셨습니다"); //모달창 
          setChatData( prevChatData => prevChatData?.filter(item => item.roomId !== chat.roomId));   
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <MobileWrap>
      <Header />
      <ContensWrap>
        <ContentWrapper>
          <Title>채팅</Title>
          <ChatList>
            
            {chatData?.map((chat, index) => (
              <EachChattingList
                key={index}
                chat={chat}
                />
            ))}
      
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

const Title = styled.div`
  width: 390rem;
  height: 60rem;
  background-color: #fff;
  color: #38db83;
  font-size: 24rem;
  font-weight: 700;
  padding-left: 2%;
  padding-top: 20rem;
  z-index: 2;
  position: fixed;
`;

const ChatList = styled.div`
  padding-top: 60px;
  width: 100%;
  flex-grow: 1;
`;
