import {Chatting} from "./ChattingListPage";
import { styled } from "styled-components";
import defaultThumb from "../assets/common/defaultThumb.svg";
import { useNavigate} from "react-router-dom";
import RecipeDeleteBtn from "../common/RecipeDeleteBtn";
import ComfirmModal from "../Modal/ConfirmModal";
import {useState} from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { CHAT_LEAVE_ROOMS_URL } from "../url";
import { useDispatch } from "react-redux";
import { deleteTokenData } from "../axios";
interface EachChatProps{
    chat:Chatting;
    onDeleteChat: (roomId: string) => void;
}
export default function EachChattingList({chat, onDeleteChat}:EachChatProps){
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleSendroomId = (chat:Chatting) => {
        navigate('/chat2', { state: { chat } });
      };
    const Token = useSelector((state: RootState) => state.accessTokenValue);
    const { accessTokenValue, refreshTokenValue } = Token;
    const MY_TOKEN = accessTokenValue;
    const REFRESH_TOKEN = refreshTokenValue;
    const dispatch = useDispatch();
    const handleDelete = () => {
        if (MY_TOKEN && REFRESH_TOKEN) {
          deleteTokenData(`${CHAT_LEAVE_ROOMS_URL}/${chat.roomId}`, MY_TOKEN,dispatch,REFRESH_TOKEN)
            .then(() => {
              console.log('삭제됨')
              onDeleteChat(chat.roomId);
              setModalOpen(false)
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

    const handleClick=()=>{
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
      };
    return (
        <>
             {modalOpen && <ComfirmModal closeModal={closeModal} handleDelete={handleDelete} message={'정말 채팅방을 나가시겠습니까?'}/>}
         <Chat >
                <UserPic
                  style={{ backgroundImage: `url(${chat.receiverPhoto || defaultThumb})` }}
                  />
                <UserText onClick={() => handleSendroomId(chat)}>
                    <UserInfo>
                        <UserId>{chat.receiverNickname}</UserId>
                  </UserInfo>
                        <ChatContent>{chat.latestChat}</ChatContent>

                </UserText>
               <IngredientPic/>
              <RecipeDeleteBtn handleClick={handleClick} />
              </Chat>
                </>
    )
}

const Chat = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 111rem;
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  cursor: pointer;
  padding-top:60px;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10rem 0 10rem;
  width: 200rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 7rem;
    margin-top:4px;
`;
const UserId = styled.div`
  font-size: 18rem;
  font-weight: 800;
  margin-right: 9rem;
`;

const ChatContent = styled.div`
  font-size: 18rem;
  height: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const UserPic = styled.div`
  margin: 0 10rem 0 10rem;
  width: 60rem;
  height: 60rem;
  border-radius: 100%;
  background-color: #dddddd;
  background-size: cover;
`;


const IngredientPic = styled.div`
  margin: 0 10rem 0 10rem;
  width: 55rem;
  height: 55rem;
  border-radius: 5rem;
`;