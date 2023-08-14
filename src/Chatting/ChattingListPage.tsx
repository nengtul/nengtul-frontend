import styled from "styled-components";
import { getData } from "../axios";
import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
export interface Post {
  roomId:string;
  latestChat:string;
  memberNicknames:Array<string>;
  shareBoardTitle:string
  
}
function ChattingListPage() {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue} = Token;
  const MY_TOKEN = accessTokenValue;
  const [chatData, setChatData] = useState<Post[] | null>(null) 
  useEffect(() => {
    if(MY_TOKEN){
      getData<Post[]>('https://nengtul.shop/v1/chat/list',MY_TOKEN)
      .then((response) => {
        console.log(response)
        setChatData(response);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, []);
  return (
    <MobileWrap>
      <Header />
      <ContensWrap>
        <ContentWrapper>
          <Title>채팅</Title>
          <ChatList>
            <Link to={"/chat"}>
            {chatData?.map((chat, index) => (
              <Chat key={index}>
                {/* <UserPic></UserPic> */}
                <UserText>
                  <UserInfo>
                    <UserId>{chat.memberNicknames[0]},{chat.memberNicknames[1]}</UserId>
                    {/* <UserId>{chat.memberNicknames[1]}</UserId> */}
                    {/* <UserPlace>번동</UserPlace>
                    <ChatTime>1달 전</ChatTime> */}
                  </UserInfo>

                  <ChatContent>{chat.latestChat}</ChatContent>
                </UserText>
                {/* <NewChat>2</NewChat> */}
                {/* <IngredientPic></IngredientPic> */}
              </Chat>
            ))}
          </Link>
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
const Chat = styled.div`
  position: relative;
  display: flex;
  // justify-content: center;
  align-items: center;
  width: 100%;
  height: 111rem;
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  cursor: pointer;
`;
const UserPic = styled.div`
  margin: 0 10rem 0 10rem;
  width: 60rem;
  height: 60rem;
  border-radius: 100%;
  background-color: #dddddd;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10rem 0 50rem;
  // width: 200rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 7rem;
`;
const UserId = styled.div`
  font-size: 18rem;
  font-weight: 600;
  margin-right: 9rem;
`;
const UserPlace = styled.div`
  font-size: 16rem;
  color: #b0b0b0;
  margin-right: 7rem;
`;
const ChatTime = styled.div`
  font-size: 16rem;
  color: #b0b0b0;
`;
const ChatContent = styled.div`
  font-size: 20rem;
  height: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NewChat = styled.div`
  position: absolute;
  width: 22rem;
  height: 22rem;
  border-radius: 100%;
  background-color: #38db83;
  color: white;
  font-size: 12rem;
  font-weight: 1000;
  text-align: center;
  right: 80rem;
  padding: 4px;
`;
const IngredientPic = styled.div`
  margin: 0 10rem 0 10rem;
  width: 55rem;
  height: 55rem;
  border-radius: 5rem;
  background-color: #dddddd;
`;
