import styled from "styled-components";
import MobileWrap from "../common/MobileWrap";
import ChatHeader from "./ChatHeader";
import Chatting2 from "./Chatting2";

import Info from "./Info";
import { useState,useEffect,useRef,KeyboardEvent ,ChangeEvent} from "react";
import { useLocation } from 'react-router-dom';
// import { Post } from "../IngredientMap/MarkerMap";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import * as StompJs from '@stomp/stompjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
interface Chat{

}
function ChatPage2() {
  const userID=Number(sessionStorage.getItem('userId'));
//   const [chatMessages, setChatMessages] = useState<string[]>([]);
//   const handleChatInfoChange = (newInfo: string) => {
//     setChatMessages((prevMessages) => [...prevMessages, newInfo]);
//   };
  const location = useLocation();

  const [receivedChatMessages, setReceivedChatMessages] = useState<
    { message: string; isMyMessage: boolean }[]
  >([]);
 
  const ROOMID: Chat= location.state.chat.roomId;
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue} = Token;
  const MY_TOKEN = accessTokenValue;
  
  const client = useRef<any>({});
  const disconnect = () => {
    client.current.deactivate();
    console.log('채팅이 종료되었습니다.');
   
  };
  useEffect(()=>{
    const connect = () => {
      client.current= new StompJs.Client({
        brokerURL: 'wss://nengtul.shop/chat',
        connectHeaders: {
              Authorization: `Bearer ${MY_TOKEN}` 
            },
        onConnect: () => {
          console.log('success');
          subChat(userID);
        },
      });
      client.current.activate();
    };
    connect();
    return () => disconnect();
  },[ userID])

  const subChat=(userID:number)=>{
    console.log('id',userID)
    client.current.subscribe(
            `/sub/chat/send/rooms/${ROOMID}`,
            (message:any)=>{
                console.log('보여라2',JSON.parse(message.body))
                const jsonMessage = JSON.parse(message.body);
                const isMyMessage = jsonMessage.senderNickname === sessionStorage.getItem('nickName')? true:false;

                setReceivedChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        message: jsonMessage.content,
                        isMyMessage: isMyMessage,
                    },
                ]);
            }
          )
  }


  //채팅보내기 부분
  const inputTextRef = useRef<HTMLTextAreaElement>(null!);
  const [inputValue, setInputValue] = useState('');
  const updateHeight=()=>{
      if (inputTextRef.current) {
          inputTextRef.current.style.height = '40rem';
          inputTextRef.current.style.height = inputTextRef.current.scrollHeight.toString() + 'px';
        }
      }
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === "Enter") {
          e.preventDefault(); // 엔터 키의 기본 동작인 줄바꿈 방지
          handleSubmit();
      }
  }
  useEffect(() => {
      updateHeight();
  }, [inputValue]);
      

  const handleChange = (event :ChangeEvent<HTMLTextAreaElement>) => {
      updateHeight();
      setInputValue(event.target.value);
  };

  const handleSubmit = () => {
      if (inputValue.trim() !== '') {
            client.current.publish({
              destination:`/pub/chat/send/rooms/${ROOMID}`,
              body: inputValue,
            })
        setInputValue('');
        inputTextRef.current.style.height = '40rem';
        // handleChatInfoChange(inputValue);
      }
    };
  return (
    <MobileWrap>
      <ChatWrap>
        <ChatHeader user={'berry0112'}/>
        {/* <Info selectedMarker={selectedMarker} /> */}
        <Chatting2 chatMessages={[...receivedChatMessages]} />
        <SendChatArea >
          <FontAwesomeIcon icon={faCamera} style={{color: "#000000",height:"30rem",padding:"0 11rem 0 17rem",cursor:"pointer"}} />
            <InputText  ref={inputTextRef} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}></InputText>
            <SendButton type="submit"  onClick={handleSubmit} ><FontAwesomeIcon icon={faArrowUp} style={{color: "#fff",height:"30rem",padding:"2rem"}} /></SendButton>
        </SendChatArea>
      </ChatWrap>
    </MobileWrap>
  );
}
const InputText=styled.textarea`
    width:70%;
    max-height: 250rem;
    background-color:#dddddd;
    resize: none;
    word-wrap: break-word;
    white-space: pre-wrap;
    padding:5px;
    font-size:20rem;
    border:none;
    border-radius:7rem;
    outline: none;
    overflow:hidden;
`
const ChatWrap = styled.div`
  display: flex;
  height: 844px;
  width: inherit;
  flex-direction: column;
`;
const SendButton = styled.button`
    width:37rem;
    height:37rem;
    border-radius:100%;
    background-color:#38DB83;
    margin-left:8rem;
    cursor:pointer;
`
const SendChatArea=styled.div`
    width:inherit;
    bottom:0;
    display:flex;
    align-items:center;
    padding-top:10rem;
    padding-bottom:10rem;
    border-top:1px solid #dddddd;
`
export default ChatPage2;
