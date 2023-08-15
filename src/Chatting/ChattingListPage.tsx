import styled from "styled-components";
import { getData } from "../axios";
import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { useEffect,useState } from "react";
import { useNavigate} from "react-router-dom";
import RecipeDeleteBtn from "../common/RecipeDeleteBtn";
import { deleteData } from "../axios";
import { CHAT_LIST_URL,CHAT_LEAVE_ROOMS_URL } from "../url";
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
  const [chatData, setChatData] = useState<Post[]>() ;
  const navigate = useNavigate();

  const handleSendroomId = (chat:Post) => {
    navigate('/chat2', { state: { chat } });
  };
  const myNickName=sessionStorage.getItem('nickName');

  useEffect(() => {
    if(MY_TOKEN){
      getData<Post[]>(CHAT_LIST_URL,MY_TOKEN)
      .then((response) => {
        console.log(response)
        setChatData(response);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, []);
  const handleClick = (chat:Post) => {
    if (MY_TOKEN) {
      deleteData(`${CHAT_LEAVE_ROOMS_URL}/${chat.roomId}`, MY_TOKEN)
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
              
              <Chat key={index} >
                <UserText onClick={() => handleSendroomId(chat)}>
                  <UserInfo>
                  <UserId>
                    {chat.memberNicknames.find(memberNickname => memberNickname !== myNickName)}
                  </UserId>
                  </UserInfo>

                  <ChatContent>{chat.latestChat}</ChatContent>
                </UserText>
               
              <RecipeDeleteBtn handleClick={()=>handleClick(chat)} />
              </Chat>
          
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

const ChatContent = styled.div`
  font-size: 18rem;
  height: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
